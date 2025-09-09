import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Reply, Clock, CheckCircle, AlertCircle, Mail, Phone, User, Calendar } from "lucide-react"
import Link from "next/link"

// Datos de ejemplo
const consulta = {
  id: 1,
  usuario: {
    nombre: "Juan Pérez",
    email: "juan@email.com",
    telefono: "+54 11 1234-5678",
    fechaRegistro: "2023-12-15",
    torneosParticipados: 5,
    avatar: "/placeholder.svg?height=60&width=60",
  },
  asunto: "Consulta sobre torneo de primavera",
  mensaje: `Hola,

Me gustaría saber más detalles sobre el torneo de primavera que organizan. Específicamente:

1. ¿Cuál es el nivel de handicap requerido?
2. ¿Hay algún descuento para miembros frecuentes?
3. ¿Incluye almuerzo el precio de inscripción?
4. ¿Cuál es la política de cancelación?

También me interesa saber si hay disponibilidad para grupos, ya que somos 4 amigos que nos gustaría participar juntos.

Muchas gracias por su tiempo.

Saludos cordiales,
Juan Pérez`,
  fechaCreacion: "2024-01-15 10:30",
  estado: "pendiente",
  prioridad: "alta",
  categoria: "torneos",
  respuestas: [
    {
      id: 1,
      autor: "Carlos Admin",
      mensaje: `Hola Juan,

Gracias por tu consulta sobre el torneo de primavera. Te respondo punto por punto:

1. El handicap requerido es entre 0 y 36
2. Sí, hay 15% de descuento para miembros con más de 3 torneos
3. El almuerzo está incluido en el precio
4. Cancelación gratuita hasta 48hs antes

Para grupos de 4, podemos asegurar que jueguen juntos si se inscriben al mismo tiempo.

¿Te gustaría que te reserve los cupos?

Saludos,
Carlos`,
      fecha: "2024-01-15 14:20",
      esAdmin: true,
    },
  ],
  etiquetas: ["torneo", "grupo", "descuento"],
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

const getPrioridadColor = (prioridad: string) => {
  switch (prioridad) {
    case "alta":
      return "border-l-red-500"
    case "media":
      return "border-l-yellow-500"
    case "baja":
      return "border-l-green-500"
    default:
      return "border-l-gray-300"
  }
}

export default function DetalleConsultaPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/consultas">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-foreground">Detalle de Consulta</h1>
          <p className="text-muted-foreground">Información completa de la consulta</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Marcar como Leída</Button>
          <Link href={`/consultas/${params.id}/responder`}>
            <Button>
              <Reply className="h-4 w-4 mr-2" />
              Responder
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Consulta Principal */}
        <div className="lg:col-span-2 space-y-6">
          <Card className={`border-l-4 ${getPrioridadColor(consulta.prioridad)}`}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="text-xl">{consulta.asunto}</CardTitle>
                  <CardDescription>
                    <div className="flex items-center gap-4">
                      <span>De: {consulta.usuario.nombre}</span>
                      <span>•</span>
                      <span>{consulta.fechaCreacion}</span>
                    </div>
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="capitalize">
                    {consulta.categoria}
                  </Badge>
                  {getEstadoBadge(consulta.estado)}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none">
                <pre className="whitespace-pre-wrap font-sans text-sm text-foreground">{consulta.mensaje}</pre>
              </div>

              {consulta.etiquetas.length > 0 && (
                <div className="mt-4 pt-4 border-t">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Etiquetas:</span>
                    {consulta.etiquetas.map((etiqueta, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {etiqueta}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Respuestas */}
          {consulta.respuestas.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Respuestas ({consulta.respuestas.length})</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {consulta.respuestas.map((respuesta, index) => (
                  <div key={respuesta.id}>
                    <div className="flex items-start gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs">
                          {respuesta.autor
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">{respuesta.autor}</span>
                          {respuesta.esAdmin && (
                            <Badge variant="outline" className="text-xs">
                              Admin
                            </Badge>
                          )}
                          <span className="text-xs text-muted-foreground">{respuesta.fecha}</span>
                        </div>
                        <div className="bg-muted p-3 rounded-lg">
                          <pre className="whitespace-pre-wrap font-sans text-sm">{respuesta.mensaje}</pre>
                        </div>
                      </div>
                    </div>
                    {index < consulta.respuestas.length - 1 && <Separator className="my-4" />}
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Información del Usuario */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Información del Usuario</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={consulta.usuario.avatar || "/placeholder.svg"} />
                  <AvatarFallback>
                    {consulta.usuario.nombre
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{consulta.usuario.nombre}</h3>
                  <p className="text-sm text-muted-foreground">Usuario registrado</p>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{consulta.usuario.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{consulta.usuario.telefono}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Registrado: {consulta.usuario.fechaRegistro}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{consulta.usuario.torneosParticipados} torneos participados</span>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Mail className="h-4 w-4 mr-2" />
                  Enviar Email
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Phone className="h-4 w-4 mr-2" />
                  Llamar
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <User className="h-4 w-4 mr-2" />
                  Ver Perfil Completo
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Acciones Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <CheckCircle className="h-4 w-4 mr-2" />
                Marcar como Resuelta
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <AlertCircle className="h-4 w-4 mr-2" />
                Cambiar Prioridad
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Reply className="h-4 w-4 mr-2" />
                Reenviar a Especialista
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
