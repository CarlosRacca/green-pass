import { User, Tournament, Travel, Consultation, AnalyticsData } from './types'

// ============================================================================
// MOCK USERS DATA
// ============================================================================

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@greenpass.com',
    name: 'Carlos Racca',
    role: 'admin',
    avatar: '/admin-avatar.png',
    phone: '+54 11 1234-5678',
    memberSince: '2020-01-15',
    preferences: {
      notifications: true,
      newsletter: true,
      language: 'es',
      timezone: 'America/Argentina/Buenos_Aires',
    },
  },
  {
    id: '2',
    email: 'cliente@greenpass.com',
    name: 'Juan Pérez',
    role: 'client',
    avatar: '/client-avatar.png',
    phone: '+54 11 9876-5432',
    handicap: 18,
    memberSince: '2022-03-20',
    preferences: {
      notifications: true,
      newsletter: false,
      language: 'es',
      timezone: 'America/Argentina/Buenos_Aires',
    },
    stats: {
      totalTournaments: 12,
      totalTravels: 3,
      averageScore: 85,
      bestScore: 78,
      favoriteDestination: 'Pebble Beach',
    },
  },
]

// ============================================================================
// MOCK TOURNAMENTS DATA
// ============================================================================

export const mockTournaments: Tournament[] = [
  {
    id: '1',
    name: 'Torneo Masters Green Pass',
    description: 'Torneo premium en uno de los mejores campos de Argentina',
    startDate: '2025-03-15',
    endDate: '2025-03-17',
    location: 'Buenos Aires, Argentina',
    course: 'Jockey Club Argentino',
    maxParticipants: 120,
    currentParticipants: 87,
    price: 25000,
    status: 'open',
    format: 'stroke_play',
    prizes: [
      { position: '1er Lugar', description: 'Trofeo + $50,000', value: 50000 },
      { position: '2do Lugar', description: 'Trofeo + $25,000', value: 25000 },
      { position: '3er Lugar', description: 'Trofeo + $15,000', value: 15000 },
    ],
    requirements: ['Handicap máximo 24', 'Seguro de golf vigente'],
    images: ['/tournament-1.jpg', '/tournament-2.jpg'],
    createdAt: '2025-01-10T10:00:00Z',
    updatedAt: '2025-01-15T14:30:00Z',
  },
]

// ============================================================================
// MOCK TRAVELS DATA
// ============================================================================

export const mockTravels: Travel[] = [
  {
    id: '1',
    name: 'Golf en Escocia - Highlands Experience',
    description: 'Experiencia única jugando en los campos históricos de Escocia',
    destination: 'St. Andrews, Escocia',
    country: 'Reino Unido',
    startDate: '2025-06-10',
    endDate: '2025-06-17',
    duration: 7,
    maxParticipants: 16,
    currentParticipants: 12,
    price: 85000,
    status: 'available',
    accommodation: {
      name: 'Old Course Hotel',
      type: 'hotel',
      rating: 5,
      description: 'Hotel de lujo frente al famoso Old Course',
      amenities: ['Spa', 'Restaurante', 'Bar', 'Gimnasio', 'WiFi'],
    },
    golfCourses: [
      {
        name: 'Old Course St. Andrews',
        par: 72,
        length: 7279,
        difficulty: 'professional',
        designer: 'Tradicional',
        description: 'El campo de golf más famoso del mundo',
        image: '/course-st-andrews.jpg',
      },
    ],
    inclusions: ['Vuelos', 'Alojamiento', 'Desayunos', 'Green fees', 'Guía especializado'],
    exclusions: ['Almuerzos', 'Cenas', 'Bebidas alcohólicas', 'Propinas'],
    itinerary: [
      {
        day: 1,
        title: 'Llegada a Edimburgo',
        activities: ['Traslado al hotel', 'Cena de bienvenida'],
        meals: ['dinner'],
        accommodation: 'Old Course Hotel',
      },
    ],
    images: ['/scotland-golf-1.jpg', '/scotland-golf-2.jpg'],
    highlights: ['Old Course St. Andrews', 'Castillo de St. Andrews', 'Whisky tasting'],
    createdAt: '2025-01-05T09:00:00Z',
    updatedAt: '2025-01-12T16:45:00Z',
  },
]

// ============================================================================
// MOCK CONSULTATIONS DATA
// ============================================================================

export const mockConsultations: Consultation[] = [
  {
    id: '1',
    userId: '2',
    user: mockUsers[1],
    subject: 'Consulta sobre torneo Masters',
    message: 'Hola, quería consultar sobre los requisitos para participar en el torneo Masters.',
    type: 'booking',
    status: 'new',
    priority: 'medium',
    responses: [],
    attachments: [],
    createdAt: '2025-01-20T10:30:00Z',
    updatedAt: '2025-01-20T10:30:00Z',
  },
]

// ============================================================================
// MOCK ANALYTICS DATA
// ============================================================================

export const mockAnalytics: AnalyticsData = {
  overview: {
    totalUsers: 1247,
    totalRevenue: 2850000,
    activeTournaments: 8,
    activeTravels: 5,
    pendingConsultations: 12,
    monthlyGrowth: 15.8,
  },
  revenue: {
    total: 2850000,
    monthly: [
      { month: 'Ene', tournaments: 450000, travels: 320000, total: 770000 },
      { month: 'Feb', tournaments: 380000, travels: 280000, total: 660000 },
      { month: 'Mar', tournaments: 520000, travels: 410000, total: 930000 },
    ],
    byCategory: [
      { category: 'tournaments', amount: 1650000, percentage: 58 },
      { category: 'travels', amount: 1200000, percentage: 42 },
    ],
    projectedAnnual: 3400000,
  },
  users: {
    total: 1247,
    newThisMonth: 89,
    activeUsers: 892,
    retentionRate: 78.5,
    byRole: [
      { role: 'client', count: 1235 },
      { role: 'admin', count: 12 },
    ],
  },
  tournaments: {
    total: 24,
    completed: 16,
    upcoming: 8,
    averageParticipants: 95,
    popularFormats: [
      { format: 'stroke_play', count: 18 },
      { format: 'scramble', count: 4 },
      { format: 'match_play', count: 2 },
    ],
  },
  travels: {
    total: 12,
    completed: 7,
    upcoming: 5,
    averageParticipants: 14,
    popularDestinations: [
      { destination: 'Escocia', count: 4 },
      { destination: 'Estados Unidos', count: 3 },
      { destination: 'España', count: 2 },
    ],
  },
  consultations: {
    total: 156,
    resolved: 144,
    pending: 12,
    averageResponseTime: 4.2,
    byType: [
      { type: 'booking', count: 89 },
      { type: 'general', count: 34 },
      { type: 'technical', count: 21 },
      { type: 'complaint', count: 8 },
      { type: 'suggestion', count: 4 },
    ],
  },
}


