'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { MessageSquare, Search, Clock, AlertCircle, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { useConsultations } from '@/hooks/use-api'
import type { Consultation } from '@/lib/types'
import { useI18n } from '@/contexts/i18n-context'

export default function ConsultasPage() {
  const { consultations, isLoading } = useConsultations()
  const { t } = useI18n()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [priorityFilter, setPriorityFilter] = useState<string>('all')

  const getStatusBadge = (status: Consultation['status']) => {
    const variants = {
      new: { variant: 'destructive' as const, label: 'Nueva', icon: AlertCircle },
      in_progress: { variant: 'default' as const, label: 'En Progreso', icon: Clock },
      resolved: { variant: 'secondary' as const, label: 'Resuelta', icon: CheckCircle },
    } as const
    const config = variants[status as keyof typeof variants] || variants.new
    const Icon = config.icon
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {config.label}
      </Badge>
    )
  }

  const getPriorityBadge = (priority: Consultation['priority']) => {
    const variants = {
      low: { variant: 'outline' as const, label: 'Baja' },
      medium: { variant: 'secondary' as const, label: 'Media' },
      high: { variant: 'destructive' as const, label: 'Alta' },
      urgent: { variant: 'destructive' as const, label: 'Urgente' },
    }
    const config = variants[priority]
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  const filteredConsultations =
    consultations?.filter(consultation => {
      const matchesSearch =
        consultation.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        consultation.user.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === 'all' || consultation.status === statusFilter
      const matchesPriority = priorityFilter === 'all' || consultation.priority === priorityFilter
      return matchesSearch && matchesStatus && matchesPriority
    }) || []

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
        <div className="grid gap-4">
          {[...Array(5)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-3 w-1/2 bg-gray-200 rounded animate-pulse" />
                  <div className="h-3 w-1/4 bg-gray-200 rounded animate-pulse" />
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
          <h1 className="text-3xl font-bold tracking-tight">{t('consultations')}</h1>
          <p className="text-muted-foreground">{t('manage_queries')}</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="destructive">{filteredConsultations.filter(c => c.status === 'new').length} {t('new_female')}</Badge>
          <Badge variant="secondary">{filteredConsultations.length} {t('total')}</Badge>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder={t('search_by_subject_or_user')} value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10" />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder={t('state')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="new">Nuevas</SelectItem>
                <SelectItem value="in_progress">En Progreso</SelectItem>
                <SelectItem value="resolved">Resueltas</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Prioridad" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('all_priorities')}</SelectItem>
                <SelectItem value="high">{t('high')}</SelectItem>
                <SelectItem value="medium">{t('medium')}</SelectItem>
                <SelectItem value="low">{t('low')}</SelectItem>
                <SelectItem value="urgent">{t('urgent')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {filteredConsultations.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">{t('no_queries')}</h3>
              <p className="text-muted-foreground">
              {searchTerm || statusFilter !== 'all' || priorityFilter !== 'all'
                ? t('no_queries_filters')
                : t('no_queries_empty')}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredConsultations.map(consultation => (
            <Card key={consultation.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={consultation.user.avatar || '/placeholder.svg'} />
                        <AvatarFallback>{consultation.user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{consultation.subject}</h3>
                        <p className="text-sm text-muted-foreground">
                          Por {consultation.user.name} • {new Date(consultation.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{consultation.message}</p>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(consultation.status)}
                      {getPriorityBadge(consultation.priority)}
                      <Badge variant="outline">{consultation.type}</Badge>
                    </div>
                  </div>
                  <Button asChild>
                    <Link href={`/consultas/${consultation.id}`}>Ver Detalles</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
