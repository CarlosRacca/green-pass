import { NextRequest, NextResponse } from 'next/server'
import { mockTravels } from '@/lib/data'
import type { Travel } from '@/lib/types'

// GET with filters, search, price range, pagination
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const destination = searchParams.get('destination')
    const search = searchParams.get('search')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')

    let filtered = [...mockTravels]
    if (status && status !== 'all') filtered = filtered.filter(t => t.status === status)
    if (destination && destination !== 'all') {
      const d = destination.toLowerCase()
      filtered = filtered.filter(t => t.destination.toLowerCase().includes(d) || t.country.toLowerCase().includes(d))
    }
    if (minPrice) filtered = filtered.filter(t => t.price >= parseInt(minPrice))
    if (maxPrice) filtered = filtered.filter(t => t.price <= parseInt(maxPrice))
    if (search) {
      const q = search.toLowerCase()
      filtered = filtered.filter(t => t.name.toLowerCase().includes(q) || t.destination.toLowerCase().includes(q) || t.country.toLowerCase().includes(q) || t.description.toLowerCase().includes(q))
    }
    filtered.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
    const start = (page - 1) * limit
    const end = start + limit
    const data = filtered.slice(start, end)
    return NextResponse.json({ success: true, data, pagination: { page, limit, total: filtered.length, totalPages: Math.ceil(filtered.length / limit) } })
  } catch (error) {
    console.error('Error fetching travels:', error)
    return NextResponse.json({ success: false, message: 'Error fetching travels' }, { status: 500 })
  }
}

// POST create travel
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    if (!body.name || !body.destination || !body.startDate || !body.maxParticipants) {
      return NextResponse.json({ success: false, message: 'Required fields missing' }, { status: 400 })
    }
    const startDate = new Date(body.startDate)
    const endDate = new Date(body.endDate)
    if (startDate < new Date()) return NextResponse.json({ success: false, message: 'Start date cannot be in the past' }, { status: 400 })
    if (endDate < startDate) return NextResponse.json({ success: false, message: 'End date cannot be before start date' }, { status: 400 })
    const duration = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
    const newTravel: Travel = {
      id: (mockTravels.length + 1).toString(),
      name: body.name,
      description: body.description || '',
      destination: body.destination,
      country: body.country || '',
      startDate: body.startDate,
      endDate: body.endDate,
      duration: body.duration || duration,
      maxParticipants: body.maxParticipants,
      currentParticipants: 0,
      price: body.price || 0,
      status: 'available',
      highlights: body.highlights || [],
      accommodation: body.accommodation,
      golfCourses: body.golfCourses || [],
      itinerary: body.itinerary || [],
      inclusions: body.inclusions || [],
      exclusions: body.exclusions || [],
      images: body.images || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    mockTravels.push(newTravel)
    return NextResponse.json({ success: true, data: newTravel, message: 'Travel created successfully' }, { status: 201 })
  } catch (error) {
    console.error('Error creating travel:', error)
    return NextResponse.json({ success: false, message: 'Error creating travel' }, { status: 500 })
  }
}


