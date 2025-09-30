'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import { Menu, Search, Bell, Settings, User, LogOut, ChevronDown, Globe } from 'lucide-react'
import { useI18n } from '@/contexts/i18n-context'
import { useAuth } from '@/contexts/auth-context'
import { User as UserType } from '@/lib/types'

interface HeaderProps {
  onMenuClick: () => void
  user: UserType
}

export default function Header({ onMenuClick, user }: HeaderProps) {
  const router = useRouter()
  const { logout } = useAuth()
  const { t, locale, setLocale } = useI18n()
  const [notifications] = useState([
    { id: 1, title: 'Nuevo usuario registrado', time: '5 min ago', unread: true },
    { id: 2, title: 'Torneo completado', time: '1 hora ago', unread: false },
  ])

  const handleLogout = async () => {
    await logout()
    router.push('/login')
  }

  const unreadCount = notifications.filter(n => n.unread).length

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 lg:px-6">
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        onClick={onMenuClick}
      >
        <Menu className="h-6 w-6" />
        <span className="sr-only">Toggle sidebar</span>
      </Button>

      <div className="flex-1">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder={t('search_placeholder')}
            className="pl-10 w-full"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs">
              {unreadCount}
            </Badge>
          )}
          <span className="sr-only">{t('notifications')}</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="px-2">
              <Globe className="h-4 w-4 mr-2" />
              <span className="hidden md:inline text-sm">{locale.toUpperCase()}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{t('language')}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setLocale('es')}>Español</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLocale('en')}>English</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 px-2">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center">
                  <span className="text-sm font-medium text-emerald-700">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
                </div>
              </div>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>{t('my_account')}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push('/perfil')}>
              <User className="mr-2 h-4 w-4" />
              {t('profile')}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push('/configuracion')}>
              <Settings className="mr-2 h-4 w-4" />
              {t('settings')}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              {t('logout')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}