import { NextRequest, NextResponse } from 'next/server'
import { mockUsers } from '@/lib/data'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()
    if (!email || !password) {
      return NextResponse.json({ success: false, message: 'Email and password are required' }, { status: 400 })
    }
    const user = mockUsers.find(u => u.email === email)
    if (!user) return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 })
    if (password !== 'demo123') return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 })

    const { ...userWithoutPassword } = user
    const token = `mock-jwt-token-${user.id}`
    return NextResponse.json({ success: true, data: { user: userWithoutPassword, token }, message: 'Login successful' })
  } catch (error) {
    console.error('Error during login:', error)
    return NextResponse.json({ success: false, message: 'Error during login' }, { status: 500 })
  }
}


