import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MessageSquare, Clock, CheckCircle, AlertCircle } from "lucide-react"

const consultas = [
  {
    id: 1,
    usuario: "Juan Pérez",
    email: "juan@email.com",
    asunto: "Consulta sobre torneo de primavera",
    mensaje: "Hola, me gustaría saber más detalles sobre el torneo de primavera que organizan...",
    fecha: "2024-01-15",
    estado: "pendiente",
    prioridad: "alta",
  },
  {
    id: 2,
    usuario: "María González",
    email: "maria@email.com",
    asunto: "Viaje a Pebble Beach",
    mensaje: "Estoy interesada en el paquete de viaje a Pebble Beach. ¿Podrían enviarme más información?",
    fecha: "2024-01-14",
    estado: "respondida",
    prioridad: "media",
  },
  {
    id: 3,
    usuario: "Carlos Rodríguez",
    email: "carlos@email.com",
    asunto: "Cancelación de reserva",
    mensaje: "Necesito cancelar mi reserva para el torneo del próximo mes debido a una emergencia familiar.",
    fecha: "2024-01-13",
    estado: "en_proceso",
    prioridad: "alta",
  },
]

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

export default function ConsultasPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Consultas</h1>
          <p className="text-muted-foreground">Gestiona todas las consultas de los usuarios</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Filtrar</Button>
          <Button>Responder Todas</Button>
        </div>
      </div>

      <div className="grid gap-4">
        {consultas.map((consulta) => (
          <Card key={consulta.id} className={`border-l-4 ${getPrioridadColor(consulta.prioridad)}`}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{consulta.asunto}</CardTitle>
                  <CardDescription>
                    De: {consulta.usuario} ({consulta.email}) • {consulta.fecha}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">{getEstadoBadge(consulta.estado)}</div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{consulta.mensaje}</p>
              <div className="flex gap-2">
                <Button size="sm">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Responder
                </Button>
                <Button variant="outline" size="sm">
                  Ver Detalles
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
