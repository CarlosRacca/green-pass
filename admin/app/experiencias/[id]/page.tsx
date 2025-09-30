'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ArrowLeft, MapPin, Calendar, Users, Star, Heart, Share2, Clock, Trophy, Check, Hotel } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useTravel } from '@/hooks/use-api'
import { useI18n } from '@/contexts/i18n-context'

export default function ExperienciaDetailPage() {
  const params = useParams()
  const { travel, isLoading } = useTravel(params.id as string)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)
  const { t, locale } = useI18n()

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
        <div className="aspect-video bg-gray-200 rounded-lg animate-pulse" />
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            <div className="h-8 w-3/4 bg-gray-200 rounded animate-pulse" />
            <div className="h-20 w-full bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="h-64 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    )
  }

  if (!travel) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" asChild>
          <Link href="/experiencias">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('back_home') || 'Back to home'}
          </Link>
        </Button>
        <Card>
          <CardContent className="p-12 text-center">
            <h3 className="text-lg font-semibold mb-2">Experiencia no encontrada</h3>
            <p className="text-muted-foreground">La experiencia que buscas no existe.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" asChild>
          <Link href="/experiencias">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('back_home') || 'Back to home'}
          </Link>
        </Button>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setIsFavorite(!isFavorite)}>
            <Heart className={`mr-2 h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
            {isFavorite ? 'Guardado' : 'Guardar'}
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="mr-2 h-4 w-4" />
            Compartir
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="aspect-video relative overflow-hidden rounded-lg">
          <Image src={travel.images?.[selectedImage] || '/placeholder.svg?height=400&width=800'} alt={travel.name} fill className="object-cover" />
        </div>
        {travel.images && travel.images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto">
            {travel.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative aspect-video w-24 flex-shrink-0 overflow-hidden rounded border-2 ${selectedImage === index ? 'border-emerald-500' : 'border-transparent'}`}
              >
                <Image src={image || '/placeholder.svg'} alt={`${travel.name} ${index + 1}`} fill className="object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">{travel.name}</h1>
                <div className="flex items-center gap-4 text-muted-foreground">
                  <div className="flex items-center gap-1"><MapPin className="h-4 w-4" /><span>{travel.destination}, {travel.country}</span></div>
                  <div className="flex items-center gap-1"><Star className="h-4 w-4 fill-yellow-400 text-yellow-400" /><span>{travel.accommodation.rating}.0</span></div>
                  <div className="flex items-center gap-1"><Clock className="h-4 w-4" /><span>{travel.duration} días</span></div>
                </div>
              </div>
              <Badge variant="secondary" className="text-lg px-3 py-1">${travel.price.toLocaleString()}</Badge>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">{travel.description}</p>
          </div>

          {travel.highlights && travel.highlights.length > 0 && (
            <Card>
              <CardHeader>
            <CardTitle>{t('travel.highlights') || 'Highlights'}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 md:grid-cols-2">
                  {travel.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-500 flex-shrink-0" /><span className="text-sm">{highlight}</span></div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {travel.golfCourses && travel.golfCourses.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Trophy className="h-5 w-5" />{t('travel.golf_courses') || 'Golf courses'}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {travel.golfCourses.map((course, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <h4 className="font-semibold">{course.name}</h4>
                      <p className="text-sm text-muted-foreground">{course.description}</p>
                      <div className="flex items-center gap-4 text-sm"><span>Par {course.par}</span><span>Longitud {course.length} m</span><span className="capitalize">{course.difficulty}</span></div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {travel.itinerary && travel.itinerary.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>{t('travel.itinerary') || 'Itinerary'}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {travel.itinerary.map((day, index) => (
                    <div key={index} className="border-l-2 border-emerald-200 pl-4">
                      <h4 className="font-semibold">{t('travel.day') || 'Day'} {day.day}</h4>
                      <h5 className="text-emerald-600 font-medium">{day.title}</h5>
                      {day.activities && day.activities.length > 0 && (
                        <ul className="mt-2 space-y-1">
                          {day.activities.map((activity, actIndex) => (
                            <li key={actIndex} className="text-sm flex items-center gap-2"><div className="h-1 w-1 bg-emerald-500 rounded-full" />{activity}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-emerald-600">{t('travel.includes') || 'Includes'}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {travel.inclusions.map((inclusion, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm"><Check className="h-4 w-4 text-emerald-500 flex-shrink-0" />{inclusion}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-red-600">{t('travel.excludes') || 'Excludes'}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {travel.exclusions.map((exclusion, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm"><div className="h-4 w-4 border border-red-300 rounded flex-shrink-0" />{exclusion}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="space-y-6">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>{t('travel.book') || 'Book Experience'}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold">${travel.price.toLocaleString()}</div>
                <p className="text-sm text-muted-foreground">{t('travel.per_person') || 'per person'}</p>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between"><span>{t('travel.dates') || 'Dates'}:</span><span>{new Date(travel.startDate).toLocaleDateString()} - {new Date(travel.endDate).toLocaleDateString()}</span></div>
                <div className="flex items-center justify-between"><span>{t('travel.duration') || 'Duration'}:</span><span>{travel.duration} {t('travel.days') || 'days'}</span></div>
                <div className="flex items-center justify-between"><span>{t('travel.availability') || 'Availability'}:</span><span>{travel.maxParticipants - travel.currentParticipants} {t('travel.spots') || 'spots'}</span></div>
              </div>
              <Button className="w-full" size="lg">{t('travel.book_now') || 'Book now'}</Button>
              <p className="text-xs text-muted-foreground text-center">{t('travel.booking_note') || 'No-commitment booking. Cancel up to 48h before.'}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Hotel className="h-5 w-5" />{t('travel.accommodation') || 'Accommodation'}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <h4 className="font-semibold">{travel.accommodation.name}</h4>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>{travel.accommodation.rating} {t('travel.stars') || 'stars'}</span>
                  <Badge variant="outline">{travel.accommodation.type}</Badge>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{travel.accommodation.description}</p>
              {travel.accommodation.amenities && travel.accommodation.amenities.length > 0 && (
                <div>
                  <h5 className="font-medium text-sm mb-2">{t('travel.amenities') || 'Amenities'}:</h5>
                  <div className="flex flex-wrap gap-1">
                    {travel.accommodation.amenities.map((amenity, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">{amenity}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5" />{t('travel.participants') || 'Participants'} ({travel.currentParticipants}/{travel.maxParticipants})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3"><Avatar className="h-8 w-8"><AvatarImage src="/avatars/01.png" /><AvatarFallback>JP</AvatarFallback></Avatar><div><p className="text-sm font-medium">Juan P.</p><p className="text-xs text-muted-foreground">Confirmado</p></div></div>
                <div className="flex items-center gap-3"><Avatar className="h-8 w-8"><AvatarImage src="/avatars/02.png" /><AvatarFallback>MG</AvatarFallback></Avatar><div><p className="text-sm font-medium">María G.</p><p className="text-xs text-muted-foreground">Confirmado</p></div></div>
                {travel.maxParticipants - travel.currentParticipants > 0 && (
                  <p className="text-sm text-muted-foreground text-center pt-2">+{travel.maxParticipants - travel.currentParticipants} {t('travel.spots_available') || 'spots available'}</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}


