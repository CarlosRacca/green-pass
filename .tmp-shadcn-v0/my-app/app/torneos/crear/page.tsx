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
import { ArrowLeft, Save, Trophy, Calendar, DollarSign } from "lucide-react"
import Link from "next/link"

export default function CrearTorneoPage() {
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    fecha: "",
    horaInicio: "",
    ubicacion: "",
    direccion: "",
    maxParticipantes: "",
    precio: "",
    categoria: "",
    tipoTorneo: "",
    handicapMinimo: "",
    handicapMaximo: "",
    premios: "",
    requisitos: "",
    contacto: "",
    activo: true,
    inscripcionAbierta: true,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Crear torneo:", formData)
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/torneos">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Crear Torneo</h1>
          <p className="text-muted-foreground">Organiza un nuevo torneo de golf</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Información Básica */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                Información Básica
              </CardTitle>
              <CardDescription>Datos principales del torneo</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre del Torneo *</Label>
                <Input
                  id="nombre"
                  value={formData.nombre}
                  onChange={(e) => handleInputChange("nombre", e.target.value)}
                  placeholder="Torneo de Primavera 2024"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="descripcion">Descripción</Label>
                <Textarea
                  id="descripcion"
                  value={formData.descripcion}
                  onChange={(e) => handleInputChange("descripcion", e.target.value)}
                  placeholder="Descripción del torneo, reglas especiales, etc."
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
                      <SelectItem value="amateur">Amateur</SelectItem>
                      <SelectItem value="premium">Premium</SelectItem>
                      <SelectItem value="benefico">Benéfico</SelectItem>
                      <SelectItem value="profesional">Profesional</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tipoTorneo">Tipo de Torneo</Label>
                  <Select onValueChange={(value) => handleInputChange("tipoTorneo", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="stroke-play">Stroke Play</SelectItem>
                      <SelectItem value="match-play">Match Play</SelectItem>
                      <SelectItem value="scramble">Scramble</SelectItem>
                      <SelectItem value="best-ball">Best Ball</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Fecha y Ubicación */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Fecha y Ubicación
              </CardTitle>
              <CardDescription>Cuándo y dónde se realizará</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fecha">Fecha *</Label>
                  <Input
                    id="fecha"
                    type="date"
                    value={formData.fecha}
                    onChange={(e) => handleInputChange("fecha", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="horaInicio">Hora de Inicio</Label>
                  <Input
                    id="horaInicio"
                    type="time"
                    value={formData.horaInicio}
                    onChange={(e) => handleInputChange("horaInicio", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="ubicacion">Club de Golf *</Label>
                <Input
                  id="ubicacion"
                  value={formData.ubicacion}
                  onChange={(e) => handleInputChange("ubicacion", e.target.value)}
                  placeholder="Club de Golf San Andrés"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="direccion">Dirección Completa</Label>
                <Input
                  id="direccion"
                  value={formData.direccion}
                  onChange={(e) => handleInputChange("direccion", e.target.value)}
                  placeholder="Av. del Golf 1234, Buenos Aires"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Participantes y Precios */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Participantes y Precios
              </CardTitle>
              <CardDescription>Límites y costos del torneo</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="maxParticipantes">Máximo de Participantes *</Label>
                <Input
                  id="maxParticipantes"
                  type="number"
                  min="1"
                  value={formData.maxParticipantes}
                  onChange={(e) => handleInputChange("maxParticipantes", e.target.value)}
                  placeholder="60"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="precio">Precio de Inscripción (ARS)</Label>
                <Input
                  id="precio"
                  type="number"
                  min="0"
                  value={formData.precio}
                  onChange={(e) => handleInputChange("precio", e.target.value)}
                  placeholder="15000"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="handicapMinimo">Handicap Mínimo</Label>
                  <Input
                    id="handicapMinimo"
                    type="number"
                    min="0"
                    max="54"
                    value={formData.handicapMinimo}
                    onChange={(e) => handleInputChange("handicapMinimo", e.target.value)}
                    placeholder="0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="handicapMaximo">Handicap Máximo</Label>
                  <Input
                    id="handicapMaximo"
                    type="number"
                    min="0"
                    max="54"
                    value={formData.handicapMaximo}
                    onChange={(e) => handleInputChange("handicapMaximo", e.target.value)}
                    placeholder="36"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Información Adicional */}
          <Card>
            <CardHeader>
              <CardTitle>Información Adicional</CardTitle>
              <CardDescription>Premios, requisitos y contacto</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="premios">Premios</Label>
                <Textarea
                  id="premios"
                  value={formData.premios}
                  onChange={(e) => handleInputChange("premios", e.target.value)}
                  placeholder="1er lugar: $50,000, 2do lugar: $30,000..."
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="requisitos">Requisitos Especiales</Label>
                <Textarea
                  id="requisitos"
                  value={formData.requisitos}
                  onChange={(e) => handleInputChange("requisitos", e.target.value)}
                  placeholder="Equipamiento requerido, reglas especiales..."
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contacto">Contacto del Organizador</Label>
                <Input
                  id="contacto"
                  value={formData.contacto}
                  onChange={(e) => handleInputChange("contacto", e.target.value)}
                  placeholder="organizador@greenpass.com"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Configuración */}
        <Card>
          <CardHeader>
            <CardTitle>Configuración del Torneo</CardTitle>
            <CardDescription>Estado y disponibilidad</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="inscripcionAbierta">Inscripción Abierta</Label>
                <p className="text-sm text-muted-foreground">Los usuarios pueden inscribirse al torneo</p>
              </div>
              <Switch
                id="inscripcionAbierta"
                checked={formData.inscripcionAbierta}
                onCheckedChange={(checked) => handleInputChange("inscripcionAbierta", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="activo">Torneo Activo</Label>
                <p className="text-sm text-muted-foreground">El torneo aparece en las listas públicas</p>
              </div>
              <Switch
                id="activo"
                checked={formData.activo}
                onCheckedChange={(checked) => handleInputChange("activo", checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Botones de Acción */}
        <div className="flex gap-4">
          <Button type="submit" className="flex-1">
            <Save className="h-4 w-4 mr-2" />
            Crear Torneo
          </Button>
          <Link href="/torneos" className="flex-1">
            <Button type="button" variant="outline" className="w-full bg-transparent">
              Cancelar
            </Button>
          </Link>
        </div>
      </form>
    </div>
  )
}
