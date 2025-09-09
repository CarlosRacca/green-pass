import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Plane, Calendar, Users, DollarSign, Eye, Edit, CheckCircle } from "lucide-react"

const viajes = [
  {
    id: 1,
    destino: "Pebble Beach, California",
    descripcion: "Experiencia de golf de lujo en uno de los campos más icónicos del mundo",
    fechaSalida: "2024-04-15",
    fechaRegreso: "2024-04-20",
    duracion: "5 días / 4 noches",
    participantes: 12,
    maxParticipantes: 16,
    precio: 85000,
    estado: "confirmado",
    categoria: "Premium",
    incluye: ["Vuelos", "Hotel 5 estrellas", "3 rondas de golf", "Comidas", "Transporte"],
    cliente: {
      nombre: "Grupo Elite Golf",
      contacto: "Carlos Rodríguez",
      email: "carlos@elitegolf.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    fechaVenta: "2024-01-10",
    comision: 12750,
  },
  {
    id: 2,
    destino: "St. Andrews, Escocia",
    descripcion: "Peregrinaje al hogar del golf con rondas en campos históricos",
    fechaSalida: "2024-06-10",
    fechaRegreso: "2024-06-17",
    duracion: "7 días / 6 noches",
    participantes: 8,
    maxParticipantes: 12,
    precio: 120000,
    estado: "vendido",
    categoria: "Histórico",
    incluye: ["Vuelos", "Hotel boutique", "4 rondas de golf", "Desayunos", "Tour histórico"],
    cliente: {
      nombre: "Golf Heritage Club",
      contacto: "María González",
      email: "maria@heritage.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    fechaVenta: "2023-12-20",
    comision: 18000,
  },
  {
    id: 3,
    destino: "Augusta National (Simulado)",
    descripcion: "Experiencia única jugando en réplica exacta del famoso campo",
    fechaSalida: "2024-03-25",
    fechaRegreso: "2024-03-28",
    duracion: "3 días / 2 noches",
    participantes: 16,
    maxParticipantes: 16,
    precio: 45000,
    estado: "completado",
    categoria: "Experiencia",
    incluye: ["Hotel", "2 rondas simuladas", "Comidas", "Souvenirs", "Transporte"],
    cliente: {
      nombre: "Amigos del Golf BA",
      contacto: "Juan Pérez",
      email: "juan@amigosgolf.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    fechaVenta: "2024-01-05",
    comision: 6750,
  },
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

export default function ViajesPage() {
  const totalIngresos = viajes.reduce((acc, viaje) => acc + viaje.precio * viaje.participantes, 0)
  const totalComisiones = viajes.reduce((acc, viaje) => acc + viaje.comision, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Viajes Vendidos</h1>
          <p className="text-muted-foreground">Gestiona todos los paquetes de viaje de golf</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Exportar Reporte</Button>
          <Button>Crear Nuevo Viaje</Button>
        </div>
      </div>

      {/* Estadísticas Rápidas */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Plane className="h-4 w-4 text-primary" />
              <div>
                <p className="text-2xl font-bold">{viajes.length}</p>
                <p className="text-xs text-muted-foreground">Total Viajes</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">{viajes.reduce((acc, v) => acc + v.participantes, 0)}</p>
                <p className="text-xs text-muted-foreground">Total Viajeros</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-green-500" />
              <div>
                <p className="text-2xl font-bold">${totalIngresos.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Ingresos Totales</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-yellow-500" />
              <div>
                <p className="text-2xl font-bold">${totalComisiones.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Comisiones</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Viajes */}
      <div className="grid gap-4">
        {viajes.map((viaje) => (
          <Card key={viaje.id} className={`border-l-4 ${getCategoriaColor(viaje.categoria)}`}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Plane className="w-5 h-5 text-primary" />
                    <CardTitle className="text-xl">{viaje.destino}</CardTitle>
                  </div>
                  <CardDescription>{viaje.descripcion}</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{viaje.categoria}</Badge>
                  {getEstadoBadge(viaje.estado)}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <div>
                    <p>{viaje.fechaSalida}</p>
                    <p className="text-xs">{viaje.duracion}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <div>
                    <p>
                      {viaje.participantes}/{viaje.maxParticipantes} viajeros
                    </p>
                    <p className="text-xs">
                      Ocupación: {Math.round((viaje.participantes / viaje.maxParticipantes) * 100)}%
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <DollarSign className="w-4 h-4" />
                  <div>
                    <p>${viaje.precio.toLocaleString()} por persona</p>
                    <p className="text-xs">Total: ${(viaje.precio * viaje.participantes).toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4" />
                  <div>
                    <p>Comisión: ${viaje.comision.toLocaleString()}</p>
                    <p className="text-xs">Vendido: {viaje.fechaVenta}</p>
                  </div>
                </div>
              </div>

              {/* Cliente */}
              <div className="flex items-center gap-3 mb-4 p-3 bg-muted rounded-lg">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={viaje.cliente.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="text-xs">
                    {viaje.cliente.contacto
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium text-sm">{viaje.cliente.nombre}</p>
                  <p className="text-xs text-muted-foreground">
                    Contacto: {viaje.cliente.contacto} • {viaje.cliente.email}
                  </p>
                </div>
              </div>

              {/* Incluye */}
              <div className="mb-4">
                <p className="text-sm font-medium mb-2">Incluye:</p>
                <div className="flex flex-wrap gap-1">
                  {viaje.incluye.map((item, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {item}
                    </Badge>
                  ))}
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
