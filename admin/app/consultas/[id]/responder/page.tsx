"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Send, Save, Clock, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"

// Plantillas predefinidas
const plantillas = [
  {
    id: "torneo-info",
    nombre: "Información de Torneo",
    contenido: `Hola [NOMBRE],

Gracias por tu consulta sobre nuestros torneos. Te proporciono la información solicitada:

- Fechas disponibles: [FECHAS]
- Handicap requerido: [HANDICAP]
- Precio de inscripción: $[PRECIO]
- Incluye: [INCLUYE]

¿Te gustaría que te reserve un cupo?

Saludos cordiales,
[FIRMA]`,
  },
  {
    id: "viaje-info",
    nombre: "Información de Viaje",
    contenido: `Estimado/a [NOMBRE],

Gracias por tu interés en nuestros paquetes de viaje de golf.

Los detalles del paquete son:
- Destino: [DESTINO]
- Duración: [DURACION]
- Incluye: [INCLUYE]
- Precio por persona: $[PRECIO]

¿Necesitas más información específica?

Saludos,
[FIRMA]`,
  },
  {
    id: "general",
    nombre: "Respuesta General",
    contenido: `Hola [NOMBRE],

Gracias por contactarnos. Hemos recibido tu consulta y te responderemos a la brevedad.

Si tienes alguna pregunta urgente, no dudes en llamarnos al [TELEFONO].

Saludos cordiales,
[FIRMA]`,
  },
]

const consulta = {
  id: 1,
  usuario: "Juan Pérez",
  asunto: "Consulta sobre torneo de primavera",
  estado: "pendiente",
  prioridad: "alta",
}

const getEstadoBadge = (estado: string) => {
  switch (estado) {
    case "pendiente":
      return (
        <Badge variant="destructive">
          <Clock className="w-3 h-3 mr-1" />
          Pendiente
        </Badge>
      )
    case "en_proceso":
      return (
        <Badge variant="secondary">
          <AlertCircle className="w-3 h-3 mr-1" />
          En Proceso
        </Badge>
      )
    case "respondida":
      return (
        <Badge variant="default">
          <CheckCircle className="w-3 h-3 mr-1" />
          Respondida
        </Badge>
      )
    default:
      return <Badge variant="outline">{estado}</Badge>
  }
}

export default async function ResponderConsultaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const [respuesta, setRespuesta] = useState("")
  const [plantillaSeleccionada, setPlantillaSeleccionada] = useState("")
  const [marcarComoResuelta, setMarcarComoResuelta] = useState(true)
  const [enviarCopia, setEnviarCopia] = useState(false)
  const [prioridadNueva, setPrioridadNueva] = useState(consulta.prioridad)

  const handlePlantillaChange = (plantillaId: string) => {
    const plantilla = plantillas.find((p) => p.id === plantillaId)
    if (plantilla) {
      setRespuesta(plantilla.contenido)
      setPlantillaSeleccionada(plantillaId)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Enviar respuesta:", {
      respuesta,
      marcarComoResuelta,
      enviarCopia,
      prioridadNueva,
    })
  }

  const handleGuardarBorrador = () => {
    console.log("Guardar borrador:", respuesta)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
              <Link href={`/consultas/${id}`}>
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-foreground">Responder Consulta</h1>
          <p className="text-muted-foreground">Redacta tu respuesta al usuario</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Formulario de Respuesta */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Respuesta a: {consulta.asunto}</CardTitle>
                    <CardDescription>Para: {consulta.usuario}</CardDescription>
                  </div>
                  {getEstadoBadge(consulta.estado)}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Selector de Plantilla */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Usar Plantilla (Opcional)</label>
                  <Select onValueChange={handlePlantillaChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona una plantilla..." />
                    </SelectTrigger>
                    <SelectContent>
                      {plantillas.map((plantilla) => (
                        <SelectItem key={plantilla.id} value={plantilla.id}>
                          {plantilla.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Área de Texto */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Mensaje *</label>
                  <Textarea
                    value={respuesta}
                    onChange={(e) => setRespuesta(e.target.value)}
                    placeholder="Escribe tu respuesta aquí..."
                    rows={12}
                    className="resize-none"
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Tip: Usa [NOMBRE], [TELEFONO], [FIRMA] como variables que se reemplazarán automáticamente.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Configuración de Respuesta */}
            <Card>
              <CardHeader>
                <CardTitle>Configuración de Respuesta</CardTitle>
                <CardDescription>Opciones adicionales para el envío</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Marcar como Resuelta</label>
                    <p className="text-xs text-muted-foreground">
                      La consulta se marcará como resuelta después del envío
                    </p>
                  </div>
                  <Switch checked={marcarComoResuelta} onCheckedChange={setMarcarComoResuelta} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Enviar Copia a mi Email</label>
                    <p className="text-xs text-muted-foreground">Recibirás una copia de la respuesta enviada</p>
                  </div>
                  <Switch checked={enviarCopia} onCheckedChange={setEnviarCopia} />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Cambiar Prioridad</label>
                  <Select value={prioridadNueva} onValueChange={setPrioridadNueva}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="baja">Baja</SelectItem>
                      <SelectItem value="media">Media</SelectItem>
                      <SelectItem value="alta">Alta</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Botones de Acción */}
            <div className="flex gap-4">
              <Button type="submit" className="flex-1">
                <Send className="h-4 w-4 mr-2" />
                Enviar Respuesta
              </Button>
              <Button type="button" variant="outline" onClick={handleGuardarBorrador}>
                <Save className="h-4 w-4 mr-2" />
                Guardar Borrador
              </Button>
            </div>
          </form>
        </div>

        {/* Panel Lateral */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Plantillas Disponibles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {plantillas.map((plantilla) => (
                <div
                  key={plantilla.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    plantillaSeleccionada === plantilla.id ? "border-primary bg-primary/5" : "hover:bg-muted"
                  }`}
                  onClick={() => handlePlantillaChange(plantilla.id)}
                >
                  <h4 className="font-medium text-sm">{plantilla.nombre}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{plantilla.contenido.substring(0, 80)}...</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Variables Disponibles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <code className="bg-muted px-1 rounded">[NOMBRE]</code>
                  <span className="text-muted-foreground">Nombre del usuario</span>
                </div>
                <div className="flex justify-between">
                  <code className="bg-muted px-1 rounded">[TELEFONO]</code>
                  <span className="text-muted-foreground">Teléfono de contacto</span>
                </div>
                <div className="flex justify-between">
                  <code className="bg-muted px-1 rounded">[FIRMA]</code>
                  <span className="text-muted-foreground">Tu firma automática</span>
                </div>
                <div className="flex justify-between">
                  <code className="bg-muted px-1 rounded">[FECHA]</code>
                  <span className="text-muted-foreground">Fecha actual</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Consejos</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li>• Sé específico y claro en tus respuestas</li>
                <li>• Incluye toda la información solicitada</li>
                <li>• Usa un tono profesional pero amigable</li>
                <li>• Ofrece ayuda adicional si es necesario</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
