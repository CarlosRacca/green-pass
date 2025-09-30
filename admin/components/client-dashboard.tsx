"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Trophy, MapPin, Calendar, Star, Target, Award, ArrowRight, Heart } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useAuth } from '@/contexts/auth-context'

export default function ClientDashboard() {
  const { user } = useAuth()

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-8 text-white">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold">¡Bienvenido, {user?.name}! ⛳</h1>
          <p className="mt-2 text-emerald-100">Descubre nuevas experiencias de golf y mejora tu juego</p>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/3 opacity-20">
          <Image src="/golf-silhouette.png" alt="Golf" fill className="object-cover" />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mi Handicap</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{user?.handicap || 'N/A'}</div>
            <p className="text-xs text-muted-foreground">-2 desde el mes pasado</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Torneos Jugados</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{user?.stats?.totalTournaments || 0}</div>
            <p className="text-xs text-muted-foreground">3 este mes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mejor Score</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{user?.stats?.bestScore || 'N/A'}</div>
            <p className="text-xs text-muted-foreground">En Jockey Club Argentino</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Viajes Realizados</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{user?.stats?.totalTravels || 0}</div>
            <p className="text-xs text-muted-foreground">1 programado</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Mis Próximos Eventos</CardTitle>
            <CardDescription>Torneos y viajes programados</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4 rounded-lg border p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
                <Trophy className="h-6 w-6 text-emerald-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">Torneo Masters Green Pass</h3>
                <p className="text-sm text-muted-foreground">15-17 Marzo • Jockey Club Argentino</p>
                <div className="mt-2 flex items-center space-x-2">
                  <Badge variant="secondary">Confirmado</Badge>
                  <span className="text-sm text-muted-foreground">87/120 participantes</span>
                </div>
              </div>
              <Button size="sm" asChild>
                <Link href="/mis-torneos/1">Ver Detalles</Link>
              </Button>
            </div>
            <div className="flex items-center space-x-4 rounded-lg border p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                <MapPin className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">Golf en Escocia - Highlands</h3>
                <p className="text-sm text-muted-foreground">10-17 Junio • St. Andrews, Escocia</p>
                <div className="mt-2 flex items-center space-x-2">
                  <Badge variant="outline">Pendiente Pago</Badge>
                  <span className="text-sm text-muted-foreground">12/16 participantes</span>
                </div>
              </div>
              <Button size="sm" variant="outline" asChild>
                <Link href="/mis-viajes/1">Completar Pago</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Acciones Rápidas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button asChild className="w-full justify-start">
              <Link href="/experiencias">
                <MapPin className="mr-2 h-4 w-4" />
                Explorar Experiencias
                <ArrowRight className="ml-auto h-4 w-4" />
              </Link>
            </Button>
            <Button asChild className="w-full justify-start" variant="outline">
              <Link href="/mis-torneos">
                <Trophy className="mr-2 h-4 w-4" />
                Mis Torneos
              </Link>
            </Button>
            <Button asChild className="w-full justify-start" variant="outline">
              <Link href="/calendario">
                <Calendar className="mr-2 h-4 w-4" />
                Mi Calendario
              </Link>
            </Button>
            <Button asChild className="w-full justify-start" variant="outline">
              <Link href="/favoritos">
                <Heart className="mr-2 h-4 w-4" />
                Mis Favoritos
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Experiencias Recomendadas Para Ti</CardTitle>
          <CardDescription>Basado en tu historial y preferencias</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="group cursor-pointer rounded-lg border transition-all hover:shadow-md">
              <div className="aspect-video overflow-hidden rounded-t-lg">
                <Image src="/pebble-beach-golf-course.png" alt="Pebble Beach" width={400} height={200} className="h-full w-full object-cover transition-transform group-hover:scale-105" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold">Pebble Beach Experience</h3>
                <p className="text-sm text-muted-foreground">California, Estados Unidos</p>
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">4.9</span>
                  </div>
                  <span className="font-semibold">$12,500</span>
                </div>
              </div>
            </div>
            <div className="group cursor-pointer rounded-lg border transition-all hover:shadow-md">
              <div className="aspect-video overflow-hidden rounded-t-lg">
                <Image src="/scottish-golf-course-highlands.jpg" alt="Scottish Highlands" width={400} height={200} className="h-full w-full object-cover transition-transform group-hover:scale-105" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold">Scottish Highlands Tour</h3>
                <p className="text-sm text-muted-foreground">Highlands, Escocia</p>
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">4.8</span>
                  </div>
                  <span className="font-semibold">$8,900</span>
                </div>
              </div>
            </div>
            <div className="group cursor-pointer rounded-lg border transition-all hover:shadow-md">
              <div className="aspect-video overflow-hidden rounded-t-lg">
                <Image src="/serene-golf-course.png" alt="Augusta National" width={400} height={200} className="h-full w-full object-cover transition-transform group-hover:scale-105" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold">Masters Experience</h3>
                <p className="text-sm text-muted-foreground">Augusta, Georgia</p>
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">5.0</span>
                  </div>
                  <span className="font-semibold">$25,000</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}



