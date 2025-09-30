'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { User as UserIcon, Mail, Phone, MapPin, Trophy, Target, Shield, Camera, Save } from 'lucide-react'
import { useAuth } from '@/contexts/auth-context'

export default function PerfilPage() {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    handicap: user?.handicap?.toString() || '',
    preferences: {
      notifications: user?.preferences?.notifications ?? true,
      newsletter: user?.preferences?.newsletter ?? true,
      language: user?.preferences?.language || 'es',
      timezone: user?.preferences?.timezone || 'America/Argentina/Buenos_Aires',
    },
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      // Placeholder for real API call
      await new Promise(resolve => setTimeout(resolve, 600))
      setIsEditing(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  const stats = {
    totalTournaments: user?.stats?.totalTournaments ?? 0,
    totalTravels: user?.stats?.totalTravels ?? 0,
    bestScore: user?.stats?.bestScore ?? 0,
    averageScore: user?.stats?.averageScore ?? 0,
    handicapImprovement: 0,
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Mi Perfil</h1>
        <p className="text-muted-foreground">Gestiona tu información personal y preferencias</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={user?.avatar || '/placeholder.svg'} />
                    <AvatarFallback className="text-lg">{user?.name?.split(' ').map(n => n[0]).join('') || 'U'}</AvatarFallback>
                  </Avatar>
                  <Button size="sm" className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0">
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-semibold">{user?.name}</h3>
                  <p className="text-muted-foreground">{user?.email}</p>
                  <Badge variant="secondary" className="mt-2">{user?.role === 'admin' ? 'Administrador' : 'Cliente'}</Badge>
                </div>
                <div className="w-full space-y-2 text-sm">
                  {user?.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{user.phone}</span>
                    </div>
                  )}
                  {user?.handicap !== undefined && (
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-muted-foreground" />
                      <span>Handicap: {user.handicap}</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Estadísticas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-emerald-600">{stats.totalTournaments}</div>
                  <p className="text-xs text-muted-foreground">Torneos</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">{stats.totalTravels}</div>
                  <p className="text-xs text-muted-foreground">Viajes</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm"><span>Mejor Score:</span><span className="font-semibold">{stats.bestScore}</span></div>
                <div className="flex justify-between text-sm"><span>Score Promedio:</span><span className="font-semibold">{stats.averageScore}</span></div>
                <div className="flex justify-between text-sm"><span>Mejora Handicap:</span><span className="font-semibold text-emerald-600">{stats.handicapImprovement}</span></div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Tabs defaultValue="personal" className="space-y-4">
            <TabsList>
              <TabsTrigger value="personal">Información Personal</TabsTrigger>
              <TabsTrigger value="preferences">Preferencias</TabsTrigger>
              <TabsTrigger value="security">Seguridad</TabsTrigger>
            </TabsList>

            <TabsContent value="personal">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Información Personal</CardTitle>
                      <CardDescription>Actualiza tu información de perfil</CardDescription>
                    </div>
                    <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>{isEditing ? 'Cancelar' : 'Editar'}</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {isEditing ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="name">Nombre Completo</Label>
                          <Input id="name" value={formData.name} onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" value={formData.email} onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))} />
                        </div>
                      </div>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Teléfono</Label>
                          <Input id="phone" value={formData.phone} onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="handicap">Handicap</Label>
                          <Input id="handicap" type="number" min="0" max="54" value={formData.handicap} onChange={e => setFormData(prev => ({ ...prev, handicap: e.target.value }))} />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bio">Biografía</Label>
                        <Textarea id="bio" value={''} onChange={() => {}} placeholder="Cuéntanos sobre ti..." rows={3} disabled />
                        <p className="text-xs text-muted-foreground">Biografía no disponible en esta versión.</p>
                      </div>
                      <div className="flex gap-4 pt-4">
                        <Button type="submit" disabled={isSubmitting}><Save className="mr-2 h-4 w-4" />{isSubmitting ? 'Guardando...' : 'Guardar Cambios'}</Button>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <Label className="text-sm font-medium">Nombre</Label>
                          <p className="text-sm text-muted-foreground">{user?.name || 'No especificado'}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium">Email</Label>
                          <p className="text-sm text-muted-foreground">{user?.email}</p>
                        </div>
                      </div>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <Label className="text-sm font-medium">Teléfono</Label>
                          <p className="text-sm text-muted-foreground">{user?.phone || 'No especificado'}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium">Handicap</Label>
                          <p className="text-sm text-muted-foreground">{user?.handicap ?? 'No especificado'}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preferences">
              <Card>
                <CardHeader>
                  <CardTitle>Preferencias</CardTitle>
                  <CardDescription>Configura tus preferencias de notificaciones</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Notificaciones por Email</Label>
                        <p className="text-sm text-muted-foreground">Recibe notificaciones sobre torneos y viajes</p>
                      </div>
                      <Switch checked={formData.preferences.notifications} onCheckedChange={checked => setFormData(prev => ({ ...prev, preferences: { ...prev.preferences, notifications: checked } }))} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Newsletter</Label>
                        <p className="text-sm text-muted-foreground">Recibe nuestro newsletter con novedades</p>
                      </div>
                      <Switch checked={formData.preferences.newsletter} onCheckedChange={checked => setFormData(prev => ({ ...prev, preferences: { ...prev.preferences, newsletter: checked } }))} />
                    </div>
                  </div>
                  <Button onClick={() => {}}><Save className="mr-2 h-4 w-4" />Guardar Preferencias</Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Shield className="h-5 w-5" />Seguridad</CardTitle>
                    <CardDescription>Gestiona la seguridad de tu cuenta</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">Actualizar Contraseña</Button>
                    <Button variant="outline" className="w-full justify-start">Configurar 2FA</Button>
                    <Button variant="outline" className="w-full justify-start">Ver Sesiones</Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}


