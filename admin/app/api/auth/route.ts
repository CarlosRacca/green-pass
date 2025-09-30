import { NextRequest, NextResponse } from 'next/server'
import { mockUsers } from '@/lib/data'
import type { User } from '@/lib/types'

// GET /api/auth/me - Get current user
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ success: false, message: 'No token provided' }, { status: 401 })
    }
    const token = authHeader.substring(7)
    const userId = token.replace('mock-jwt-token-', '')
    const user = mockUsers.find(u => u.id === userId)
    if (!user) return NextResponse.json({ success: false, message: 'Invalid token' }, { status: 401 })
    return NextResponse.json({ success: true, data: user })
  } catch (error) {
    console.error('Error fetching user:', error)
    return NextResponse.json({ success: false, message: 'Error fetching user' }, { status: 500 })
  }
}

// PUT /api/auth/profile - Update current user profile
export async function PUT(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ success: false, message: 'No token provided' }, { status: 401 })
    }
    const token = authHeader.substring(7)
    const userId = token.replace('mock-jwt-token-', '')
    const idx = mockUsers.findIndex(u => u.id === userId)
    if (idx === -1) return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 })
    const body: Partial<User> = await request.json()
    const updatedUser = { ...mockUsers[idx], ...body, id: userId, updatedAt: new Date().toISOString() }
    mockUsers[idx] = updatedUser
    return NextResponse.json({ success: true, data: updatedUser, message: 'Profile updated successfully' })
  } catch (error) {
    console.error('Error updating profile:', error)
    return NextResponse.json({ success: false, message: 'Error updating profile' }, { status: 500 })
  }
}

// PATCH /api/auth/register - Register new user
export async function PATCH(request: NextRequest) {
  try {
    const { name, email, password, phone, role = 'client' } = await request.json()
    if (!name || !email || !password) {
      return NextResponse.json({ success: false, message: 'Name, email, and password are required' }, { status: 400 })
    }
    const existing = mockUsers.find(u => u.email === email)
    if (existing) return NextResponse.json({ success: false, message: 'Email already exists' }, { status: 409 })
    const newUser: User = {
      id: (mockUsers.length + 1).toString(),
      name,
      email,
      phone,
      role: role as 'admin' | 'client',
      memberSince: new Date().toISOString().split('T')[0],
      preferences: { notifications: true, newsletter: true, language: 'es', timezone: 'America/Argentina/Buenos_Aires', publicProfile: false },
    }
    mockUsers.push(newUser)
    const token = `mock-jwt-token-${newUser.id}`
    return NextResponse.json({ success: true, data: { user: newUser, token }, message: 'Registration successful' }, { status: 201 })
  } catch (error) {
    console.error('Error during registration:', error)
    return NextResponse.json({ success: false, message: 'Error during registration' }, { status: 500 })
  }
}


