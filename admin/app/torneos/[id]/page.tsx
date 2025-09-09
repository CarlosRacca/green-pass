import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Edit, Calendar, MapPin, Users, DollarSign, Trophy, Clock, Phone, Mail, Award } from "lucide-react"
import Link from "next/link"

// Datos de ejemplo
const torneo = {
  id: 1,
  nombre: "Torneo de Primavera 2024",
  descripcion:
    "Torneo anual de primavera en el prestigioso club de golf San Andrés. Una competencia que reúne a los mejores golfistas de la región.",
  fecha: "2024-03-15",
  horaInicio: "08:00",
  ubicacion: "Club de Golf San Andrés",
  direccion: "Av. del Golf 1234, Buenos Aires",
  participantes: 45,
  maxParticipantes: 60,
  precio: 15000,
  estado: "abierto",
  categoria: "Amateur",
  tipoTorneo: "Stroke Play",
  handicapMinimo: 0,
  handicapMaximo: 36,
  premios: "1er lugar: $50,000 - 2do lugar: $30,000 - 3er lugar: $20,000",
  requisitos: "Handicap oficial requerido. Equipamiento completo de golf.",
  contacto: "organizador@greenpass.com",
  fechaCreacion: "2024-01-10",
  organizador: {
    nombre: "Carlos Admin",
    email: "carlos@greenpass.com",
    telefono: "+54 11 1234-5678",
  },
}

const participantesRecientes = [
  { nombre: "Juan Pérez", handicap: 18, fechaInscripcion: "2024-01-15", avatar: "/placeholder.svg?height=32&width=32" },
  {
    nombre: "María González",
    handicap: 12,
    fechaInscripcion: "2024-01-14",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    nombre: "Carlos Rodríguez",
    handicap: 24,
    fechaInscripcion: "2024-01-13",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  { nombre: "Ana López", handicap: 16, fechaInscripcion: "2024-01-12", avatar: "/placeholder.svg?height=32&width=32" },
  { nombre: "Luis Martín", handicap: 8, fechaInscripcion: "2024-01-11", avatar: "/placeholder.svg?height=32&width=32" },
]

const estadisticas = [
  { label: "Handicap Promedio", valor: "16.2", icono: Trophy },
  { label: "Días Restantes", valor: "45", icono: Clock },
  { label: "Ingresos Totales", valor: "$675,000", icono: DollarSign },
]

const getEstadoBadge = (estado: string) => {
  switch (estado) {
    case "abierto":
      return <Badge variant="default">Inscripción Abierta</Badge>
    case "confirmado":
      return <Badge variant="secondary">Confirmado</Badge>
    case "en_curso":
      return <Badge className="bg-blue-500">En Curso</Badge>
    case "finalizado":
      return <Badge variant="outline">Finalizado</Badge>
    case "cancelado":
      return <Badge variant="destructive">Cancelado</Badge>
    default:
      return <Badge variant="outline">{estado}</Badge>
  }
}

const getCategoriaColor = (categoria: string) => {
  switch (categoria) {
    case "Premium":
      return "border-l-yellow-500"
    case "Amateur":
      return "border-l-green-500"
    case "Benéfico":
      return "border-l-blue-500"
    default:
      return "border-l-gray-300"
  }
}

export default function DetalleTorneoPage({ params }: { params: { id: string } }) {
  const porcentajeOcupacion = (torneo.participantes / torneo.maxParticipantes) * 100

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/torneos">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-foreground">Detalles del Torneo</h1>
          <p className="text-muted-foreground">Información completa del torneo</p>
        </div>
        <div className="flex gap-2">
          <Link href={`/torneos/${params.id}/participantes`}>
            <Button variant="outline">
              <Users className="h-4 w-4 mr-2" />
              Ver Participantes
            </Button>
          </Link>
          <Link href={`/torneos/${params.id}/editar`}>
            <Button>
              <Edit className="h-4 w-4 mr-2" />
              Editar Torneo
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Información Principal */}
        <div className="lg:col-span-2 space-y-6">
          <Card className={`border-l-4 ${getCategoriaColor(torneo.categoria)}`}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Trophy className="h-6 w-6 text-primary" />
                    <h2 className="text-2xl font-bold">{torneo.nombre}</h2>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant="outline">{torneo.categoria}</Badge>
                    <Badge variant="outline">{torneo.tipoTorneo}</Badge>
                    {getEstadoBadge(torneo.estado)}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">{torneo.descripcion}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {torneo.fecha} a las {torneo.horaInicio}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{torneo.ubicacion}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {torneo.participantes}/{torneo.maxParticipantes} participantes
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">${torneo.precio.toLocaleString()}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Ocupación del torneo</span>
                  <span>{Math.round(porcentajeOcupacion)}%</span>
                </div>
                <Progress value={porcentajeOcupacion} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Información Detallada */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Requisitos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label className="text-sm font-medium">Handicap</Label>
                  <p className="text-sm text-muted-foreground">
                    Entre {torneo.handicapMinimo} y {torneo.handicapMaximo}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Requisitos Especiales</Label>
                  <p className="text-sm text-muted-foreground">{torneo.requisitos}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Dirección</Label>
                  <p className="text-sm text-muted-foreground">{torneo.direccion}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Premios</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {torneo.premios.split(" - ").map((premio, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm">{premio}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Participantes Recientes */}
          <Card>
            <CardHeader>
              <CardTitle>Participantes Recientes</CardTitle>
              <CardDescription>Últimas inscripciones al torneo</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {participantesRecientes.map((participante, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={participante.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {participante.nombre
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium">{participante.nombre}</h4>
                        <p className="text-sm text-muted-foreground">Handicap: {participante.handicap}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">{participante.fechaInscripcion}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Separator className="my-4" />
              <Link href={`/torneos/${params.id}/participantes`}>
                <Button variant="outline" className="w-full bg-transparent">
                  Ver Todos los Participantes ({torneo.participantes})
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Estadísticas y Organizador */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Estadísticas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {estadisticas.map((stat, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <stat.icono className="h-4 w-4 text-primary" />
                    <span className="text-sm">{stat.label}</span>
                  </div>
                  <span className="font-bold">{stat.valor}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Organizador</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <Label className="text-sm font-medium">Nombre</Label>
                <p className="text-sm text-muted-foreground">{torneo.organizador.nombre}</p>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{torneo.organizador.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{torneo.organizador.telefono}</span>
              </div>
              <div>
                <Label className="text-sm font-medium">Fecha de Creación</Label>
                <p className="text-sm text-muted-foreground">{torneo.fechaCreacion}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Acciones Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Mail className="h-4 w-4 mr-2" />
                Enviar Email a Participantes
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Users className="h-4 w-4 mr-2" />
                Exportar Lista de Participantes
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Trophy className="h-4 w-4 mr-2" />
                Registrar Resultados
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function Label({ className, children, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label className={`text-sm font-medium leading-none ${className || ""}`} {...props}>
      {children}
    </label>
  )
}
