import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users as UsersIcon, Mail, Phone, MapPin, Calendar, Edit, Trash2 } from "lucide-react"
import { useUsers } from '@/hooks/use-api'
import { useI18n } from '@/contexts/i18n-context'

export default function UsuariosPage() {
  const { users, isLoading } = useUsers()
  const { t } = useI18n()

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Card key={i}><CardContent className="p-6"><div className="h-24 bg-gray-100 rounded animate-pulse" /></CardContent></Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{t('users')}</h1>
          <p className="text-muted-foreground">{t('manage_users')}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">{t('export')}</Button>
          <Button>{t('create_user')}</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {users?.map((usuario) => (
          <Card key={usuario.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={"/placeholder.svg"} />
                    <AvatarFallback>
                      {usuario.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{usuario.name}</CardTitle>
                    {typeof usuario.handicap === 'number' && (
                      <CardDescription>Handicap: {usuario.handicap}</CardDescription>
                    )}
                  </div>
                </div>
                <Badge variant={usuario.role === 'admin' ? 'default' : 'secondary'}>
                  {usuario.role === 'admin' ? t('role_admin') : t('role_client')}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  {usuario.email}
                </div>
                {usuario.phone && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="w-4 h-4" />
                    {usuario.phone}
                  </div>
                )}
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  {t('registered')}: {new Date(usuario.memberSince).toLocaleDateString()}
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button size="sm" variant="outline">
                  <Edit className="w-4 h-4 mr-2" />
                  {t('edit')}
                </Button>
                <Button size="sm" variant="outline">
                  <Trash2 className="w-4 h-4 mr-2" />
                  {t('delete')}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
