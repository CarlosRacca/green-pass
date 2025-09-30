'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ArrowLeft, Send, Mail, Phone, User } from 'lucide-react'
import Link from 'next/link'
import { useConsultation } from '@/hooks/use-api'
import type { Consultation } from '@/lib/types'

export default function ConsultationDetailPage() {
  const params = useParams()
  const { consultation, isLoading } = useConsultation(params.id as string)
  const [response, setResponse] = useState('')
  const [newStatus, setNewStatus] = useState<Consultation['status']>('new')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmitResponse = async () => {
    if (!response.trim()) return
    setIsSubmitting(true)
    try {
      console.log('Adding response:', response)
      setResponse('')
      if (newStatus !== consultation?.status) {
        console.log('Updating status to:', newStatus)
      }
    } finally {
      setIsSubmitting(false)
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
            <div className="h-20 w-full bg-gray-200 rounded animate-pulse" />
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!consultation) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" asChild>
          <Link href="/consultas">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a Consultas
          </Link>
        </Button>
        <Card>
          <CardContent className="p-12 text-center">
            <h3 className="text-lg font-semibold mb-2">Consulta no encontrada</h3>
            <p className="text-muted-foreground">La consulta que buscas no existe o ha sido eliminada.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" asChild>
          <Link href="/consultas">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a Consultas
          </Link>
        </Button>
        <div className="flex items-center gap-2">
          <Badge variant={consultation.status === 'new' ? 'destructive' : 'secondary'}>
            {consultation.status === 'new' ? 'Nueva' : consultation.status === 'in_progress' ? 'En Progreso' : 'Resuelta'}
          </Badge>
          <Badge variant="outline">{consultation.priority}</Badge>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{consultation.subject}</CardTitle>
              <CardDescription>
                Consulta #{consultation.id} • {new Date(consultation.createdAt).toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="prose max-w-none">
                <p>{consultation.message}</p>
              </div>
              {consultation.attachments && consultation.attachments.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2">Archivos adjuntos</h4>
                  <div className="space-y-2">
                    {consultation.attachments.map((attachment, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 border rounded">
                        <span className="text-sm">{attachment}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Respuestas ({consultation.responses?.length || 0})</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {consultation.responses && consultation.responses.length > 0 ? (
                consultation.responses.map((resp, index) => (
                  <div key={index} className="border-l-4 border-emerald-500 pl-4 py-2">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold">Administrador</span>
                      <span className="text-sm text-muted-foreground">{new Date(resp.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="text-sm">{resp.message}</p>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-center py-4">Aún no hay respuestas para esta consulta.</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Agregar Respuesta</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea placeholder="Escribe tu respuesta aquí..." value={response} onChange={e => setResponse(e.target.value)} rows={4} />
              <div className="flex items-center justify-between">
                <Select value={newStatus} onValueChange={(value: Consultation['status']) => setNewStatus(value)}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">Nueva</SelectItem>
                    <SelectItem value="in_progress">En Progreso</SelectItem>
                    <SelectItem value="resolved">Resuelta</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={handleSubmitResponse} disabled={!response.trim() || isSubmitting}>
                  <Send className="mr-2 h-4 w-4" />
                  {isSubmitting ? 'Enviando...' : 'Enviar Respuesta'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Información del Usuario</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={consultation.user.avatar || '/placeholder.svg'} />
                  <AvatarFallback>{consultation.user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{consultation.user.name}</p>
                  <p className="text-sm text-muted-foreground">{consultation.user.role}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{consultation.user.email}</span>
                </div>
                {consultation.user.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{consultation.user.phone}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Miembro desde {new Date(consultation.user.memberSince).toLocaleDateString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Detalles de la Consulta</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <span className="text-sm font-medium">Tipo:</span>
                <Badge variant="outline" className="ml-2">{consultation.type}</Badge>
              </div>
              <div>
                <span className="text-sm font-medium">Prioridad:</span>
                <Badge variant="outline" className="ml-2">{consultation.priority}</Badge>
              </div>
              <div>
                <span className="text-sm font-medium">Creada:</span>
                <p className="text-sm text-muted-foreground">{new Date(consultation.createdAt).toLocaleString()}</p>
              </div>
              <div>
                <span className="text-sm font-medium">Última actualización:</span>
                <p className="text-sm text-muted-foreground">{new Date(consultation.updatedAt).toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
