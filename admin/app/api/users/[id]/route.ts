import { NextRequest, NextResponse } from 'next/server'
import { mockUsers } from '@/lib/data'
import type { User } from '@/lib/types'

// GET user by id
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
  try {
    const user = mockUsers.find(u => u.id === id)
    if (!user) return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 })
    return NextResponse.json({ success: true, data: user })
  } catch (error) {
    const { id } = await params
    console.error('Error fetching user:', error)
    return NextResponse.json({ success: false, message: 'Error fetching user' }, { status: 500 })
  }
}

// PUT update user
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
  try {
    const body: Partial<User> = await request.json()
    const idx = mockUsers.findIndex(u => u.id === id)
    if (idx === -1) return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 })
    const updated = { ...mockUsers[idx], ...body, id: id, updatedAt: new Date().toISOString() }
    mockUsers[idx] = updated as any
    return NextResponse.json({ success: true, data: updated, message: 'User updated successfully' })
  } catch (error) {
    const { id } = await params
    console.error('Error updating user:', error)
    return NextResponse.json({ success: false, message: 'Error updating user' }, { status: 500 })
  }
}

// DELETE user
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
  try {
    const idx = mockUsers.findIndex(u => u.id === id)
    if (idx === -1) return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 })
    const deleted = mockUsers.splice(idx, 1)[0]
    return NextResponse.json({ success: true, data: deleted, message: 'User deleted successfully' })
  } catch (error) {
    const { id } = await params
    console.error('Error deleting user:', error)
    return NextResponse.json({ success: false, message: 'Error deleting user' }, { status: 500 })
  }
}


