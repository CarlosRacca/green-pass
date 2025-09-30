'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Search, Trophy, MapPin, Users, MessageSquare, Calendar, TrendingUp, FileText, Settings, User as UserIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { mockUsers, mockTournaments, mockTravels, mockConsultations } from '@/lib/data'

interface SearchResult {
  id: string
  title: string
  description: string
  type: 'tournament' | 'travel' | 'user' | 'consultation' | 'page'
  url: string
  icon: JSX.Element
  category: string
}

interface GlobalSearchProps { className?: string }

export function GlobalSearch({ className }: GlobalSearchProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setIsOpen(open => !open)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([])
      return
    }
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 200))
    const searchResults: SearchResult[] = []
    const lowerQuery = searchQuery.toLowerCase()

    mockTournaments.forEach(tournament => {
      if (tournament.name.toLowerCase().includes(lowerQuery) || tournament.location.toLowerCase().includes(lowerQuery) || tournament.course.toLowerCase().includes(lowerQuery)) {
        searchResults.push({ id: `tournament-${tournament.id}`, title: tournament.name, description: `${tournament.location} • ${tournament.course}`, type: 'tournament', url: `/torneos/${tournament.id}`, icon: <Trophy className="h-4 w-4" />, category: 'Torneos' })
      }
    })
    mockTravels.forEach(travel => {
      if (travel.name.toLowerCase().includes(lowerQuery) || travel.destination.toLowerCase().includes(lowerQuery) || travel.country.toLowerCase().includes(lowerQuery)) {
        searchResults.push({ id: `travel-${travel.id}`, title: travel.name, description: `${travel.destination}, ${travel.country} • ${travel.duration} días`, type: 'travel', url: `/viajes/${travel.id}`, icon: <MapPin className="h-4 w-4" />, category: 'Viajes' })
      }
    })
    mockUsers.forEach(user => {
      if (user.name.toLowerCase().includes(lowerQuery) || user.email.toLowerCase().includes(lowerQuery)) {
        searchResults.push({ id: `user-${user.id}`, title: user.name, description: `${user.email} • ${user.role === 'admin' ? 'Administrador' : 'Cliente'}`, type: 'user', url: `/usuarios/${user.id}`, icon: <UserIcon className="h-4 w-4" />, category: 'Usuarios' })
      }
    })
    mockConsultations.forEach(consultation => {
      if (consultation.subject.toLowerCase().includes(lowerQuery) || consultation.message.toLowerCase().includes(lowerQuery)) {
        searchResults.push({ id: `consultation-${consultation.id}`, title: consultation.subject, description: `${consultation.user.name} • ${consultation.type}`, type: 'consultation', url: `/consultas/${consultation.id}`, icon: <MessageSquare className="h-4 w-4" />, category: 'Consultas' })
      }
    })
    const pages = [
      { name: 'Dashboard', url: '/', description: 'Panel principal de administración' },
      { name: 'Analytics', url: '/analytics', description: 'Estadísticas y métricas' },
      { name: 'Calendario', url: '/calendario', description: 'Eventos y fechas importantes' },
      { name: 'Configuración', url: '/configuracion', description: 'Ajustes del sistema' },
    ]
    pages.forEach(page => {
      if (page.name.toLowerCase().includes(lowerQuery)) {
        searchResults.push({ id: `page-${page.url}`, title: page.name, description: page.description, type: 'page', url: page.url, icon: page.name === 'Analytics' ? <TrendingUp className="h-4 w-4" /> : page.name === 'Calendario' ? <Calendar className="h-4 w-4" /> : page.name === 'Configuración' ? <Settings className="h-4 w-4" /> : <FileText className="h-4 w-4" />, category: 'Páginas' })
      }
    })
    setResults(searchResults.slice(0, 20))
    setIsLoading(false)
  }

  useEffect(() => {
    const timer = setTimeout(() => { performSearch(query) }, 300)
    return () => clearTimeout(timer)
  }, [query])

  const handleSelect = (result: SearchResult) => {
    setIsOpen(false)
    setQuery('')
    router.push(result.url)
  }

  const groupedResults = results.reduce((acc, result) => {
    if (!acc[result.category]) acc[result.category] = []
    acc[result.category].push(result)
    return acc
  }, {} as Record<string, SearchResult[]>)

  return (
    <>
      <Button variant="outline" className={cn('relative h-9 w-9 p-0 xl:h-10 xl:w-60 xl:justify-start xl:px-3 xl:py-2', className)} onClick={() => setIsOpen(true)}>
        <Search className="h-4 w-4 xl:mr-2" />
        <span className="hidden xl:inline-flex">Buscar...</span>
        <kbd className="pointer-events-none absolute right-1.5 top-2 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 xl:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
        <CommandInput placeholder="Buscar torneos, viajes, usuarios..." value={query} onValueChange={setQuery} />
        <CommandList>
          {isLoading ? (
            <div className="flex items-center justify-center py-6">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
          ) : results.length === 0 && query ? (
            <CommandEmpty>
              <div className="flex flex-col items-center gap-2 py-6">
                <Search className="h-8 w-8 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">No se encontraron resultados para "{query}"</p>
              </div>
            </CommandEmpty>
          ) : (
            Object.entries(groupedResults).map(([category, categoryResults]) => (
              <CommandGroup key={category} heading={category}>
                {categoryResults.map(result => (
                  <CommandItem key={result.id} value={result.title} onSelect={() => handleSelect(result)} className="flex items-center gap-3 px-3 py-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md border bg-background">{result.icon}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium leading-none">{result.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">{result.description}</p>
                    </div>
                    <Badge variant="secondary" className="text-xs">{result.type === 'tournament' ? 'Torneo' : result.type === 'travel' ? 'Viaje' : result.type === 'user' ? 'Usuario' : result.type === 'consultation' ? 'Consulta' : 'Página'}</Badge>
                  </CommandItem>
                ))}
              </CommandGroup>
            ))
          )}
        </CommandList>
      </CommandDialog>
    </>
  )
}

export function SearchSuggestions() {
  const router = useRouter()
  const suggestions = [
    { label: 'Torneos activos', url: '/torneos?status=open', icon: <Trophy className="h-4 w-4" /> },
    { label: 'Viajes disponibles', url: '/viajes?status=available', icon: <MapPin className="h-4 w-4" /> },
    { label: 'Consultas pendientes', url: '/consultas?status=new', icon: <MessageSquare className="h-4 w-4" /> },
    { label: 'Usuarios recientes', url: '/usuarios?sort=recent', icon: <Users className="h-4 w-4" /> },
  ]
  return (
    <Card className="w-full max-w-md">
      <CardContent className="p-4">
        <h4 className="text-sm font-medium mb-3">Búsquedas rápidas</h4>
        <div className="space-y-2">
          {suggestions.map((s, i) => (
            <Button key={i} variant="ghost" className="w-full justify-start h-auto p-2" onClick={() => router.push(s.url)}>
              {s.icon}
              <span className="ml-2 text-sm">{s.label}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}


