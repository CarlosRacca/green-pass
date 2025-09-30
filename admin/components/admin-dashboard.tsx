'use client'

import Link from 'next/link'
import { Users, Trophy, MapPin, MessageSquare, DollarSign, Calendar, AlertCircle, Plus, ArrowUpRight, BarChart3 } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAnalytics } from '@/hooks/use-api'

export default function AdminDashboard() {
  const { analytics, isLoading } = useAnalytics()

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-4 bg-gray-200 rounded animate-pulse" />
              </CardHeader>
              <CardContent>
                <div className="h-8 w-16 bg-gray-200 rounded animate-pulse mb-2" />
                <div className="h-3 w-24 bg-gray-200 rounded animate-pulse" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  const overview = analytics?.overview

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard Administrativo</h1>
          <p className="text-gray-600">Gestiona tu plataforma Green Pass desde aquí</p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/usuarios/crear">
              <Plus className="mr-2 h-4 w-4" />
              Crear Usuario
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/torneos/crear">
              <Plus className="mr-2 h-4 w-4" />
              Crear Torneo
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Usuarios</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overview?.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+{overview?.monthlyGrowth}% desde el mes pasado</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ingresos Totales</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${overview?.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+12.5% desde el mes pasado</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Torneos Activos</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overview?.activeTournaments}</div>
            <p className="text-xs text-muted-foreground">3 finalizan esta semana</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Consultas Pendientes</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overview?.pendingConsultations}</div>
            <p className="text-xs text-muted-foreground">2 de alta prioridad</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
            <CardDescription>Últimas acciones en la plataforma</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-9 w-9">
                <AvatarImage src="/avatars/01.png" />
                <AvatarFallback>JP</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">Juan Pérez se inscribió al Torneo Masters</p>
                <p className="text-sm text-muted-foreground">Hace 2 horas</p>
              </div>
              <Badge variant="secondary">Torneo</Badge>
            </div>

            <div className="flex items-center space-x-4">
              <Avatar className="h-9 w-9">
                <AvatarImage src="/avatars/02.png" />
                <AvatarFallback>MG</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">María García reservó viaje a Escocia</p>
                <p className="text-sm text-muted-foreground">Hace 4 horas</p>
              </div>
              <Badge variant="secondary">Viaje</Badge>
            </div>

            <div className="flex items-center space-x-4">
              <Avatar className="h-9 w-9">
                <AvatarImage src="/avatars/03.png" />
                <AvatarFallback>CR</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">Carlos Rodríguez envió una consulta</p>
                <p className="text-sm text-muted-foreground">Hace 6 horas</p>
              </div>
              <Badge variant="destructive">Urgente</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Acciones Rápidas</CardTitle>
            <CardDescription>Gestión rápida de la plataforma</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button asChild className="w-full justify-start" variant="outline">
              <Link href="/consultas">
                <MessageSquare className="mr-2 h-4 w-4" />
                Ver Consultas
                <Badge className="ml-auto" variant="destructive">
                  {overview?.pendingConsultations}
                </Badge>
              </Link>
            </Button>

            <Button asChild className="w-full justify-start" variant="outline">
              <Link href="/usuarios">
                <Users className="mr-2 h-4 w-4" />
                Gestionar Usuarios
              </Link>
            </Button>

            <Button asChild className="w-full justify-start" variant="outline">
              <Link href="/torneos">
                <Trophy className="mr-2 h-4 w-4" />
                Ver Torneos
              </Link>
            </Button>

            <Button asChild className="w-full justify-start" variant="outline">
              <Link href="/viajes">
                <MapPin className="mr-2 h-4 w-4" />
                Gestionar Viajes
              </Link>
            </Button>

            <Button asChild className="w-full justify-start" variant="outline">
              <Link href="/analytics">
                <BarChart3 className="mr-2 h-4 w-4" />
                Ver Analytics
                <ArrowUpRight className="ml-auto h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Ocupación de Torneos</CardTitle>
            <CardDescription>Porcentaje de ocupación promedio</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Torneo Masters Green Pass</span>
                <span>87/120</span>
              </div>
              <Progress value={72} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Copa de Primavera</span>
                <span>45/80</span>
              </div>
              <Progress value={56} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Torneo Amateur</span>
                <span>32/60</span>
              </div>
              <Progress value={53} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Próximos Eventos</CardTitle>
            <CardDescription>Eventos programados para esta semana</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
                <Calendar className="h-5 w-5 text-emerald-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Torneo Masters - Inicio</p>
                <p className="text-sm text-muted-foreground">15 de Marzo, 8:00 AM</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                <MapPin className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Viaje a Escocia - Salida</p>
                <p className="text-sm text-muted-foreground">18 de Marzo, 6:00 AM</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100">
                <AlertCircle className="h-5 w-5 text-orange-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Revisión de Consultas</p>
                <p className="text-sm text-muted-foreground">Diario, 9:00 AM</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
