import { NextRequest, NextResponse } from 'next/server'
import { mockConsultations, mockUsers } from '@/lib/data'
import type { Consultation } from '@/lib/types'

export async function GET() {
  try {
    return NextResponse.json(mockConsultations)
  } catch {
    return NextResponse.json({ error: 'Error fetching consultations' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const consultationData = await request.json()
    if (!consultationData.userId || !consultationData.subject || !consultationData.message) {
      return NextResponse.json({ error: 'User ID, subject, and message are required' }, { status: 400 })
    }
    const user = mockUsers.find(u => u.id === consultationData.userId)
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })
    const newConsultation: Consultation = {
      id: Date.now().toString(),
      userId: consultationData.userId,
      user,
      subject: consultationData.subject,
      message: consultationData.message,
      type: consultationData.type || 'general',
      status: 'new',
      priority: consultationData.priority || 'medium',
      responses: [],
      attachments: consultationData.attachments || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    mockConsultations.push(newConsultation)
    return NextResponse.json(newConsultation, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Error creating consultation' }, { status: 500 })
  }
}


