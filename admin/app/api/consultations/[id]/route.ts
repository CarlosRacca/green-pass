import { NextRequest, NextResponse } from 'next/server'
import { mockConsultations } from '@/lib/data'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const consultation = mockConsultations.find(c => c.id === id)
    if (!consultation) return NextResponse.json({ error: 'Consultation not found' }, { status: 404 })
    return NextResponse.json(consultation)
  } catch {
    return NextResponse.json({ error: 'Error fetching consultation' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const consultationData = await request.json()
    const consultationIndex = mockConsultations.findIndex(c => c.id === id)
    if (consultationIndex === -1) return NextResponse.json({ error: 'Consultation not found' }, { status: 404 })
    mockConsultations[consultationIndex] = { ...mockConsultations[consultationIndex], ...consultationData, updatedAt: new Date().toISOString() }
    return NextResponse.json(mockConsultations[consultationIndex])
  } catch {
    return NextResponse.json({ error: 'Error updating consultation' }, { status: 500 })
  }
}


