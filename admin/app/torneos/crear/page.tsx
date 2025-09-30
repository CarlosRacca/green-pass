'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ArrowLeft, Save, Trophy, Plus, X } from 'lucide-react'
import Link from 'next/link'

export default function CrearTorneoPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    location: '',
    course: '',
    format: 'stroke_play',
    maxParticipants: '',
    entryFee: '',
    prizes: [''],
    requirements: [''],
    handicapMin: '',
    handicapMax: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      console.log('Creating tournament:', formData)
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      router.push('/torneos')
    } finally {
      setIsLoading(false)
    }
  }

  const addField = (field: 'prizes' | 'requirements') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }))
  }

  const removeField = (field: 'prizes' | 'requirements', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }))
  }

  const updateField = (field: 'prizes' | 'requirements', index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" asChild>
          <Link href="/torneos">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a Torneos
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Crear Nuevo Torneo</h1>
          <p className="text-muted-foreground">Configura los detalles del torneo</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Información Básica
                </CardTitle>
                <CardDescription>
                  Detalles principales del torneo
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre del Torneo</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Ej: Torneo de Primavera 2024"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="format">Formato</Label>
                    <Select value={formData.format} onValueChange={(value) => setFormData(prev => ({ ...prev, format: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="stroke_play">Stroke Play</SelectItem>
                        <SelectItem value="match_play">Match Play</SelectItem>
                        <SelectItem value="scramble">Scramble</SelectItem>
                        <SelectItem value="best_ball">Best Ball</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Descripción del torneo, reglas especiales, etc."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configuración</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="maxParticipants">Máx. Participantes</Label>
                  <Input
                    id="maxParticipants"
                    type="number"
                    value={formData.maxParticipants}
                    onChange={(e) => setFormData(prev => ({ ...prev, maxParticipants: e.target.value }))}
                    placeholder="60"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="entryFee">Precio de Inscripción</Label>
                  <Input
                    id="entryFee"
                    type="number"
                    value={formData.entryFee}
                    onChange={(e) => setFormData(prev => ({ ...prev, entryFee: e.target.value }))}
                    placeholder="25000"
                  />
                </div>
                <div className="grid gap-2 grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="handicapMin">Hcp Mín</Label>
                    <Input
                      id="handicapMin"
                      type="number"
                      value={formData.handicapMin}
                      onChange={(e) => setFormData(prev => ({ ...prev, handicapMin: e.target.value }))}
                      placeholder="0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="handicapMax">Hcp Máx</Label>
                    <Input
                      id="handicapMax"
                      type="number"
                      value={formData.handicapMax}
                      onChange={(e) => setFormData(prev => ({ ...prev, handicapMax: e.target.value }))}
                      placeholder="36"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex gap-4 justify-end">
          <Button type="button" variant="outline" asChild>
            <Link href="/torneos">Cancelar</Link>
          </Button>
          <Button type="submit" disabled={isLoading}>
            <Save className="mr-2 h-4 w-4" />
            {isLoading ? 'Creando...' : 'Crear Torneo'}
          </Button>
        </div>
      </form>
    </div>
  )
}