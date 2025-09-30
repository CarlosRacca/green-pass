'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { MapPin, Search, Star, Calendar, Users, DollarSign, Heart, Filter } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useTravels } from '@/hooks/use-api'

export default function ExperienciasPage() {
  const { travels, isLoading } = useTravels()
  const [searchTerm, setSearchTerm] = useState('')
  const [priceFilter, setPriceFilter] = useState<string>('all')
  const [durationFilter, setDurationFilter] = useState<string>('all')
  const [favorites, setFavorites] = useState<string[]>([])

  const toggleFavorite = (travelId: string) => {
    setFavorites(prev => (prev.includes(travelId) ? prev.filter(id => id !== travelId) : [...prev, travelId]))
  }

  const filteredTravels =
    travels?.filter(travel => {
      const matchesSearch =
        travel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        travel.destination.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesPrice =
        priceFilter === 'all' ||
        (priceFilter === 'low' && travel.price < 5000) ||
        (priceFilter === 'medium' && travel.price >= 5000 && travel.price < 15000) ||
        (priceFilter === 'high' && travel.price >= 15000)
      const matchesDuration =
        durationFilter === 'all' ||
        (durationFilter === 'short' && travel.duration <= 3) ||
        (durationFilter === 'medium' && travel.duration > 3 && travel.duration <= 7) ||
        (durationFilter === 'long' && travel.duration > 7)
      return matchesSearch && matchesPrice && matchesDuration && travel.status === 'available'
    }) || []

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-0">
                <div className="aspect-video bg-gray-200 rounded-t-lg animate-pulse" />
                <div className="p-6 space-y-3">
                  <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-3 w-1/2 bg-gray-200 rounded animate-pulse" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Experiencias de Golf</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Descubre destinos únicos y vive experiencias inolvidables en los mejores campos de golf del mundo</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar destinos, países o experiencias..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10" />
            </div>
            <Select value={priceFilter} onValueChange={setPriceFilter}>
              <SelectTrigger className="w-full lg:w-[180px]">
                <SelectValue placeholder="Precio" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los precios</SelectItem>
                <SelectItem value="low">Hasta $5,000</SelectItem>
                <SelectItem value="medium">$5,000 - $15,000</SelectItem>
                <SelectItem value="high">Más de $15,000</SelectItem>
              </SelectContent>
            </Select>
            <Select value={durationFilter} onValueChange={setDurationFilter}>
              <SelectTrigger className="w-full lg:w-[180px]">
                <SelectValue placeholder="Duración" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las duraciones</SelectItem>
                <SelectItem value="short">1-3 días</SelectItem>
                <SelectItem value="medium">4-7 días</SelectItem>
                <SelectItem value="long">Más de 7 días</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">{filteredTravels.length} experiencia{filteredTravels.length !== 1 ? 's' : ''} encontrada{filteredTravels.length !== 1 ? 's' : ''}</p>
        <Button variant="outline" size="sm">
          <Filter className="mr-2 h-4 w-4" />
          Más filtros
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredTravels.map(travel => (
          <Card key={travel.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
            <CardContent className="p-0">
              <div className="aspect-video relative overflow-hidden">
                <Image src={travel.images?.[0] || '/placeholder.svg?height=300&width=400'} alt={travel.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute top-3 right-3">
                  <Button variant="secondary" size="sm" className="h-8 w-8 p-0 rounded-full" onClick={() => toggleFavorite(travel.id)}>
                    <Heart className={`h-4 w-4 ${favorites.includes(travel.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                  </Button>
                </div>
                <div className="absolute bottom-3 left-3">
                  <Badge className="bg-black/70 text-white">{travel.duration} días</Badge>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="font-bold text-xl mb-2 group-hover:text-emerald-600 transition-colors">{travel.name}</h3>
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <MapPin className="h-4 w-4" />
                    <span>
                      {travel.destination}, {travel.country}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">{travel.description}</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{travel.accommodation.rating}.0</span>
                    <span className="text-sm text-muted-foreground">({travel.accommodation.type})</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>
                      {travel.currentParticipants}/{travel.maxParticipants}
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">${travel.price.toLocaleString()}</span>
                    <span className="text-sm text-muted-foreground">por persona</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {new Date(travel.startDate).toLocaleDateString()} - {new Date(travel.endDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="pt-2">
                  <Button asChild className="w-full">
                    <Link href={`/experiencias/${travel.id}`}>Ver Detalles</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTravels.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No se encontraron experiencias</h3>
            <p className="text-muted-foreground">Intenta ajustar tus filtros de búsqueda para encontrar más opciones.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}


