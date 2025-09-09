"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Save, Plane, Calendar, DollarSign, MapPin } from "lucide-react"
import Link from "next/link"

export default function CrearViajePage() {
  const [formData, setFormData] = useState({
    destino: "",
    descripcion: "",
    fechaSalida: "",
    fechaRegreso: "",
    maxParticipantes: "",
    precio: "",
    categoria: "",
    tipoViaje: "",
    hotel: "",
    nivelHotel: "",
    incluye: {
      vuelos: false,
      hotel: false,
      comidas: false,
      transporte: false,
      golf: false,
      seguro: false,
      tours: false,
      equipamiento: false,
    },
    itinerario: "",
    requisitos: "",
    politicaCancelacion: "",
    contactoLocal: "",
    notas: "",
    activo: true,
    destacado: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Crear viaje:", formData)
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleIncludeChange = (field: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      incluye: { ...prev.incluye, [field]: checked },
    }))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/viajes">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Crear Paquete de Viaje</h1>
          <p className="text-muted-foreground">Diseña una nueva experiencia de golf</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Información Básica */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plane className="h-5 w-5" />
                Información Básica
              </CardTitle>
              <CardDescription>Datos principales del viaje</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="destino">Destino *</Label>
                <Input
                  id="destino"
                  value={formData.destino}
                  onChange={(e) => handleInputChange("destino", e.target.value)}
                  placeholder="Pebble Beach, California"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="descripcion">Descripción</Label>
                <Textarea
                  id="descripcion"
                  value={formData.descripcion}
                  onChange={(e) => handleInputChange("descripcion", e.target.value)}
                  placeholder="Experiencia única de golf en uno de los campos más prestigiosos..."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="categoria">Categoría *</Label>
                  <Select onValueChange={(value) => handleInputChange("categoria", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="premium">Premium</SelectItem>
                      <SelectItem value="historico">Histórico</SelectItem>
                      <SelectItem value="experiencia">Experiencia</SelectItem>
                      <SelectItem value="aventura">Aventura</SelectItem>
                      <SelectItem value="relajacion">Relajación</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tipoViaje">Tipo de Viaje</Label>
                  <Select onValueChange={(value) => handleInputChange("tipoViaje", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="individual">Individual</SelectItem>
                      <SelectItem value="grupo">Grupo</SelectItem>
                      <SelectItem value="corporativo">Corporativo</SelectItem>
                      <SelectItem value="torneo">Torneo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Fechas y Capacidad */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Fechas y Capacidad
              </CardTitle>
              <CardDescription>Cuándo y cuántos viajeros</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fechaSalida">Fecha de Salida *</Label>
                  <Input
                    id="fechaSalida"
                    type="date"
                    value={formData.fechaSalida}
                    onChange={(e) => handleInputChange("fechaSalida", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fechaRegreso">Fecha de Regreso *</Label>
                  <Input
                    id="fechaRegreso"
                    type="date"
                    value={formData.fechaRegreso}
                    onChange={(e) => handleInputChange("fechaRegreso", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxParticipantes">Máximo de Participantes *</Label>
                <Input
                  id="maxParticipantes"
                  type="number"
                  min="1"
                  value={formData.maxParticipantes}
                  onChange={(e) => handleInputChange("maxParticipantes", e.target.value)}
                  placeholder="16"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="precio">Precio por Persona (USD) *</Label>
                <Input
                  id="precio"
                  type="number"
                  min="0"
                  value={formData.precio}
                  onChange={(e) => handleInputChange("precio", e.target.value)}
                  placeholder="2500"
                  required
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Alojamiento */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Alojamiento
              </CardTitle>
              <CardDescription>Detalles del hospedaje</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="hotel">Nombre del Hotel</Label>
                <Input
                  id="hotel"
                  value={formData.hotel}
                  onChange={(e) => handleInputChange("hotel", e.target.value)}
                  placeholder="The Lodge at Pebble Beach"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="nivelHotel">Nivel del Hotel</Label>
                <Select onValueChange={(value) => handleInputChange("nivelHotel", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona nivel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3-estrellas">3 Estrellas</SelectItem>
                    <SelectItem value="4-estrellas">4 Estrellas</SelectItem>
                    <SelectItem value="5-estrellas">5 Estrellas</SelectItem>
                    <SelectItem value="resort">Resort</SelectItem>
                    <SelectItem value="boutique">Hotel Boutique</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactoLocal">Contacto Local</Label>
                <Input
                  id="contactoLocal"
                  value={formData.contactoLocal}
                  onChange={(e) => handleInputChange("contactoLocal", e.target.value)}
                  placeholder="Guía turístico o contacto en destino"
                />
              </div>
            </CardContent>
          </Card>

          {/* Servicios Incluidos */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Servicios Incluidos
              </CardTitle>
              <CardDescription>Qué incluye el paquete</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {Object.entries({
                vuelos: "Vuelos ida y vuelta",
                hotel: "Alojamiento",
                comidas: "Comidas",
                transporte: "Transporte local",
                golf: "Rondas de golf",
                seguro: "Seguro de viaje",
                tours: "Tours y actividades",
                equipamiento: "Equipamiento de golf",
              }).map(([key, label]) => (
                <div key={key} className="flex items-center space-x-2">
                  <Checkbox
                    id={key}
                    checked={formData.incluye[key as keyof typeof formData.incluye]}
                    onCheckedChange={(checked) => handleIncludeChange(key, checked as boolean)}
                  />
                  <Label htmlFor={key} className="text-sm font-normal">
                    {label}
                  </Label>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Información Adicional */}
        <Card>
          <CardHeader>
            <CardTitle>Información Adicional</CardTitle>
            <CardDescription>Itinerario, requisitos y políticas</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="itinerario">Itinerario Detallado</Label>
              <Textarea
                id="itinerario"
                value={formData.itinerario}
                onChange={(e) => handleInputChange("itinerario", e.target.value)}
                placeholder="Día 1: Llegada y check-in...&#10;Día 2: Primera ronda en Pebble Beach..."
                rows={4}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="requisitos">Requisitos</Label>
                <Textarea
                  id="requisitos"
                  value={formData.requisitos}
                  onChange={(e) => handleInputChange("requisitos", e.target.value)}
                  placeholder="Pasaporte vigente, handicap oficial..."
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="politicaCancelacion">Política de Cancelación</Label>
                <Textarea
                  id="politicaCancelacion"
                  value={formData.politicaCancelacion}
                  onChange={(e) => handleInputChange("politicaCancelacion", e.target.value)}
                  placeholder="Cancelación gratuita hasta 30 días antes..."
                  rows={3}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notas">Notas Internas</Label>
              <Textarea
                id="notas"
                value={formData.notas}
                onChange={(e) => handleInputChange("notas", e.target.value)}
                placeholder="Información adicional para el equipo..."
                rows={2}
              />
            </div>
          </CardContent>
        </Card>

        {/* Configuración */}
        <Card>
          <CardHeader>
            <CardTitle>Configuración del Paquete</CardTitle>
            <CardDescription>Visibilidad y promoción</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="activo">Paquete Activo</Label>
                <p className="text-sm text-muted-foreground">El paquete aparece en las listas públicas</p>
              </div>
              <Switch
                id="activo"
                checked={formData.activo}
                onCheckedChange={(checked) => handleInputChange("activo", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="destacado">Paquete Destacado</Label>
                <p className="text-sm text-muted-foreground">Se mostrará en posición prominente</p>
              </div>
              <Switch
                id="destacado"
                checked={formData.destacado}
                onCheckedChange={(checked) => handleInputChange("destacado", checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Botones de Acción */}
        <div className="flex gap-4">
          <Button type="submit" className="flex-1">
            <Save className="h-4 w-4 mr-2" />
            Crear Paquete de Viaje
          </Button>
          <Link href="/viajes" className="flex-1">
            <Button type="button" variant="outline" className="w-full bg-transparent">
              Cancelar
            </Button>
          </Link>
        </div>
      </form>
    </div>
  )
}
