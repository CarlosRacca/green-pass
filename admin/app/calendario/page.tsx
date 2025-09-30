'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar as CalIcon, ChevronLeft, ChevronRight, Trophy, MapPin, Clock, Plus } from 'lucide-react'
import Link from 'next/link'

export default function CalendarioPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const events = [
    { id: '1', title: 'Torneo Masters Green Pass', type: 'tournament', date: '2024-03-15', time: '08:00', location: 'Jockey Club Argentino', status: 'confirmed' },
    { id: '2', title: 'Golf en Escocia - Salida', type: 'travel', date: '2024-06-10', time: '06:00', location: 'Aeropuerto Ezeiza', status: 'confirmed' },
    { id: '3', title: 'Clase de Golf Privada', type: 'lesson', date: '2024-03-20', time: '14:00', location: 'Club San Andrés', status: 'pending' },
  ]

  const getDaysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  const getFirstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev)
      if (direction === 'prev') newDate.setMonth(prev.getMonth() - 1)
      else newDate.setMonth(prev.getMonth() + 1)
      return newDate
    })
  }
  const getEventsForDate = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return events.filter(event => event.date === dateStr)
  }
  const getEventTypeColor = (type: string) => ({ tournament: 'bg-emerald-500', travel: 'bg-blue-500', lesson: 'bg-purple-500' }[type as 'tournament' | 'travel' | 'lesson'] || 'bg-gray-500')
  const getEventTypeLabel = (type: string) => ({ tournament: 'Torneo', travel: 'Viaje', lesson: 'Clase' }[type as 'tournament' | 'travel' | 'lesson'] || type)

  const daysInMonth = getDaysInMonth(currentDate)
  const firstDay = getFirstDayOfMonth(currentDate)
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const emptyDays = Array.from({ length: firstDay }, (_, i) => i)
  const monthNames = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
  const dayNames = ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb']

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Mi Calendario</h1>
          <p className="text-muted-foreground">Gestiona tus eventos, torneos y viajes de golf</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Agregar Evento
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <CalIcon className="h-5 w-5" />
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => navigateMonth('prev')}><ChevronLeft className="h-4 w-4" /></Button>
                  <Button variant="outline" size="sm" onClick={() => navigateMonth('next')}><ChevronRight className="h-4 w-4" /></Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-1 mb-4">
                {dayNames.map(day => (
                  <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">{day}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {emptyDays.map(day => (<div key={`empty-${day}`} className="aspect-square p-1" />))}
                {days.map(day => {
                  const dayEvents = getEventsForDate(day)
                  const isToday = new Date().toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString()
                  return (
                    <div key={day} className={`aspect-square p-1 border rounded-lg hover:bg-muted/50 transition-colors ${isToday ? 'bg-emerald-50 border-emerald-200' : 'border-border'}`}>
                      <div className="h-full flex flex-col">
                        <div className={`text-sm font-medium ${isToday ? 'text-emerald-600' : ''}`}>{day}</div>
                        <div className="flex-1 space-y-1 mt-1">
                          {dayEvents.slice(0, 2).map(event => (
                            <div key={event.id} className={`text-xs px-1 py-0.5 rounded text-white truncate ${getEventTypeColor(event.type)}`} title={event.title}>
                              {event.title}
                            </div>
                          ))}
                          {dayEvents.length > 2 && <div className="text-xs text-muted-foreground">+{dayEvents.length - 2} más</div>}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Próximos Eventos</CardTitle>
              <CardDescription>Tus actividades programadas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {events
                .filter(event => new Date(event.date) >= new Date())
                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                .slice(0, 5)
                .map(event => (
                  <div key={event.id} className="flex items-start gap-3 p-3 border rounded-lg">
                    <div className={`w-3 h-3 rounded-full mt-1 ${getEventTypeColor(event.type)}`} />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm truncate">{event.title}</h4>
                      <div className="space-y-1 mt-1">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground"><CalIcon className="h-3 w-3" /><span>{new Date(event.date).toLocaleDateString()}</span></div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground"><Clock className="h-3 w-3" /><span>{event.time}</span></div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground"><MapPin className="h-3 w-3" /><span className="truncate">{event.location}</span></div>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <Badge variant="outline" className="text-xs">{getEventTypeLabel(event.type)}</Badge>
                        <Badge variant={event.status === 'confirmed' ? 'default' : 'secondary'} className="text-xs">{event.status === 'confirmed' ? 'Confirmado' : 'Pendiente'}</Badge>
                      </div>
                    </div>
                  </div>
                ))}
              {events.filter(event => new Date(event.date) >= new Date()).length === 0 && (
                <div className="text-center py-8"><CalIcon className="h-8 w-8 text-muted-foreground mx-auto mb-2" /><p className="text-sm text-muted-foreground">No tienes eventos próximos</p></div>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Acciones Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button asChild variant="outline" size="sm" className="w-full justify-start"><Link href="/experiencias"><Trophy className="mr-2 h-4 w-4" />Explorar Torneos</Link></Button>
              <Button asChild variant="outline" size="sm" className="w-full justify-start"><Link href="/experiencias"><MapPin className="mr-2 h-4 w-4" />Ver Viajes Disponibles</Link></Button>
              <Button variant="outline" size="sm" className="w-full justify-start"><Clock className="mr-2 h-4 w-4" />Agendar Clase</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}


