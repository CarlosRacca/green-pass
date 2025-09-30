import { NextRequest, NextResponse } from 'next/server'
import { mockTournaments } from '@/lib/data'
import type { Tournament } from '@/lib/types'

// GET with filters, search, pagination
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const format = searchParams.get('format')
    const search = searchParams.get('search')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    let filtered = [...mockTournaments]
    if (status && status !== 'all') filtered = filtered.filter(t => t.status === status)
    if (format && format !== 'all') filtered = filtered.filter(t => t.format === format)
    if (search) {
      const q = search.toLowerCase()
      filtered = filtered.filter(t => t.name.toLowerCase().includes(q) || t.location.toLowerCase().includes(q) || t.course.toLowerCase().includes(q))
    }
    filtered.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
    const start = (page - 1) * limit
    const end = start + limit
    const data = filtered.slice(start, end)
    return NextResponse.json({ success: true, data, pagination: { page, limit, total: filtered.length, totalPages: Math.ceil(filtered.length / limit) } })
  } catch (error) {
    console.error('Error fetching tournaments:', error)
    return NextResponse.json({ success: false, message: 'Error fetching tournaments' }, { status: 500 })
  }
}

// POST create tournament
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    if (!body.name || !body.startDate || !body.location || !body.maxParticipants) {
      return NextResponse.json({ success: false, message: 'Required fields missing' }, { status: 400 })
    }
    const startDate = new Date(body.startDate)
    const endDate = body.endDate ? new Date(body.endDate) : startDate
    if (startDate < new Date()) return NextResponse.json({ success: false, message: 'Start date cannot be in the past' }, { status: 400 })
    if (endDate < startDate) return NextResponse.json({ success: false, message: 'End date cannot be before start date' }, { status: 400 })

    const newTournament: Tournament = {
      id: (mockTournaments.length + 1).toString(),
      name: body.name,
      description: body.description || '',
      startDate: body.startDate,
      endDate: body.endDate || body.startDate,
      location: body.location,
      course: body.course || '',
      maxParticipants: body.maxParticipants,
      currentParticipants: 0,
      price: body.price || 0,
      format: body.format || 'stroke_play',
      status: 'open',
      requirements: body.requirements || [],
      prizes: body.prizes || [],
      images: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    mockTournaments.push(newTournament)
    return NextResponse.json({ success: true, data: newTournament, message: 'Tournament created successfully' }, { status: 201 })
  } catch (error) {
    console.error('Error creating tournament:', error)
    return NextResponse.json({ success: false, message: 'Error creating tournament' }, { status: 500 })
  }
}


