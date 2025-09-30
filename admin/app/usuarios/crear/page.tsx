'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { ArrowLeft, Save, User } from 'lucide-react'
import Link from 'next/link'

export default function CrearUsuarioPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      console.log('Creating user:', formData)
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      router.push('/usuarios')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" asChild>
          <Link href="/usuarios">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a Usuarios
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Crear Nuevo Usuario</h1>
          <p className="text-muted-foreground">Registra un nuevo miembro</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Información Personal
                </CardTitle>
                <CardDescription>
                  Datos básicos del usuario
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre Completo</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Juan Pérez"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="juan@ejemplo.com"
                      required
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
                      placeholder="+54 11 1234-5678"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Ubicación</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="Buenos Aires, Argentina"
                    />
                  </div>
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
                  <Label htmlFor="role">Rol</Label>
                  <Select value={formData.role} onValueChange={(value: 'admin' | 'client') => setFormData(prev => ({ ...prev, role: value }))}>
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
                    placeholder="18"
                    min="0"
                    max="54"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Preferencias</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="notifications">Notificaciones</Label>
                  <Switch
                    id="notifications"
                    checked={formData.preferences.notifications}
                    onCheckedChange={(checked) => 
                      setFormData(prev => ({ 
                        ...prev, 
                        preferences: { ...prev.preferences, notifications: checked }
                      }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="newsletter">Newsletter</Label>
                  <Switch
                    id="newsletter"
                    checked={formData.preferences.newsletter}
                    onCheckedChange={(checked) => 
                      setFormData(prev => ({ 
                        ...prev, 
                        preferences: { ...prev.preferences, newsletter: checked }
                      }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="publicProfile">Perfil Público</Label>
                  <Switch
                    id="publicProfile"
                    checked={formData.preferences.publicProfile}
                    onCheckedChange={(checked) => 
                      setFormData(prev => ({ 
                        ...prev, 
                        preferences: { ...prev.preferences, publicProfile: checked }
                      }))
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex gap-4 justify-end">
          <Button type="button" variant="outline" asChild>
            <Link href="/usuarios">Cancelar</Link>
          </Button>
          <Button type="submit" disabled={isLoading}>
            <Save className="mr-2 h-4 w-4" />
            {isLoading ? 'Creando...' : 'Crear Usuario'}
          </Button>
        </div>
      </form>
    </div>
  )
}