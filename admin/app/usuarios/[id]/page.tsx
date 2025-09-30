'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { ArrowLeft, Save, User, Mail, Phone, Calendar, Trophy, MapPin } from 'lucide-react'
import Link from 'next/link'
import { useUser } from '@/hooks/use-api'

export default function UsuarioDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { user, isLoading } = useUser(params.id as string)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'client' as 'admin' | 'client',
    handicap: '',
    location: '',
    bio: '',
    preferences: {
      notifications: true,
      newsletter: false,
      publicProfile: false
    }
  })

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        role: user.role || 'client',
        handicap: user.handicap?.toString() || '',
        location: user.location || '',
        bio: user.bio || '',
        preferences: user.preferences || {
          notifications: true,
          newsletter: false,
          publicProfile: false
        }
      })
    }
  }, [user])

  const handleSave = async () => {
    setIsSaving(true)
    try {
      console.log('Updating user:', formData)
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      setIsEditing(false)
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" asChild>
          <Link href="/usuarios">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a Usuarios
          </Link>
        </Button>
        <Card>
          <CardContent className="p-12 text-center">
            <h3 className="text-lg font-semibold mb-2">Usuario no encontrado</h3>
            <p className="text-muted-foreground">El usuario que buscas no existe o ha sido eliminado.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/usuarios">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver a Usuarios
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Perfil de Usuario</h1>
            <p className="text-muted-foreground">Información detallada del usuario</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
            {user.role === 'admin' ? 'Administrador' : 'Cliente'}
          </Badge>
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)}>
              Editar
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSave} disabled={isSaving}>
                <Save className="mr-2 h-4 w-4" />
                {isSaving ? 'Guardando...' : 'Guardar'}
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Información Personal
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 mb-6">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={user.avatar || '/placeholder.svg'} />
                  <AvatarFallback className="text-lg">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold">{user.name}</h3>
                  <p className="text-muted-foreground">{user.email}</p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre Completo</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Ubicación</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {user.stats && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Estadísticas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{user.stats.tournamentsPlayed}</div>
                    <div className="text-sm text-muted-foreground">Torneos Jugados</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{user.stats.tournamentsWon}</div>
                    <div className="text-sm text-muted-foreground">Torneos Ganados</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{user.stats.travelsBooked}</div>
                    <div className="text-sm text-muted-foreground">Viajes Reservados</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Configuración</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="role">Rol</Label>
                <Select 
                  value={formData.role} 
                  onValueChange={(value: 'admin' | 'client') => setFormData(prev => ({ ...prev, role: value }))}
                  disabled={!isEditing}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="client">Cliente</SelectItem>
                    <SelectItem value="admin">Administrador</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="handicap">Handicap</Label>
                <Input
                  id="handicap"
                  type="number"
                  value={formData.handicap}
                  onChange={(e) => setFormData(prev => ({ ...prev, handicap: e.target.value }))}
                  disabled={!isEditing}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Información de Cuenta</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{user.email}</span>
              </div>
              {user.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{user.phone}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Miembro desde {new Date(user.memberSince).toLocaleDateString()}</span>
              </div>
              {user.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{user.location}</span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}