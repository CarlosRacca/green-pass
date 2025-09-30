import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Search, Download, Mail, Phone, Trophy, Filter } from "lucide-react"
import Link from "next/link"

const participantes = [
  {
    id: 1,
    nombre: "Juan Pérez",
    email: "juan@email.com",
    telefono: "+54 11 1234-5678",
    handicap: 18,
    club: "Club San Andrés",
    fechaInscripcion: "2024-01-15",
    estadoPago: "pagado",
    categoria: "Amateur",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    nombre: "María González",
    email: "maria@email.com",
    telefono: "+54 11 8765-4321",
    handicap: 12,
    club: "Olivos Golf",
    fechaInscripcion: "2024-01-14",
    estadoPago: "pagado",
    categoria: "Intermedio",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    nombre: "Carlos Rodríguez",
    email: "carlos@email.com",
    telefono: "+54 11 5555-1234",
    handicap: 24,
    club: "Jockey Club",
    fechaInscripcion: "2024-01-13",
    estadoPago: "pendiente",
    categoria: "Amateur",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    nombre: "Ana López",
    email: "ana@email.com",
    telefono: "+54 11 9999-8888",
    handicap: 16,
    club: "Club San Andrés",
    fechaInscripcion: "2024-01-12",
    estadoPago: "pagado",
    categoria: "Intermedio",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    nombre: "Luis Martín",
    email: "luis@email.com",
    telefono: "+54 11 7777-6666",
    handicap: 8,
    club: "Country Club",
    fechaInscripcion: "2024-01-11",
    estadoPago: "pagado",
    categoria: "Avanzado",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 6,
    nombre: "Elena Fernández",
    email: "elena@email.com",
    telefono: "+54 11 3333-2222",
    handicap: 20,
    club: "Golf Club Norte",
    fechaInscripcion: "2024-01-10",
    estadoPago: "pagado",
    categoria: "Amateur",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

const getEstadoPagoBadge = (estado: string) => {
  switch (estado) {
    case "pagado":
      return <Badge variant="default">Pagado</Badge>
    case "pendiente":
      return <Badge variant="destructive">Pendiente</Badge>
    case "parcial":
      return <Badge variant="secondary">Parcial</Badge>
    default:
      return <Badge variant="outline">{estado}</Badge>
  }
}

const getHandicapColor = (handicap: number) => {
  if (handicap <= 10) return "text-green-600 bg-green-50"
  if (handicap <= 20) return "text-yellow-600 bg-yellow-50"
  return "text-red-600 bg-red-50"
}

export default async function ParticipantesTorneoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const torneo = {
    nombre: "Torneo de Primavera 2024",
    participantes: participantes.length,
    maxParticipantes: 60,
  }

  const estadisticas = {
    pagados: participantes.filter((p) => p.estadoPago === "pagado").length,
    pendientes: participantes.filter((p) => p.estadoPago === "pendiente").length,
    handicapPromedio: Math.round(participantes.reduce((acc, p) => acc + p.handicap, 0) / participantes.length),
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href={`/torneos/${id}`}>
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-foreground">Participantes</h1>
          <p className="text-muted-foreground">{torneo.nombre}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Button>
            <Mail className="h-4 w-4 mr-2" />
            Email Masivo
          </Button>
        </div>
      </div>

      {/* Estadísticas Rápidas */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Trophy className="h-4 w-4 text-primary" />
              <div>
                <p className="text-2xl font-bold">{torneo.participantes}</p>
                <p className="text-xs text-muted-foreground">Total Participantes</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full" />
              <div>
                <p className="text-2xl font-bold">{estadisticas.pagados}</p>
                <p className="text-xs text-muted-foreground">Pagos Confirmados</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full" />
              <div>
                <p className="text-2xl font-bold">{estadisticas.pendientes}</p>
                <p className="text-xs text-muted-foreground">Pagos Pendientes</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Trophy className="h-4 w-4 text-yellow-500" />
              <div>
                <p className="text-2xl font-bold">{estadisticas.handicapPromedio}</p>
                <p className="text-xs text-muted-foreground">Handicap Promedio</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros y Búsqueda */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Buscar participantes..." className="pl-10" />
            </div>
            <Select>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Estado de Pago" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="pagado">Pagado</SelectItem>
                <SelectItem value="pendiente">Pendiente</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todas</SelectItem>
                <SelectItem value="amateur">Amateur</SelectItem>
                <SelectItem value="intermedio">Intermedio</SelectItem>
                <SelectItem value="avanzado">Avanzado</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Participantes */}
      <div className="grid gap-4">
        {participantes.map((participante) => (
          <Card key={participante.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={participante.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {participante.nombre
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <h3 className="font-medium">{participante.nombre}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {participante.email}
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {participante.telefono}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className={`px-2 py-1 rounded text-xs font-medium ${getHandicapColor(participante.handicap)}`}>
                      HCP {participante.handicap}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{participante.club}</p>
                  </div>

                  <div className="text-center">
                    <Badge variant="outline" className="mb-1">
                      {participante.categoria}
                    </Badge>
                    <p className="text-xs text-muted-foreground">{participante.fechaInscripcion}</p>
                  </div>

                  <div className="text-center">{getEstadoPagoBadge(participante.estadoPago)}</div>

                  <div className="flex gap-1">
                    <Button size="sm" variant="outline">
                      <Mail className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Phone className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
