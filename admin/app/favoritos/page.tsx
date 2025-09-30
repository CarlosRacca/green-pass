'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Heart, MapPin, Calendar, Users, Star, Trophy, Trash2 } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function FavoritosPage() {
  const [favorites, setFavorites] = useState({
    experiences: [
      { id: '1', name: 'Golf en Escocia - Highlands', destination: 'St. Andrews, Escocia', price: 8900, duration: 7, rating: 4.9, image: '/scottish-golf-course-highlands.jpg', type: 'travel' },
      { id: '2', name: 'Pebble Beach Experience', destination: 'California, Estados Unidos', price: 12500, duration: 5, rating: 5.0, image: '/pebble-beach-golf-course.png', type: 'travel' },
    ],
    tournaments: [
      { id: '3', name: 'Masters Green Pass Championship', location: 'Jockey Club Argentino', date: '2024-04-15', participants: 87, maxParticipants: 120, price: 2500, image: '/golf-tournament-1.jpg', type: 'tournament' },
    ],
    courses: [
      { id: '4', name: 'St. Andrews Old Course', location: 'St. Andrews, Escocia', par: 72, holes: 18, rating: 4.8, image: '/st-andrews-old-course.jpg', type: 'course' },
    ],
  })

  const removeFavorite = (type: 'experiences' | 'tournaments' | 'courses', id: string) => {
    setFavorites(prev => ({ ...prev, [type]: prev[type].filter((item: any) => item.id !== id) }))
  }
  const totalFavorites = favorites.experiences.length + favorites.tournaments.length + favorites.courses.length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Mis Favoritos</h1>
        <p className="text-muted-foreground">Guarda y organiza tus experiencias, torneos y campos favoritos</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Favoritos</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalFavorites}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Experiencias</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{favorites.experiences.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Torneos</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{favorites.tournaments.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Campos</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{favorites.courses.length}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="experiences" className="space-y-4">
        <TabsList>
          <TabsTrigger value="experiences">Experiencias ({favorites.experiences.length})</TabsTrigger>
          <TabsTrigger value="tournaments">Torneos ({favorites.tournaments.length})</TabsTrigger>
          <TabsTrigger value="courses">Campos ({favorites.courses.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="experiences" className="space-y-4">
          {favorites.experiences.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No tienes experiencias favoritas</h3>
                <p className="text-muted-foreground mb-4">Explora nuestras experiencias y guarda las que más te interesen</p>
                <Button asChild><Link href="/experiencias">Explorar Experiencias</Link></Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {favorites.experiences.map(experience => (
                <Card key={experience.id} className="group hover:shadow-md transition-shadow">
                  <CardContent className="p-0">
                    <div className="aspect-video relative overflow-hidden rounded-t-lg">
                      <Image src={experience.image || '/placeholder.svg?height=200&width=400'} alt={experience.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                      <div className="absolute top-3 right-3">
                        <Button variant="secondary" size="sm" className="h-8 w-8 p-0 rounded-full" onClick={() => removeFavorite('experiences', experience.id)}>
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                      <div className="absolute bottom-3 left-3"><Badge className="bg-black/70 text-white">{experience.duration} días</Badge></div>
                    </div>
                    <div className="p-6 space-y-4">
                      <div>
                        <h3 className="font-bold text-lg group-hover:text-emerald-600 transition-colors">{experience.name}</h3>
                        <div className="flex items-center gap-2 text-muted-foreground"><MapPin className="h-4 w-4" /><span>{experience.destination}</span></div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1"><Star className="h-4 w-4 fill-yellow-400 text-yellow-400" /><span className="text-sm font-medium">{experience.rating}</span></div>
                        <div className="text-xl font-bold">${experience.price.toLocaleString()}</div>
                      </div>
                      <Button asChild className="w-full"><Link href={`/experiencias/${experience.id}`}>Ver Detalles</Link></Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="tournaments" className="space-y-4">
          {favorites.tournaments.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No tienes torneos favoritos</h3>
                <p className="text-muted-foreground mb-4">Explora los torneos disponibles y marca tus favoritos</p>
                <Button asChild><Link href="/experiencias">Ver Torneos</Link></Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {favorites.tournaments.map(tournament => (
                <Card key={tournament.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-0">
                    <div className="aspect-video relative overflow-hidden rounded-t-lg">
                      <Image src={tournament.image || '/placeholder.svg?height=200&width=400'} alt={tournament.name} fill className="object-cover" />
                      <div className="absolute top-3 right-3">
                        <Button variant="secondary" size="sm" className="h-8 w-8 p-0 rounded-full" onClick={() => removeFavorite('tournaments', tournament.id)}>
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
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
                        <div className="flex items-center gap-1"><Users className="h-4 w-4 text-muted-foreground" /><span>{tournament.participants}/{tournament.maxParticipants}</span></div>
                        <div className="text-lg font-bold">${tournament.price.toLocaleString()}</div>
                      </div>
                      <Button className="w-full">Inscribirse</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="courses" className="space-y-4">
          {favorites.courses.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Star className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No tienes campos favoritos</h3>
                <p className="text-muted-foreground">Guarda tus campos de golf favoritos para acceso rápido</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {favorites.courses.map(course => (
                <Card key={course.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-0">
                    <div className="aspect-video relative overflow-hidden rounded-t-lg">
                      <Image src={course.image || '/placeholder.svg?height=200&width=400'} alt={course.name} fill className="object-cover" />
                      <div className="absolute top-3 right-3">
                        <Button variant="secondary" size="sm" className="h-8 w-8 p-0 rounded-full" onClick={() => removeFavorite('courses', course.id)}>
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                    <div className="p-6 space-y-4">
                      <div>
                        <h3 className="font-bold text-lg">{course.name}</h3>
                        <div className="flex items-center gap-2 text-muted-foreground"><MapPin className="h-4 w-4" /><span>{course.location}</span></div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm"><span>Par {course.par}</span><span>{course.holes} hoyos</span></div>
                        <div className="flex items-center gap-1"><Star className="h-4 w-4 fill-yellow-400 text-yellow-400" /><span className="text-sm font-medium">{course.rating}</span></div>
                      </div>
                      <Button variant="outline" className="w-full">Ver Campo</Button>
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


