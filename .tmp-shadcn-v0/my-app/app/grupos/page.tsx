import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, Calendar, Trophy, Plus, Eye, Edit } from "lucide-react"

const grupos = [
  {
    id: 1,
    nombre: "Grupo Elite",
    descripcion: "Jugadores con handicap bajo para torneos competitivos",
    miembros: 12,
    maxMiembros: 15,
    handicapPromedio: 8,
    fechaCreacion: "2023-10-15",
    estado: "activo",
    proximoTorneo: "Torneo de Primavera 2024",
    fechaProximoTorneo: "2024-03-15",
    lider: {
      nombre: "Carlos Rodríguez",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    miembrosRecientes: [
      { nombre: "Juan P.", avatar: "/placeholder.svg?height=24&width=24" },
      { nombre: "María G.", avatar: "/placeholder.svg?height=24&width=24" },
      { nombre: "Luis M.", avatar: "/placeholder.svg?height=24&width=24" },
    ],
  },
  {
    id: 2,
    nombre: "Principiantes Unidos",
    descripcion: "Grupo para jugadores que están comenzando en el golf",
    miembros: 8,
    maxMiembros: 20,
    handicapPromedio: 28,
    fechaCreacion: "2023-11-20",
    estado: "activo",
    proximoTorneo: "Torneo Benéfico",
    fechaProximoTorneo: "2024-02-10",
    lider: {
      nombre: "Ana López",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    miembrosRecientes: [
      { nombre: "Pedro S.", avatar: "/placeholder.svg?height=24&width=24" },
      { nombre: "Laura T.", avatar: "/placeholder.svg?height=24&width=24" },
      { nombre: "Diego R.", avatar: "/placeholder.svg?height=24&width=24" },
    ],
  },
  {
    id: 3,
    nombre: "Veteranos del Golf",
    descripcion: "Jugadores experimentados que disfrutan del golf social",
    miembros: 15,
    maxMiembros: 18,
    handicapPromedio: 15,
    fechaCreacion: "2023-09-05",
    estado: "activo",
    proximoTorneo: "Copa Green Pass",
    fechaProximoTorneo: "2024-04-20",
    lider: {
      nombre: "Roberto Silva",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    miembrosRecientes: [
      { nombre: "Carmen V.", avatar: "/placeholder.svg?height=24&width=24" },
      { nombre: "Miguel A.", avatar: "/placeholder.svg?height=24&width=24" },
      { nombre: "Elena F.", avatar: "/placeholder.svg?height=24&width=24" },
    ],
  },
]

const getEstadoBadge = (estado: string) => {
  return estado === "activo" ? <Badge variant="default">Activo</Badge> : <Badge variant="secondary">Inactivo</Badge>
}

const getHandicapColor = (handicap: number) => {
  if (handicap <= 10) return "text-green-600"
  if (handicap <= 20) return "text-yellow-600"
  return "text-red-600"
}

export default function GruposPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Grupos</h1>
          <p className="text-muted-foreground">Gestiona los grupos de jugadores</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Filtrar</Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Crear Grupo
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {grupos.map((grupo) => (
          <Card key={grupo.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{grupo.nombre}</CardTitle>
                  <CardDescription className="line-clamp-2">{grupo.descripcion}</CardDescription>
                </div>
                {getEstadoBadge(grupo.estado)}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Estadísticas del Grupo */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {grupo.miembros}/{grupo.maxMiembros} miembros
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-muted-foreground" />
                  <span className={getHandicapColor(grupo.handicapPromedio)}>Handicap: {grupo.handicapPromedio}</span>
                </div>
              </div>

              {/* Líder del Grupo */}
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={grupo.lider.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="text-xs">
                    {grupo.lider.nombre
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm text-muted-foreground">Líder: {grupo.lider.nombre}</span>
              </div>

              {/* Miembros Recientes */}
              <div>
                <p className="text-sm font-medium mb-2">Miembros recientes</p>
                <div className="flex -space-x-2">
                  {grupo.miembrosRecientes.map((miembro, index) => (
                    <Avatar key={index} className="h-6 w-6 border-2 border-background">
                      <AvatarImage src={miembro.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="text-xs">
                        {miembro.nombre
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                  {grupo.miembros > 3 && (
                    <div className="h-6 w-6 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                      <span className="text-xs text-muted-foreground">+{grupo.miembros - 3}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Próximo Torneo */}
              {grupo.proximoTorneo && (
                <div className="p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Próximo Torneo</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{grupo.proximoTorneo}</p>
                  <p className="text-xs text-muted-foreground">{grupo.fechaProximoTorneo}</p>
                </div>
              )}

              {/* Acciones */}
              <div className="flex gap-2 pt-2">
                <Button size="sm" className="flex-1">
                  <Eye className="h-4 w-4 mr-2" />
                  Ver Detalles
                </Button>
                <Button size="sm" variant="outline">
                  <Edit className="h-4 w-4 mr-2" />
                  Editar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
