'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Trophy, Calendar, MapPin, Users, Clock, Award, Target, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useAuth } from '@/contexts/auth-context'

export default function MisTorneosPage() {
  const { user } = useAuth()

  const myTournaments = {
    upcoming: [
      { id: '1', name: 'Torneo Masters Green Pass', date: '2024-03-15', location: 'Jockey Club Argentino', status: 'confirmed', participants: 87, maxParticipants: 120, image: '/golf-tournament-1.jpg' },
    ],
    completed: [
      { id: '2', name: 'Copa de Primavera', date: '2024-02-20', location: 'Club de Golf San Andrés', status: 'completed', position: 12, score: 78, participants: 64, image: '/golf-tournament-2.jpg' },
    ],
  }

  const stats = { totalTournaments: 8, bestPosition: 3, averageScore: 82, handicapImprovement: -2 }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Mis Torneos</h1>
        <p className="text-muted-foreground">Gestiona tus participaciones en torneos y revisa tu progreso</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Torneos Jugados</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalTournaments}</div>
            <p className="text-xs text-muted-foreground">+2 este año</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mejor Posición</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">#{stats.bestPosition}</div>
            <p className="text-xs text-muted-foreground">En Copa de Invierno</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Score Promedio</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageScore}</div>
            <p className="text-xs text-muted-foreground">-3 vs año pasado</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Handicap</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{user?.handicap || 'N/A'}</div>
            <p className="text-xs text-muted-foreground">{stats.handicapImprovement} este año</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="upcoming" className="space-y-4">
        <TabsList>
          <TabsTrigger value="upcoming">Próximos ({myTournaments.upcoming.length})</TabsTrigger>
          <TabsTrigger value="completed">Completados ({myTournaments.completed.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          {myTournaments.upcoming.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No tienes torneos próximos</h3>
                <p className="text-muted-foreground mb-4">Explora los torneos disponibles y únete a la competencia</p>
                <Button asChild><Link href="/experiencias">Explorar Torneos</Link></Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {myTournaments.upcoming.map(tournament => (
                <Card key={tournament.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-0">
                    <div className="aspect-video relative overflow-hidden rounded-t-lg">
                      <Image src={tournament.image || '/placeholder.svg?height=200&width=400'} alt={tournament.name} fill className="object-cover" />
                      <div className="absolute top-3 right-3"><Badge className="bg-emerald-600">Confirmado</Badge></div>
                    </div>
                    <div className="p-6 space-y-4">
                      <div>
                        <h3 className="font-bold text-lg">{tournament.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                          <div className="flex items-center gap-1"><Calendar className="h-4 w-4" /><span>{new Date(tournament.date).toLocaleDateString()}</span></div>
                          <div className="flex items-center gap-1"><MapPin className="h-4 w-4" /><span>{tournament.location}</span></div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1"><Users className="h-4 w-4 text-muted-foreground" /><span>{tournament.participants}/{tournament.maxParticipants} participantes</span></div>
                        <div className="flex items-center gap-1"><Clock className="h-4 w-4 text-muted-foreground" /><span>{Math.ceil((new Date(tournament.date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} días</span></div>
                      </div>
                      <div className="flex gap-2">
                        <Button asChild variant="outline" size="sm" className="flex-1"><Link href={`/mis-torneos/${tournament.id}`}>Ver Detalles</Link></Button>
                        <Button size="sm" className="flex-1">Prepararse</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {myTournaments.completed.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Aún no has completado torneos</h3>
                <p className="text-muted-foreground">Tus resultados aparecerán aquí una vez que completes tu primer torneo</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {myTournaments.completed.map(tournament => (
                <Card key={tournament.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-0">
                    <div className="aspect-video relative overflow-hidden rounded-t-lg">
                      <Image src={tournament.image || '/placeholder.svg?height=200&width=400'} alt={tournament.name} fill className="object-cover" />
                      <div className="absolute top-3 right-3"><Badge variant="secondary">Completado</Badge></div>
                      <div className="absolute bottom-3 left-3"><Badge className="bg-black/70 text-white">Posición #{tournament.position}</Badge></div>
                    </div>
                    <div className="p-6 space-y-4">
                      <div>
                        <h3 className="font-bold text-lg">{tournament.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                          <div className="flex items-center gap-1"><Calendar className="h-4 w-4" /><span>{new Date(tournament.date).toLocaleDateString()}</span></div>
                          <div className="flex items-center gap-1"><MapPin className="h-4 w-4" /><span>{tournament.location}</span></div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div><div className="text-2xl font-bold text-emerald-600">{tournament.score}</div><p className="text-xs text-muted-foreground">Score Final</p></div>
                        <div><div className="text-2xl font-bold">#{tournament.position}</div><p className="text-xs text-muted-foreground">de {tournament.participants}</p></div>
                      </div>
                      <Button asChild variant="outline" size="sm" className="w-full"><Link href={`/mis-torneos/${tournament.id}`}>Ver Resultados</Link></Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}


