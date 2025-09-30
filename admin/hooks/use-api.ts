import useSWR from 'swr'
import { User, Tournament, Travel, Consultation, AnalyticsData } from '@/lib/types'
import { API_URL, getAuthToken } from '@/lib/api'

// ============================================================================
// API FETCHER
// ============================================================================

const fetcher = async (path: string) => {
  const token = typeof window !== 'undefined' ? getAuthToken() : null
  const res = await fetch(`${API_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  })
  if (!res.ok) throw new Error('Error fetching data')
  return res.json()
}

// ============================================================================
// USER HOOKS
// ============================================================================

export function useUsers() {
  const { data, error, mutate } = useSWR<any[]>('/users', fetcher)
  const mapped = data?.map((u) => ({
    id: String(u.id),
    email: u.email,
    name: [u.nombre, u.apellido].filter(Boolean).join(' ') || u.email,
    role: (u.role === 'admin' || u.role === 'superadmin') ? 'admin' : 'client',
    phone: u.telefono || undefined,
    handicap: typeof u.handicap === 'number' ? u.handicap : undefined,
    memberSince: new Date().toISOString(),
  })) as unknown as User[]
  return { users: mapped, isLoading: !error && !data, isError: error, mutate }
}

export function useUser(id: string) {
  const { data, error, mutate } = useSWR<any>(id ? `/users/${id}` : null, fetcher)
  const mapped = data ? ({
    id: String(data.id),
    email: data.email,
    name: [data.nombre, data.apellido].filter(Boolean).join(' ') || data.email,
    role: (data.role === 'admin' || data.role === 'superadmin') ? 'admin' : 'client',
    phone: data.telefono || undefined,
    handicap: typeof data.handicap === 'number' ? data.handicap : undefined,
    memberSince: new Date().toISOString(),
  } as User) : undefined
  return { user: mapped, isLoading: !error && !data, isError: error, mutate }
}

// ============================================================================
// TOURNAMENT HOOKS
// ============================================================================

export function useTournaments() {
  const { data, error, mutate } = useSWR<any[]>('/torneos', fetcher)
  const mapped = data?.map((t) => ({
    id: String(t.id),
    name: t.nombre,
    description: '',
    startDate: t.fecha_inicio,
    endDate: t.fecha_fin,
    location: '',
    course: '',
    maxParticipants: 0,
    currentParticipants: 0,
    price: 0,
    format: 'stroke_play',
    status: t.finalizado ? 'completed' : 'open',
    requirements: [],
    prizes: [],
    images: [],
    createdAt: '',
    updatedAt: '',
  })) as unknown as Tournament[]
  return { tournaments: mapped, isLoading: !error && !data, isError: error, mutate }
}

export function useTournament(id: string) {
  const { data, error, mutate } = useSWR<any>(id ? `/torneos/${id}/completo` : null, fetcher)
  const mapped = data ? ({
    id: String(data.torneo?.id || id),
    name: data.torneo?.nombre || 'Torneo',
    description: '',
    startDate: data.torneo?.fecha_inicio,
    endDate: data.torneo?.fecha_fin,
    location: '',
    course: '',
    maxParticipants: 0,
    currentParticipants: 0,
    price: 0,
    format: 'stroke_play',
    status: data.torneo?.finalizado ? 'completed' : 'open',
    requirements: [],
    prizes: [],
    images: [],
    createdAt: '',
    updatedAt: '',
  } as Tournament) : undefined
  return { tournament: mapped, isLoading: !error && !data, isError: error, mutate }
}

// ============================================================================
// TRAVEL HOOKS
// ============================================================================

export function useTravels() {
  const { data, error, mutate } = useSWR<any[]>('/paquetes', fetcher)
  const mapped = data?.map((p) => ({
    id: String(p.id),
    name: p.nombre,
    destination: p.destino || '',
    country: '',
    duration: p.duracion || '',
    price: Number(p.precio) || 0,
    status: 'available',
    images: p.imagen_url ? [p.imagen_url] : [],
    highlights: [],
    itinerary: [],
    inclusions: [],
    exclusions: [],
  })) as unknown as Travel[]
  return { travels: mapped, isLoading: !error && !data, isError: error, mutate }
}

export function useTravel(id: string) {
  const { data, error, mutate } = useSWR<any>(id ? `/paquetes/${id}` : null, fetcher)
  const mapped = data ? ({
    id: String(data.id),
    name: data.nombre,
    destination: data.destino || '',
    country: '',
    duration: data.duracion || '',
    price: Number(data.precio) || 0,
    status: 'available',
    images: data.imagen_url ? [data.imagen_url] : [],
    highlights: [],
    itinerary: [],
    inclusions: [],
    exclusions: [],
  } as Travel) : undefined
  return { travel: mapped, isLoading: !error && !data, isError: error, mutate }
}

// ============================================================================
// CONSULTATION HOOKS
// ============================================================================

export function useConsultations() {
  // Mantener mock local del admin para consultas
  const localFetcher = async (url: string) => {
    const res = await fetch(url)
    if (!res.ok) throw new Error('Error fetching data')
    return res.json()
  }
  const { data, error, mutate } = useSWR<Consultation[]>('/api/consultations', localFetcher)
  return { consultations: data, isLoading: !error && !data, isError: error, mutate }
}

export function useConsultation(id: string) {
  const localFetcher = async (url: string) => {
    const res = await fetch(url)
    if (!res.ok) throw new Error('Error fetching data')
    return res.json()
  }
  const { data, error, mutate } = useSWR<Consultation>(id ? `/api/consultations/${id}` : null, localFetcher)
  return { consultation: data, isLoading: !error && !data, isError: error, mutate }
}

// ============================================================================
// ANALYTICS HOOKS
// ============================================================================

export function useAnalytics() {
  // Mantener analytics del propio Next.js (mock interno)
  const localFetcher = async (url: string) => {
    const res = await fetch(url)
    if (!res.ok) throw new Error('Error fetching data')
    return res.json()
  }
  const { data, error, mutate } = useSWR<AnalyticsData>('/api/analytics', localFetcher)
  return { analytics: data, isLoading: !error && !data, isError: error, mutate }
}


