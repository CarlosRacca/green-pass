'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Calendar as CalendarIcon, Plus, X, MapPin, Plane, Hotel, Trophy, DollarSign } from 'lucide-react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { cn } from '@/lib/utils'
import type { CreateTravelForm } from '@/lib/types'

interface UiGolfCourse {
  name: string
  description: string
  par?: number
  holes?: number
  rating?: number
}

interface UiItineraryDay {
  day: number
  title: string
  description: string
  activities?: string[]
}

const travelSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  description: z.string().min(1, 'La descripción es requerida'),
  destination: z.string().min(1, 'El destino es requerido'),
  country: z.string().min(1, 'El país es requerido'),
  startDate: z.date({ required_error: 'La fecha de inicio es requerida' }),
  endDate: z.date({ required_error: 'La fecha de fin es requerida' }),
  maxParticipants: z.number().min(1, 'Debe permitir al menos 1 participante'),
  price: z.number().min(0, 'El precio no puede ser negativo'),
  accommodation: z.object({
    name: z.string().min(1, 'El nombre del alojamiento es requerido'),
    type: z.string().min(1, 'El tipo es requerido'),
    rating: z.number().min(1).max(5),
    description: z.string().min(1, 'La descripción es requerida'),
  }),
})

interface TravelFormProps {
  initialData?: Partial<CreateTravelForm>
  onSubmit: (data: CreateTravelForm) => Promise<void>
  onCancel?: () => void
  isLoading?: boolean
}

