import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trophy, Calendar, MapPin, Users, DollarSign, Edit, Eye } from "lucide-react"

const torneos = [
  {
    id: 1,
    nombre: "Torneo de Primavera 2024",
    descripcion: "Torneo anual de primavera en el prestigioso club de golf",
    fecha: "2024-03-15",
    ubicacion: "Club de Golf San Andrés",
    participantes: 45,
    maxParticipantes: 60,
    precio: 15000,
    estado: "abierto",
    categoria: "Amateur",
  },
  {
    id: 2,
    nombre: "Copa Green Pass",
    descripcion: "Torneo exclusivo para miembros premium",
    fecha: "2024-04-20",
    ubicacion: "Olivos Golf Club",
    participantes: 32,
    maxParticipantes: 40,
    precio: 25000,
    estado: "confirmado",
    categoria: "Premium",
  },
  {
    id: 3,
    nombre: "Torneo Benéfico",
    descripcion: "Torneo a beneficio de fundaciones locales",
    fecha: "2024-02-10",
    ubicacion: "Jockey Club",
    participantes: 60,
    maxParticipantes: 60,
    precio: 12000,
    estado: "finalizado",
    categoria: "Benéfico",
  },
]

const getEstadoBadge = (estado: string) => {
  switch (estado) {
    case "abierto":
      return <Badge variant="default">Abierto</Badge>
    case "confirmado":
      return <Badge variant="secondary">Confirmado</Badge>
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

export default function TorneosPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Torneos</h1>
          <p className="text-muted-foreground">Gestiona todos los torneos de golf</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Filtrar</Button>
          <Button>Crear Torneo</Button>
        </div>
      </div>

      <div className="grid gap-4">
        {torneos.map((torneo) => (
          <Card key={torneo.id} className={`border-l-4 ${getCategoriaColor(torneo.categoria)}`}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-primary" />
                    <CardTitle className="text-xl">{torneo.nombre}</CardTitle>
                  </div>
                  <CardDescription>{torneo.descripcion}</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{torneo.categoria}</Badge>
                  {getEstadoBadge(torneo.estado)}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  {torneo.fecha}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  {torneo.ubicacion}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="w-4 h-4" />
                  {torneo.participantes}/{torneo.maxParticipantes} participantes
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <DollarSign className="w-4 h-4" />${torneo.precio.toLocaleString()}
                </div>
              </div>

              <div className="flex gap-2">
                <Button size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  Ver Detalles
                </Button>
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4 mr-2" />
                  Editar
                </Button>
                <Button variant="outline" size="sm">
                  Ver Participantes
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
