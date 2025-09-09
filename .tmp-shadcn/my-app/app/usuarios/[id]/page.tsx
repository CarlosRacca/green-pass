import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Edit, Mail, Phone, MapPin, Calendar, Trophy, Users, Star } from "lucide-react"
import Link from "next/link"

// Datos de ejemplo - en una app real vendrían de la base de datos
const usuario = {
  id: 1,
  nombre: "Juan Pérez",
  apellido: "García",
  email: "juan@email.com",
  telefono: "+54 11 1234-5678",
  ubicacion: "Buenos Aires, Argentina",
  fechaRegistro: "2023-12-15",
  fechaNacimiento: "1985-06-20",
  estado: "activo",
  handicap: 18,
  club: "Club de Golf San Andrés",
  experiencia: "Intermedio",
  torneosParticipados: 5,
  torneosGanados: 1,
  avatar: "/placeholder.svg?height=100&width=100",
  notas: "Jugador muy comprometido, siempre puntual y con excelente actitud deportiva.",
  esAdmin: false,
}

const torneosRecientes = [
  { nombre: "Torneo de Primavera 2024", fecha: "2024-01-15", posicion: 3, puntos: 85 },
  { nombre: "Copa Green Pass", fecha: "2023-12-10", posicion: 1, puntos: 92 },
  { nombre: "Torneo Benéfico", fecha: "2023-11-20", posicion: 8, puntos: 78 },
]

export default function DetalleUsuarioPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/usuarios">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-foreground">Perfil de Usuario</h1>
          <p className="text-muted-foreground">Información detallada del usuario</p>
        </div>
        <Link href={`/usuarios/${params.id}/editar`}>
          <Button>
            <Edit className="h-4 w-4 mr-2" />
            Editar Usuario
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Información Principal */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-start gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={usuario.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="text-lg">
                    {usuario.nombre[0]}
                    {usuario.apellido[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h2 className="text-2xl font-bold">
                      {usuario.nombre} {usuario.apellido}
                    </h2>
                    {usuario.estado === "activo" ? (
                      <Badge variant="default">Activo</Badge>
                    ) : (
                      <Badge variant="secondary">Inactivo</Badge>
                    )}
                    {usuario.esAdmin && <Badge variant="destructive">Admin</Badge>}
                  </div>
                  <p className="text-muted-foreground mb-4">
                    {usuario.experiencia} • Handicap {usuario.handicap}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      {usuario.email}
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      {usuario.telefono}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      {usuario.ubicacion}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      Registrado: {usuario.fechaRegistro}
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            {usuario.notas && (
              <CardContent>
                <Separator className="mb-4" />
                <div>
                  <h3 className="font-medium mb-2">Notas</h3>
                  <p className="text-sm text-muted-foreground">{usuario.notas}</p>
                </div>
              </CardContent>
            )}
          </Card>

          {/* Historial de Torneos */}
          <Card>
            <CardHeader>
              <CardTitle>Historial de Torneos</CardTitle>
              <CardDescription>Últimos torneos en los que participó</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {torneosRecientes.map((torneo, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{torneo.nombre}</h4>
                      <p className="text-sm text-muted-foreground">{torneo.fecha}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2">
                        <Badge variant={torneo.posicion <= 3 ? "default" : "outline"}>#{torneo.posicion}</Badge>
                        <span className="text-sm font-medium">{torneo.puntos} pts</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Estadísticas */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Estadísticas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-primary" />
                  <span className="text-sm">Torneos Participados</span>
                </div>
                <span className="font-bold">{usuario.torneosParticipados}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm">Torneos Ganados</span>
                </div>
                <span className="font-bold">{usuario.torneosGanados}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">Handicap Actual</span>
                </div>
                <span className="font-bold">{usuario.handicap}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Información de Golf</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <Label className="text-sm font-medium">Club de Golf</Label>
                <p className="text-sm text-muted-foreground">{usuario.club}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Nivel de Experiencia</Label>
                <p className="text-sm text-muted-foreground">{usuario.experiencia}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Fecha de Nacimiento</Label>
                <p className="text-sm text-muted-foreground">{usuario.fechaNacimiento}</p>
              </div>
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