export function TravelForm({ initialData, onSubmit, onCancel, isLoading }: TravelFormProps) {
  const [highlights, setHighlights] = useState<string[]>(initialData?.highlights || [])
  const [golfCourses, setGolfCourses] = useState<UiGolfCourse[]>([])
  const [itinerary, setItinerary] = useState<UiItineraryDay[]>([])
  const [inclusions, setInclusions] = useState<string[]>(initialData?.inclusions || [])
  const [exclusions, setExclusions] = useState<string[]>(initialData?.exclusions || [])

  const [newHighlight, setNewHighlight] = useState('')
  const [newInclusion, setNewInclusion] = useState('')
  const [newExclusion, setNewExclusion] = useState('')
  const [newCourse, setNewCourse] = useState<Partial<UiGolfCourse>>({})
  const [newItineraryDay, setNewItineraryDay] = useState<Partial<UiItineraryDay>>({ day: 1 })

  const form = useForm<CreateTravelForm>({
    resolver: zodResolver(travelSchema),
    defaultValues: {
      name: initialData?.name || '',
      description: initialData?.description || '',
      destination: initialData?.destination || '',
      country: initialData?.country || '',
      maxParticipants: initialData?.maxParticipants || 16,
      price: initialData?.price || 0,
      accommodation: initialData?.accommodation || { name: '', type: '', rating: 5, description: '', amenities: [] },
    },
  })

  const handleSubmit = async (data: CreateTravelForm) => {
    const duration = Math.ceil((data.endDate.getTime() - data.startDate.getTime()) / (1000 * 60 * 60 * 24))
    try {
      // Submit only the fields defined in CreateTravelForm to satisfy typing
      await onSubmit({
        name: data.name,
        description: data.description,
        destination: data.destination,
        country: data.country,
        startDate: data.startDate,
        endDate: data.endDate,
        maxParticipants: data.maxParticipants,
        price: data.price,
        highlights,
        inclusions,
      })
    } catch (error) {
      console.error('Error submitting travel:', error)
    }
  }

  const addHighlight = () => {
    if (newHighlight.trim()) {
      setHighlights([...highlights, newHighlight.trim()])
      setNewHighlight('')
    }
  }
  const addInclusion = () => {
    if (newInclusion.trim()) {
      setInclusions([...inclusions, newInclusion.trim()])
      setNewInclusion('')
    }
  }
  const addExclusion = () => {
    if (newExclusion.trim()) {
      setExclusions([...exclusions, newExclusion.trim()])
      setNewExclusion('')
    }
  }
  const addGolfCourse = () => {
    if (newCourse.name && newCourse.description) {
      setGolfCourses([
        ...golfCourses,
        { name: newCourse.name, description: newCourse.description, par: newCourse.par || 72, holes: newCourse.holes || 18, rating: newCourse.rating || 4.5 },
      ])
      setNewCourse({})
    }
  }
  const addItineraryDay = () => {
    if (newItineraryDay.title && newItineraryDay.description) {
      setItinerary([
        ...itinerary,
        { day: newItineraryDay.day || itinerary.length + 1, title: newItineraryDay.title, description: newItineraryDay.description, activities: newItineraryDay.activities || [] },
      ])
      setNewItineraryDay({ day: (newItineraryDay.day || 1) + 1 })
    }
  }

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
      <Tabs defaultValue="basic" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="basic">Básico</TabsTrigger>
          <TabsTrigger value="accommodation">Alojamiento</TabsTrigger>
          <TabsTrigger value="golf">Golf</TabsTrigger>
          <TabsTrigger value="itinerary">Itinerario</TabsTrigger>
          <TabsTrigger value="details">Detalles</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Plane className="h-5 w-5" />Información Básica</CardTitle>
                <CardDescription>Detalles principales del viaje</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre del Viaje *</Label>
                  <Input id="name" {...form.register('name')} placeholder="Ej: Golf en Escocia - Highlands" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Descripción *</Label>
                  <Textarea id="description" {...form.register('description')} placeholder="Describe la experiencia de viaje..." rows={4} />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="destination">Destino *</Label>
                    <Input id="destination" {...form.register('destination')} placeholder="Ej: St. Andrews" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">País *</Label>
                    <Input id="country" {...form.register('country')} placeholder="Ej: Escocia" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><MapPin className="h-5 w-5" />Fechas y Participantes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Fecha de Inicio *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className={cn('w-full justify-start text-left font-normal', !form.watch('startDate') && 'text-muted-foreground')}>
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {form.watch('startDate') ? format(form.watch('startDate'), 'PPP', { locale: es }) : <span>Selecciona fecha</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar selected={form.watch('startDate')} onSelect={date => form.setValue('startDate', date!)} />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label>Fecha de Fin *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className={cn('w-full justify-start text-left font-normal', !form.watch('endDate') && 'text-muted-foreground')}>
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {form.watch('endDate') ? format(form.watch('endDate'), 'PPP', { locale: es }) : <span>Selecciona fecha</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar selected={form.watch('endDate')} onSelect={date => form.setValue('endDate', date!)} />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxParticipants">Máximo de Participantes *</Label>
                  <Input id="maxParticipants" type="number" min="1" {...form.register('maxParticipants', { valueAsNumber: true })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Precio por Persona</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="price" type="number" min="0" step="0.01" className="pl-10" {...form.register('price', { valueAsNumber: true })} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Destacados del Viaje</Label>
                  <div className="flex gap-2">
                    <Input value={newHighlight} onChange={e => setNewHighlight(e.target.value)} placeholder="Agregar destacado..." onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addHighlight())} />
                    <Button type="button" onClick={addHighlight} size="sm"><Plus className="h-4 w-4" /></Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {highlights.map((h, i) => (
                      <Badge key={i} variant="secondary" className="flex items-center gap-1">
                        {h}
                        <button type="button" onClick={() => setHighlights(highlights.filter((_, idx) => idx !== i))} className="ml-1 hover:text-red-500">
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="accommodation">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Hotel className="h-5 w-5" />Alojamiento</CardTitle>
              <CardDescription>Información sobre el hotel o resort</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="accommodation.name">Nombre del Hotel *</Label>
                  <Input id="accommodation.name" {...form.register('accommodation.name')} placeholder="Ej: Fairmont St Andrews" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accommodation.type">Tipo *</Label>
                  <Input id="accommodation.type" {...form.register('accommodation.type')} placeholder="Ej: Hotel 5 estrellas" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="accommodation.rating">Calificación (1-5)</Label>
                <Input id="accommodation.rating" type="number" min="1" max="5" {...form.register('accommodation.rating', { valueAsNumber: true })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="accommodation.description">Descripción *</Label>
                <Textarea id="accommodation.description" {...form.register('accommodation.description')} placeholder="Describe el alojamiento..." rows={3} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="golf">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Trophy className="h-5 w-5" />Campos de Golf</CardTitle>
              <CardDescription>Campos donde se jugará durante el viaje</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2 md:grid-cols-6">
                <Input value={newCourse.name || ''} onChange={e => setNewCourse({ ...newCourse, name: e.target.value })} placeholder="Nombre del campo" />
                <Input value={newCourse.description || ''} onChange={e => setNewCourse({ ...newCourse, description: e.target.value })} placeholder="Descripción" />
                <Input type="number" value={newCourse.par || '' as any} onChange={e => setNewCourse({ ...newCourse, par: Number(e.target.value) })} placeholder="Par" />
                <Input type="number" value={newCourse.holes || '' as any} onChange={e => setNewCourse({ ...newCourse, holes: Number(e.target.value) })} placeholder="Hoyos" />
                <Input type="number" step="0.1" value={newCourse.rating || '' as any} onChange={e => setNewCourse({ ...newCourse, rating: Number(e.target.value) })} placeholder="Rating" />
                <Button type="button" onClick={addGolfCourse} size="sm"><Plus className="h-4 w-4" /></Button>
              </div>
              <div className="space-y-2">
                {golfCourses.map((course, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <span className="font-medium">{course.name}</span>
                      <span className="mx-2">-</span>
                      <span className="text-sm text-muted-foreground">{course.description}</span>
                      <div className="text-xs text-muted-foreground mt-1">Par {course.par} • {course.holes} hoyos • Rating {course.rating}</div>
                    </div>
                    <Button type="button" variant="ghost" size="sm" onClick={() => setGolfCourses(golfCourses.filter((_, i) => i !== index))}><X className="h-4 w-4" /></Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="itinerary">
          <Card>
            <CardHeader>
              <CardTitle>Itinerario</CardTitle>
              <CardDescription>Programa día a día del viaje</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2 md:grid-cols-5">
                <Input type="number" value={newItineraryDay.day || '' as any} onChange={e => setNewItineraryDay({ ...newItineraryDay, day: Number(e.target.value) })} placeholder="Día" />
                <Input value={newItineraryDay.title || ''} onChange={e => setNewItineraryDay({ ...newItineraryDay, title: e.target.value })} placeholder="Título del día" />
                <Input value={newItineraryDay.description || ''} onChange={e => setNewItineraryDay({ ...newItineraryDay, description: e.target.value })} placeholder="Descripción" className="md:col-span-2" />
                <Button type="button" onClick={addItineraryDay} size="sm"><Plus className="h-4 w-4" /></Button>
              </div>
              <div className="space-y-2">
                {itinerary.map((day, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <span className="font-medium">Día {day.day}: {day.title}</span>
                      <p className="text-sm text-muted-foreground mt-1">{day.description}</p>
                    </div>
                    <Button type="button" variant="ghost" size="sm" onClick={() => setItinerary(itinerary.filter((_, i) => i !== index))}><X className="h-4 w-4" /></Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="details">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Incluye</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input value={newInclusion} onChange={e => setNewInclusion(e.target.value)} placeholder="Qué incluye..." onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addInclusion())} />
                  <Button type="button" onClick={addInclusion} size="sm"><Plus className="h-4 w-4" /></Button>
                </div>
                <div className="space-y-2">
                  {inclusions.map((inc, i) => (
                    <div key={i} className="flex items-center justify-between text-sm">
                      <span>• {inc}</span>
                      <Button type="button" variant="ghost" size="sm" onClick={() => setInclusions(inclusions.filter((_, idx) => idx !== i))}><X className="h-3 w-3" /></Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>No Incluye</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input value={newExclusion} onChange={e => setNewExclusion(e.target.value)} placeholder="Qué no incluye..." onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addExclusion())} />
                  <Button type="button" onClick={addExclusion} size="sm"><Plus className="h-4 w-4" /></Button>
                </div>
                <div className="space-y-2">
                  {exclusions.map((exc, i) => (
                    <div key={i} className="flex items-center justify-between text-sm">
                      <span>• {exc}</span>
                      <Button type="button" variant="ghost" size="sm" onClick={() => setExclusions(exclusions.filter((_, idx) => idx !== i))}><X className="h-3 w-3" /></Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex gap-4 justify-end">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>Cancelar</Button>
        )}
        <Button type="submit" disabled={isLoading}>{isLoading ? 'Guardando...' : initialData ? 'Actualizar Viaje' : 'Crear Viaje'}</Button>
      </div>
    </form>
  )
}


