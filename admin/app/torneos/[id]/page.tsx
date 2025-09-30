'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { ArrowLeft, Edit, Users, Calendar, MapPin, DollarSign, Trophy, Award } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useTournament } from '@/hooks/use-api'

export default function TournamentDetailPage() {
  const params = useParams()
  const { tournament, isLoading } = useTournament(params.id as string)

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
            <div className="h-20 w-full bg-gray-200 rounded animate-pulse" />
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!tournament) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" asChild>
          <Link href="/torneos">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a Torneos
          </Link>
        </Button>
        <Card>
          <CardContent className="p-12 text-center">
            <h3 className="text-lg font-semibold mb-2">Torneo no encontrado</h3>
            <p className="text-muted-foreground">El torneo que buscas no existe o ha sido eliminado.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const participationPercentage = (tournament.currentParticipants / tournament.maxParticipants) * 100

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" asChild>
          <Link href="/torneos">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a Torneos
          </Link>
        </Button>
        <div className="flex items-center gap-2">
          <Badge variant={tournament.status === 'draft' ? 'default' : 'secondary'}>
            {tournament.status === 'draft' ? 'Borrador' : 
             tournament.status === 'in_progress' ? 'En Progreso' : 
             tournament.status === 'completed' ? 'Completado' : 
             tournament.status === 'cancelled' ? 'Cancelado' : 'Lleno'}
          </Badge>
          <Button asChild>
            <Link href={`/torneos/${tournament.id}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Editar
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-start gap-4">
                {tournament.images && tournament.images.length > 0 && (
                  <Image
                    src={tournament.images[0]}
                    alt={tournament.name}
                    width={100}
                    height={100}
                    className="rounded-lg object-cover"
                  />
                )}
                <div className="flex-1">
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Trophy className="h-6 w-6 text-primary" />
                    {tournament.name}
                  </CardTitle>
                  <CardDescription className="mt-2">
                    {tournament.description}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {new Date(tournament.startDate).toLocaleDateString()} - {new Date(tournament.endDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{tournament.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">${tournament.price.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{tournament.format}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Participantes</CardTitle>
              <CardDescription>
                {tournament.currentParticipants} de {tournament.maxParticipants} participantes registrados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progreso de inscripciones</span>
                    <span>{Math.round(participationPercentage)}%</span>
                  </div>
                  <Progress value={participationPercentage} className="h-2" />
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">{tournament.currentParticipants}</p>
                  <p className="text-sm text-muted-foreground">Participantes confirmados</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {tournament.requirements && tournament.requirements.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Requisitos</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {tournament.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-sm">• {req}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {tournament.prizes && tournament.prizes.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Premios
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {tournament.prizes.map((prize, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium">{prize.position}</p>
                        <p className="text-sm text-muted-foreground">{prize.description}</p>
                      </div>
                      <Badge variant="outline">{prize.value}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Estadísticas Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{tournament.currentParticipants}</div>
                <div className="text-sm text-muted-foreground">Participantes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">${tournament.price.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Precio</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{tournament.format}</div>
                <div className="text-sm text-muted-foreground">Formato</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Acciones</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full" asChild>
                <Link href={`/torneos/${tournament.id}/participants`}>
                  <Users className="mr-2 h-4 w-4" />
                  Ver Participantes
                </Link>
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <Link href={`/torneos/${tournament.id}/edit`}>
                  <Edit className="mr-2 h-4 w-4" />
                  Editar Torneo
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}