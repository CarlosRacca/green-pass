import { NextRequest, NextResponse } from 'next/server'
import { mockUsers } from '@/lib/data'
import type { User } from '@/lib/types'

// GET with filters, search and pagination
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const role = searchParams.get('role')
    const search = searchParams.get('search')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    let filtered = [...mockUsers]
    if (role && role !== 'all') filtered = filtered.filter(u => u.role === role)
    if (search) {
      const q = search.toLowerCase()
      filtered = filtered.filter(u => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q))
    }
    const start = (page - 1) * limit
    const end = start + limit
    const data = filtered.slice(start, end)
    return NextResponse.json({ success: true, data, pagination: { page, limit, total: filtered.length, totalPages: Math.ceil(filtered.length / limit) } })
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json({ success: false, message: 'Error fetching users' }, { status: 500 })
  }
}

// POST create user
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    if (!body.name || !body.email) {
      return NextResponse.json({ success: false, message: 'Name and email are required' }, { status: 400 })
    }
    const exists = mockUsers.find(u => u.email === body.email)
    if (exists) return NextResponse.json({ success: false, message: 'Email already exists' }, { status: 409 })
    const newUser: User = {
      id: (mockUsers.length + 1).toString(),
      name: body.name,
      email: body.email,
      phone: body.phone,
      role: body.role || 'client',
      handicap: body.handicap,
      memberSince: new Date().toISOString().split('T')[0],
      preferences: { notifications: true, newsletter: true, language: 'es', timezone: 'America/Argentina/Buenos_Aires' },
    }
    mockUsers.push(newUser)
    return NextResponse.json({ success: true, data: newUser, message: 'User created successfully' }, { status: 201 })
  } catch (error) {
    console.error('Error creating user:', error)
    return NextResponse.json({ success: false, message: 'Error creating user' }, { status: 500 })
  }
}


