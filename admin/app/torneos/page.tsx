'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Trophy, Search, Plus, Calendar, MapPin, Users, DollarSign, MoreHorizontal, Edit, Trash2 } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import Image from 'next/image'
import { useTournaments } from '@/hooks/use-api'
import type { Tournament } from '@/lib/types'
import { useI18n } from '@/contexts/i18n-context'

export default function TorneosPage() {
  const { tournaments, isLoading } = useTournaments()
  const { t } = useI18n()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const getStatusBadge = (status: Tournament['status']) => {
    const variants = {
      open: { variant: 'default' as const, label: t('open') },
      closed: { variant: 'secondary' as const, label: t('closed') },
      completed: { variant: 'outline' as const, label: t('completed') },
      cancelled: { variant: 'destructive' as const, label: t('cancelled') },
      draft: { variant: 'secondary' as const, label: t('draft') },
      in_progress: { variant: 'default' as const, label: t('in_progress') },
      full: { variant: 'secondary' as const, label: t('full') },
    }
    const config = variants[status]
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  const filteredTournaments =
    tournaments?.filter(tournament => {
      const matchesSearch =
        tournament.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tournament.location.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === 'all' || tournament.status === statusFilter
      return matchesSearch && matchesStatus
    }) || []

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="h-32 w-full bg-gray-200 rounded animate-pulse" />
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t('tournaments')}</h1>
          <p className="text-muted-foreground">&nbsp;</p>
        </div>
        <Button asChild>
          <Link href="/torneos/crear">
            <Plus className="mr-2 h-4 w-4" />
            {t('create')}
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('total_tournaments')}</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tournaments?.length || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('open_plural')}</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tournaments?.filter(t => t.status === 'open').length || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('participants')}</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tournaments?.reduce((acc, t) => acc + t.currentParticipants, 0) || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('revenue')}</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${tournaments?.reduce((acc, t) => acc + t.price * t.currentParticipants, 0).toLocaleString() || 0}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder={t('search_by_name_or_location')} value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10" />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder={t('state')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('all_statuses')}</SelectItem>
                <SelectItem value="open">{t('open')}</SelectItem>
                <SelectItem value="closed">{t('closed')}</SelectItem>
                <SelectItem value="completed">{t('completed')}</SelectItem>
                <SelectItem value="cancelled">{t('cancelled')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredTournaments.map(tournament => (
          <Card key={tournament.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-0">
              <div className="aspect-video relative overflow-hidden rounded-t-lg">
                <Image src={tournament.images?.[0] || '/placeholder.svg?height=200&width=400'} alt={tournament.name} fill className="object-cover" />
                <div className="absolute top-2 right-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="secondary" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/torneos/${tournament.id}`}>
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{tournament.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{tournament.description}</p>
                  </div>
                  {getStatusBadge(tournament.status)}
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2"><Calendar className="h-4 w-4" /><span>{new Date(tournament.startDate).toLocaleDateString()}</span></div>
                  <div className="flex items-center gap-2"><MapPin className="h-4 w-4" /><span>{tournament.location}</span></div>
                  <div className="flex items-center gap-2"><Users className="h-4 w-4" /><span>{tournament.currentParticipants}/{tournament.maxParticipants} participantes</span></div>
                  <div className="flex items-center gap-2"><DollarSign className="h-4 w-4" /><span>${tournament.price.toLocaleString()}</span></div>
                </div>
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link href={`/torneos/${tournament.id}`}>{t('view_details')}</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTournaments.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">{t('no_tournaments')}</h3>
            <p className="text-muted-foreground">{searchTerm || statusFilter !== 'all' ? t('no_tournaments_filters') : t('no_tournaments_empty')}</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
