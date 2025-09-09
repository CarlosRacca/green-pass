import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  Edit,
  Calendar,
  MapPin,
  Users,
  DollarSign,
  Plane,
  Clock,
  Phone,
  Mail,
  Star,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"

// Datos de ejemplo
const viaje = {
  id: 1,
  destino: "Pebble Beach, California",
  descripcion:
    "Experiencia de golf de lujo en uno de los campos más icónicos del mundo. Disfruta de vistas espectaculares del océano Pacífico mientras juegas en el legendario Pebble Beach Golf Links.",
  fechaSalida: "2024-04-15",
  fechaRegreso: "2024-04-20",
  duracion: "5 días / 4 noches",
  participantes: 12,
  maxParticipantes: 16,
  precio: 85000,
  estado: "confirmado",
  categoria: "Premium",
  hotel: "The Lodge at Pebble Beach",
  nivelHotel: "5 estrellas",
  incluye: ["Vuelos ida y vuelta", "Hotel 5 estrellas", "3 rondas de golf", "Todas las comidas", "Transporte"],
  itinerario: `Día 1: Llegada a San Francisco, traslado a Pebble Beach, check-in en The Lodge
Día 2: Primera ronda en Pebble Beach Golf Links, cena de bienvenida
Día 3: Ronda en Spyglass Hill Golf Course, tarde libre en Carmel
Día 4: Ronda en Monterey Peninsula Country Club, cena de despedida
Día 5: Check-out, traslado al aeropuerto, vuelo de regreso`,
  requisitos: "Pasaporte vigente con al menos 6 meses de validez, handicap oficial máximo 28",
  politicaCancelacion:
    "Cancelación gratuita hasta 30 días antes del viaje. Entre 30-15 días: 50% del costo. Menos de 15 días: no reembolsable.",
  contactoLocal: "Mike Johnson - Golf Concierge (+1 831-624-3811)",
  fechaCreacion: "2024-01-10",
  comision: 12750,
  organizador: {
    nombre: "Carlos Admin",
    email: "carlos@greenpass.com",
    telefono: "+54 11 1234-5678",
  },
}

const participantesRecientes = [
  {
    nombre: "Roberto Silva",
    handicap: 14,
    fechaInscripcion: "2024-01-15",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    nombre: "Carmen Vega",
    handicap: 18,
    fechaInscripcion: "2024-01-14",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    nombre: "Miguel Ángel",
    handicap: 12,
    fechaInscripcion: "2024-01-13",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    nombre: "Elena Fernández",
    handicap: 22,
    fechaInscripcion: "2024-01-12",
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

const estadisticas = [
  { label: "Días Restantes", valor: "75", icono: Clock },
  { label: "Ingresos Totales", valor: "$1,020,000", icono: DollarSign },
  { label: "Comisión", valor: "$12,750", icono: Star },
]

const getEstadoBadge = (estado: string) => {
  switch (estado) {
    case "confirmado":
      return <Badge variant="default">Confirmado</Badge>
    case "vendido":
      return <Badge className="bg-blue-500">Vendido</Badge>
    case "completado":
      return <Badge variant="secondary">Completado</Badge>
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
    case "Histórico":
      return "border-l-purple-500"
    case "Experiencia":
      return "border-l-blue-500"
    default:
      return "border-l-gray-300"
  }
}

export default function DetalleViajePage({ params }: { params: { id: string } }) {
  const porcentajeOcupacion = (viaje.participantes / viaje.maxParticipantes) * 100

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/viajes">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-foreground">Detalles del Viaje</h1>
          <p className="text-muted-foreground">Información completa del paquete</p>
        </div>
        <div className="flex gap-2">
          <Link href={`/viajes/${params.id}/participantes`}>
            <Button variant="outline">
              <Users className="h-4 w-4 mr-2" />
              Ver Participantes
            </Button>
          </Link>
          <Link href={`/viajes/${params.id}/editar`}>
            <Button>
              <Edit className="h-4 w-4 mr-2" />
              Editar Viaje
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Información Principal */}
        <div className="lg:col-span-2 space-y-6">
          <Card className={`border-l-4 ${getCategoriaColor(viaje.categoria)}`}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Plane className="h-6 w-6 text-primary" />
                    <h2 className="text-2xl font-bold">{viaje.destino}</h2>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant="outline">{viaje.categoria}</Badge>
                    <Badge variant="outline">{viaje.duracion}</Badge>
                    {getEstadoBadge(viaje.estado)}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">{viaje.descripcion}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {viaje.fechaSalida} - {viaje.fechaRegreso}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{viaje.hotel}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {viaje.participantes}/{viaje.maxParticipantes} viajeros
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">${viaje.precio.toLocaleString()} por persona</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Ocupación del viaje</span>
                  <span>{Math.round(porcentajeOcupacion)}%</span>
                </div>
                <Progress value={porcentajeOcupacion} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Itinerario */}
          <Card>
            <CardHeader>
              <CardTitle>Itinerario Detallado</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="whitespace-pre-wrap font-sans text-sm text-muted-foreground">{viaje.itinerario}</pre>
            </CardContent>
          </Card>

          {/* Servicios Incluidos */}
          <Card>
            <CardHeader>
              <CardTitle>Servicios Incluidos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {viaje.incluye.map((servicio, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">{servicio}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Información Adicional */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Requisitos</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{viaje.requisitos}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Política de Cancelación</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{viaje.politicaCancelacion}</p>
              </CardContent>
            </Card>
          </div>

          {/* Participantes Recientes */}
          <Card>
            <CardHeader>
              <CardTitle>Participantes Recientes</CardTitle>
              <CardDescription>Últimas inscripciones al viaje</CardDescription>
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
              <Link href={`/viajes/${params.id}/participantes`}>
                <Button variant="outline" className="w-full bg-transparent">
                  Ver Todos los Participantes ({viaje.participantes})
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Panel Lateral */}
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
              <CardTitle>Contacto Local</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <Label className="text-sm font-medium">Coordinador</Label>
                <p className="text-sm text-muted-foreground">{viaje.contactoLocal}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Hotel</Label>
                <p className="text-sm text-muted-foreground">
                  {viaje.hotel} ({viaje.nivelHotel})
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Organizador</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <Label className="text-sm font-medium">Nombre</Label>
                <p className="text-sm text-muted-foreground">{viaje.organizador.nombre}</p>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{viaje.organizador.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{viaje.organizador.telefono}</span>
              </div>
              <div>
                <Label className="text-sm font-medium">Fecha de Creación</Label>
                <p className="text-sm text-muted-foreground">{viaje.fechaCreacion}</p>
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
                Email a Participantes
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Users className="h-4 w-4 mr-2" />
                Exportar Lista
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Calendar className="h-4 w-4 mr-2" />
                Generar Itinerario PDF
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
