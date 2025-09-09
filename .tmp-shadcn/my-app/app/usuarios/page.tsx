import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, Mail, Phone, MapPin, Calendar, Edit, Trash2 } from "lucide-react"

const usuarios = [
  {
    id: 1,
    nombre: "Juan Pérez",
    email: "juan@email.com",
    telefono: "+54 11 1234-5678",
    ubicacion: "Buenos Aires, Argentina",
    fechaRegistro: "2023-12-15",
    estado: "activo",
    handicap: 18,
    torneosParticipados: 5,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    nombre: "María González",
    email: "maria@email.com",
    telefono: "+54 11 8765-4321",
    ubicacion: "Córdoba, Argentina",
    fechaRegistro: "2023-11-20",
    estado: "activo",
    handicap: 12,
    torneosParticipados: 8,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    nombre: "Carlos Rodríguez",
    email: "carlos@email.com",
    telefono: "+54 11 5555-1234",
    ubicacion: "Rosario, Argentina",
    fechaRegistro: "2024-01-05",
    estado: "inactivo",
    handicap: 24,
    torneosParticipados: 2,
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

const getEstadoBadge = (estado: string) => {
  return estado === "activo" ? <Badge variant="default">Activo</Badge> : <Badge variant="secondary">Inactivo</Badge>
}

export default function UsuariosPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Usuarios</h1>
          <p className="text-muted-foreground">Gestiona todos los usuarios registrados</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Exportar</Button>
          <Button>Crear Usuario</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {usuarios.map((usuario) => (
          <Card key={usuario.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={usuario.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {usuario.nombre
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{usuario.nombre}</CardTitle>
                    <CardDescription>Handicap: {usuario.handicap}</CardDescription>
                  </div>
                </div>
                {getEstadoBadge(usuario.estado)}
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  {usuario.email}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  {usuario.telefono}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  {usuario.ubicacion}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  Registrado: {usuario.fechaRegistro}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="w-4 h-4" />
                  {usuario.torneosParticipados} torneos participados
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button size="sm" variant="outline">
                  <Edit className="w-4 h-4 mr-2" />
                  Editar
                </Button>
                <Button size="sm" variant="outline">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Eliminar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
