// ============================================================================
// AUTHENTICATION & USER TYPES
// ============================================================================

export type UserRole = 'admin' | 'client';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  handicap?: number;
  memberSince: string;
  preferences?: UserPreferences;
  stats?: UserStats;
}

export interface UserPreferences {
  notifications: boolean;
  newsletter: boolean;
  publicProfile?: boolean;
  language: 'es' | 'en';
  timezone: string;
}

export interface UserStats {
  totalTournaments: number;
  totalTravels: number;
  averageScore: number;
  bestScore: number;
  favoriteDestination?: string;
}

// ============================================================================
// TOURNAMENT TYPES
// ============================================================================

export type TournamentStatus = 'draft' | 'open' | 'full' | 'in_progress' | 'completed' | 'cancelled';
export type TournamentFormat = 'stroke_play' | 'match_play' | 'scramble' | 'best_ball';

export interface Tournament {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  course: string;
  maxParticipants: number;
  currentParticipants: number;
  price: number;
  status: TournamentStatus;
  format: TournamentFormat;
  prizes: Prize[];
  requirements?: string[];
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Prize {
  position: string;
  description: string;
  value?: number;
}

export interface TournamentParticipant {
  id: string;
  tournamentId: string;
  userId: string;
  user: User;
  registrationDate: string;
  paymentStatus: 'pending' | 'paid' | 'refunded';
  handicap: number;
  specialRequests?: string;
}

// ============================================================================
// TRAVEL TYPES
// ============================================================================

export type TravelStatus = 'available' | 'limited' | 'sold_out' | 'completed' | 'cancelled';
export type AccommodationType = 'hotel' | 'resort' | 'villa' | 'apartment';

export interface Travel {
  id: string;
  name: string;
  description: string;
  destination: string;
  country: string;
  startDate: string;
  endDate: string;
  duration: number; // days
  maxParticipants: number;
  currentParticipants: number;
  price: number;
  status: TravelStatus;
  accommodation: Accommodation;
  golfCourses: GolfCourse[];
  inclusions: string[];
  exclusions: string[];
  itinerary: ItineraryDay[];
  images: string[];
  highlights: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Accommodation {
  name: string;
  type: AccommodationType;
  rating: number;
  description: string;
  amenities: string[];
}

export interface GolfCourse {
  name: string;
  par: number;
  length: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'professional';
  designer?: string;
  description: string;
  image: string;
}

export interface ItineraryDay {
  day: number;
  title: string;
  activities: string[];
  meals: ('breakfast' | 'lunch' | 'dinner')[];
  accommodation?: string;
}

// ============================================================================
// CONSULTATION TYPES
// ============================================================================

export type ConsultationStatus = 'new' | 'in_progress' | 'resolved' | 'closed';
export type ConsultationType = 'general' | 'booking' | 'technical' | 'complaint' | 'suggestion';
export type ConsultationPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface Consultation {
  id: string;
  userId: string;
  user: User;
  subject: string;
  message: string;
  type: ConsultationType;
  status: ConsultationStatus;
  priority: ConsultationPriority;
  assignedTo?: string;
  responses: ConsultationResponse[];
  attachments: string[];
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
}

export interface ConsultationResponse {
  id: string;
  consultationId: string;
  userId: string;
  user: User;
  message: string;
  isInternal: boolean;
  createdAt: string;
}

// ============================================================================
// ANALYTICS TYPES
// ============================================================================

export interface AnalyticsData {
  overview: OverviewMetrics;
  revenue: RevenueData;
  users: UserAnalytics;
  tournaments: TournamentAnalytics;
  travels: TravelAnalytics;
  consultations: ConsultationAnalytics;
}

export interface OverviewMetrics {
  totalUsers: number;
  totalRevenue: number;
  activeTournaments: number;
  activeTravels: number;
  pendingConsultations: number;
  monthlyGrowth: number;
}

export interface RevenueData {
  total: number;
  monthly: MonthlyRevenue[];
  byCategory: CategoryRevenue[];
  projectedAnnual: number;
}

export interface MonthlyRevenue {
  month: string;
  tournaments: number;
  travels: number;
  total: number;
}

export interface CategoryRevenue {
  category: 'tournaments' | 'travels' | 'other';
  amount: number;
  percentage: number;
}

export interface UserAnalytics {
  total: number;
  newThisMonth: number;
  activeUsers: number;
  retentionRate: number;
  byRole: { role: UserRole; count: number }[];
}

export interface TournamentAnalytics {
  total: number;
  completed: number;
  upcoming: number;
  averageParticipants: number;
  popularFormats: { format: TournamentFormat; count: number }[];
}

export interface TravelAnalytics {
  total: number;
  completed: number;
  upcoming: number;
  averageParticipants: number;
  popularDestinations: { destination: string; count: number }[];
}

export interface ConsultationAnalytics {
  total: number;
  resolved: number;
  pending: number;
  averageResponseTime: number; // hours
  byType: { type: ConsultationType; count: number }[];
}

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// ============================================================================
// FORM TYPES
// ============================================================================

export interface CreateUserForm {
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  handicap?: number;
}

export interface CreateTournamentForm {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  course: string;
  maxParticipants: number;
  price: number;
  format: TournamentFormat;
  requirements?: string[];
}

export interface CreateTravelForm {
  name: string;
  description: string;
  destination: string;
  country: string;
  startDate: string;
  endDate: string;
  maxParticipants: number;
  price: number;
  highlights: string[];
  inclusions: string[];
}
