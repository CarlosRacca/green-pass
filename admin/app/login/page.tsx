'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Eye, EyeOff, Mail, Lock, AlertCircle } from 'lucide-react'
import { useAuth } from '@/contexts/auth-context'
import { useI18n } from '@/contexts/i18n-context'

export default function LoginPage() {
  const { login, isAuthenticated, user } = useAuth()
  const { t } = useI18n()
  const router = useRouter()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (isAuthenticated && user) {
      router.push('/')
    }
  }, [isAuthenticated, user, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      const result = await login(formData.email, formData.password)
      if (!result.success) {
        setError(result.error || 'Error de login')
      }
    } catch (error) {
      setError('Error de conexión')
    } finally {
      setIsSubmitting(false)
    }
  }

  const quickLogin = async (email: string, password: string) => {
    setFormData({ email, password })
    setError('')
    setIsSubmitting(true)
    
    try {
      const result = await login(email, password)
      if (!result.success) {
        setError(result.error || 'Error de login')
      }
    } catch (error) {
      setError('Error de conexión')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600" />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-100">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-emerald-800">GREEN PASS</h1>
          <p className="text-emerald-600 mt-2">Golf Experience Platform</p>
        </div>

        <Card className="shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">{t('login')}</CardTitle>
            <CardDescription className="text-center">&nbsp;</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t('email')}</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="tu@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">{t('password')}</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    className="pl-10 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? t('signing_in') : t('login')}
              </Button>
            </form>

            <div className="space-y-2">
              <p className="text-sm text-muted-foreground text-center">{t('demo_accounts')}:</p>
              
              <div className="grid gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => quickLogin('carlos@greenpass.com', '123456')}
                  disabled={isSubmitting}
                  className="w-full text-left justify-start"
                >
                  <div className="text-left">
                    <div className="font-medium">👨‍💼 {t('administrator')}</div>
                    <div className="text-xs text-muted-foreground">carlos@greenpass.com</div>
                  </div>
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={() => quickLogin('juan@greenpass.com', '123456')}
                  disabled={isSubmitting}
                  className="w-full text-left justify-start"
                >
                  <div className="text-left">
                    <div className="font-medium">👤 {t('client_role')}</div>
                    <div className="text-xs text-muted-foreground">juan@greenpass.com</div>
                  </div>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}