'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { LayoutDashboard, Users, Trophy, MapPin, MessageSquare, BarChart3, UserPlus, Calendar, Heart, Settings, X, ChevronDown, ChevronRight } from 'lucide-react'
import type { UserRole } from '@/lib/types'
import { useI18n } from '@/contexts/i18n-context'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  userRole: UserRole
}

interface NavItem {
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  roles: UserRole[]
  children?: NavItem[]
}

const navigation: NavItem[] = [
  {
    name: 'dashboard',
    href: '/',
    icon: LayoutDashboard,
    roles: ['admin', 'client'],
  },
  {
    name: 'consultations',
    href: '/consultas',
    icon: MessageSquare,
    roles: ['admin'],
  },
  {
    name: 'users',
    href: '/usuarios',
    icon: Users,
    roles: ['admin'],
    children: [
      { name: 'users', href: '/usuarios', icon: Users, roles: ['admin'] },
      { name: 'create', href: '/usuarios/crear', icon: UserPlus, roles: ['admin'] },
    ],
  },
  {
    name: 'tournaments',
    href: '/torneos',
    icon: Trophy,
    roles: ['admin'],
    children: [
      { name: 'tournaments', href: '/torneos', icon: Trophy, roles: ['admin'] },
      { name: 'create', href: '/torneos/crear', icon: Trophy, roles: ['admin'] },
    ],
  },
  {
    name: 'travels',
    href: '/viajes',
    icon: MapPin,
    roles: ['admin'],
  },
  {
    name: 'groups',
    href: '/grupos',
    icon: Users,
    roles: ['admin'],
  },
  {
    name: 'analytics',
    href: '/analytics',
    icon: BarChart3,
    roles: ['admin'],
  },
  // Client Navigation
  {
    name: 'travels',
    href: '/experiencias',
    icon: MapPin,
    roles: ['client'],
  },
  {
    name: 'tournaments',
    href: '/mis-torneos',
    icon: Trophy,
    roles: ['client'],
  },
  {
    name: 'travels',
    href: '/mis-viajes',
    icon: MapPin,
    roles: ['client'],
  },
  {
    name: 'calendar',
    href: '/calendario',
    icon: Calendar,
    roles: ['client'],
  },
  {
    name: 'favorites',
    href: '/favoritos',
    icon: Heart,
    roles: ['client'],
  },
  {
    name: 'settings',
    href: '/perfil',
    icon: Settings,
    roles: ['client'],
  },
]

export default function Sidebar({ isOpen, onClose, userRole }: SidebarProps) {
  const { t } = useI18n()
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const toggleExpanded = (itemName: string) => {
    setExpandedItems(prev => (prev.includes(itemName) ? prev.filter(name => name !== itemName) : [...prev, itemName]))
  }

  const filteredNavigation = navigation.filter(item => item.roles.includes(userRole))

  const NavItemComponent = ({ item, level = 0 }: { item: NavItem; level?: number }) => {
    const isActive = pathname === item.href
    const isExpanded = expandedItems.includes(item.name)
    const hasChildren = item.children && item.children.length > 0

    return (
      <div key={item.name}>
        <div className="flex items-center">
          <Link
            href={item.href}
            className={cn(
              'group flex flex-1 items-center rounded-md px-2 py-2 text-sm font-medium transition-colors',
              level > 0 && 'ml-6',
              isActive ? 'bg-emerald-100 text-emerald-700' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900',
            )}
            onClick={onClose}
          >
            <item.icon className={cn('mr-3 h-5 w-5 flex-shrink-0', isActive ? 'text-emerald-500' : 'text-gray-400 group-hover:text-gray-500')} />
            {t(item.name)}
          </Link>

          {hasChildren && (
            <button onClick={() => toggleExpanded(item.name)} className="p-1 text-gray-400 hover:text-gray-600">
              {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </button>
          )}
        </div>

        {hasChildren && isExpanded && (
          <div className="mt-1 space-y-1">
            {item.children?.map(child => (
              <NavItemComponent key={child.name} item={child} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4 shadow-xl">
          {/* Logo */}
          <div className="flex h-16 shrink-0 items-center">
            <Image src="/placeholder.svg" alt="Green Pass" width={150} height={40} className="h-8 w-auto" priority />
          </div>
          {/* Navigation */}
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {filteredNavigation.map(item => (
                    <li key={item.name}>
                      <NavItemComponent item={item} />
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className={cn('fixed inset-y-0 z-50 flex w-64 flex-col transition-transform duration-300 ease-in-out lg:hidden', isOpen ? 'translate-x-0' : '-translate-x-full')}>
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4 shadow-xl">
          {/* Mobile Header */}
          <div className="flex h-16 shrink-0 items-center justify-between">
            <Image src="/placeholder.svg" alt="Green Pass" width={150} height={40} className="h-8 w-auto" priority />
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="h-6 w-6" />
            </button>
          </div>
          {/* Mobile Navigation */}
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {filteredNavigation.map(item => (
                    <li key={item.name}>
                      <NavItemComponent item={item} />
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  )
}
