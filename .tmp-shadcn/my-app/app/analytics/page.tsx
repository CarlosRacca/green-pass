import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Trophy,
  Plane,
  DollarSign,
  MessageSquare,
  Calendar,
  Target,
} from "lucide-react"

const metricas = [
  {
    titulo: "Usuarios Totales",
    valor: "1,247",
    cambio: "+12.5%",
    tendencia: "up",
    icono: Users,
    descripcion: "vs mes anterior",
  },
  {
    titulo: "Torneos Activos",
    valor: "23",
    cambio: "+8.3%",
    tendencia: "up",
    icono: Trophy,
    descripcion: "en curso y próximos",
  },
  {
    titulo: "Viajes Vendidos",
    valor: "156",
    cambio: "-2.1%",
    tendencia: "down",
    icono: Plane,
    descripcion: "este trimestre",
  },
  {
    titulo: "Ingresos Totales",
    valor: "$2,847,500",
    cambio: "+18.7%",
    tendencia: "up",
    icono: DollarSign,
    descripcion: "últimos 3 meses",
  },
]

const consultasPorCategoria = [
  { categoria: "Torneos", cantidad: 45, porcentaje: 35, color: "bg-blue-500" },
  { categoria: "Viajes", cantidad: 38, porcentaje: 30, color: "bg-green-500" },
  { categoria: "Membresías", cantidad: 25, porcentaje: 20, color: "bg-yellow-500" },
  { categoria: "Técnico", cantidad: 19, porcentaje: 15, color: "bg-red-500" },
]

const torneosPopulares = [
  { nombre: "Torneo de Primavera 2024", participantes: 45, ingresos: 675000, estado: "abierto" },
  { nombre: "Copa Green Pass", participantes: 32, ingresos: 800000, estado: "confirmado" },
  { nombre: "Torneo Benéfico", participantes: 60, ingresos: 720000, estado: "finalizado" },
  { nombre: "Championship Elite", participantes: 28, ingresos: 1400000, estado: "abierto" },
]

const viajesDestacados = [
  { destino: "Pebble Beach", participantes: 12, ingresos: 1020000, ocupacion: 75 },
  { destino: "St. Andrews", participantes: 8, ingresos: 960000, ocupacion: 67 },
  { destino: "Augusta (Simulado)", participantes: 16, ingresos: 720000, ocupacion: 100 },
]

const actividadReciente = [
  { tipo: "usuario", descripcion: "Nuevo usuario registrado: María González", tiempo: "hace 2 horas" },
  { tipo: "torneo", descripcion: "Torneo de Primavera alcanzó 45 participantes", tiempo: "hace 4 horas" },
  { tipo: "consulta", descripcion: "Nueva consulta sobre viaje a Escocia", tiempo: "hace 6 horas" },
  { tipo: "viaje", descripcion: "Viaje a Pebble Beach confirmado", tiempo: "hace 1 día" },
  { tipo: "usuario", descripcion: "Usuario premium renovó membresía", tiempo: "hace 1 día" },
]

const getIconoActividad = (tipo: string) => {
  switch (tipo) {
    case "usuario":
      return <Users className="h-4 w-4 text-blue-500" />
    case "torneo":
      return <Trophy className="h-4 w-4 text-yellow-500" />
    case "consulta":
      return <MessageSquare className="h-4 w-4 text-green-500" />
    case "viaje":
      return <Plane className="h-4 w-4 text-purple-500" />
    default:
      return <Calendar className="h-4 w-4 text-gray-500" />
  }
}

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Métricas y estadísticas de la plataforma</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Exportar Reporte</Button>
          <Button>Configurar Alertas</Button>
        </div>
      </div>

      {/* Métricas Principales */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metricas.map((metrica, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{metrica.titulo}</p>
                  <p className="text-2xl font-bold">{metrica.valor}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {metrica.tendencia === "up" ? (
                      <TrendingUp className="h-3 w-3 text-green-500" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-red-500" />
                    )}
                    <span className={`text-xs ${metrica.tendencia === "up" ? "text-green-500" : "text-red-500"}`}>
                      {metrica.cambio}
                    </span>
                    <span className="text-xs text-muted-foreground">{metrica.descripcion}</span>
                  </div>
                </div>
                <metrica.icono className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Consultas por Categoría */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Consultas por Categoría
            </CardTitle>
            <CardDescription>Distribución de consultas recibidas</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {consultasPorCategoria.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{item.categoria}</span>
                  <span className="font-medium">{item.cantidad}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Progress value={item.porcentaje} className="flex-1 h-2" />
                  <span className="text-xs text-muted-foreground w-8">{item.porcentaje}%</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Torneos Populares */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Torneos Populares
            </CardTitle>
            <CardDescription>Torneos con más participantes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {torneosPopulares.map((torneo, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="space-y-1">
                  <h4 className="font-medium text-sm">{torneo.nombre}</h4>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>{torneo.participantes} participantes</span>
                    <span>${torneo.ingresos.toLocaleString()}</span>
                  </div>
                </div>
                <Badge variant={torneo.estado === "abierto" ? "default" : "outline"} className="text-xs">
                  {torneo.estado}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Viajes Destacados */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plane className="h-5 w-5" />
              Viajes Destacados
            </CardTitle>
            <CardDescription>Destinos más populares</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {viajesDestacados.map((viaje, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-sm">{viaje.destino}</h4>
                    <p className="text-xs text-muted-foreground">
                      {viaje.participantes} viajeros • ${viaje.ingresos.toLocaleString()}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {viaje.ocupacion}%
                  </Badge>
                </div>
                <Progress value={viaje.ocupacion} className="h-1" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Actividad Reciente */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Actividad Reciente
            </CardTitle>
            <CardDescription>Últimas acciones en la plataforma</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {actividadReciente.map((actividad, index) => (
              <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                {getIconoActividad(actividad.tipo)}
                <div className="flex-1 space-y-1">
                  <p className="text-sm">{actividad.descripcion}</p>
                  <p className="text-xs text-muted-foreground">{actividad.tiempo}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Objetivos y Metas */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Objetivos del Mes
            </CardTitle>
            <CardDescription>Progreso hacia las metas establecidas</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Nuevos Usuarios</span>
                <span className="font-medium">247/300</span>
              </div>
              <Progress value={82} className="h-2" />
              <p className="text-xs text-muted-foreground">82% completado</p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Ingresos por Torneos</span>
                <span className="font-medium">$1.8M/$2M</span>
              </div>
              <Progress value={90} className="h-2" />
              <p className="text-xs text-muted-foreground">90% completado</p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Viajes Vendidos</span>
                <span className="font-medium">156/200</span>
              </div>
              <Progress value={78} className="h-2" />
              <p className="text-xs text-muted-foreground">78% completado</p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Satisfacción Cliente</span>
                <span className="font-medium">4.8/5.0</span>
              </div>
              <Progress value={96} className="h-2" />
              <p className="text-xs text-muted-foreground">96% completado</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
