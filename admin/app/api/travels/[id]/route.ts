import { NextRequest, NextResponse } from 'next/server'
import { mockTravels } from '@/lib/data'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params
  try {
    const travel = mockTravels.find(t => t.id === id)
    if (!travel) return NextResponse.json({ error: 'Travel not found' }, { status: 404 })
    return NextResponse.json(travel)
  } catch {
    return NextResponse.json({ error: 'Error fetching travel' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params
  try {
    const travelData = await request.json()
    const travelIndex = mockTravels.findIndex(t => t.id === id)
    if (travelIndex === -1) return NextResponse.json({ error: 'Travel not found' }, { status: 404 })
    mockTravels[travelIndex] = { ...mockTravels[travelIndex], ...travelData, updatedAt: new Date().toISOString() }
    return NextResponse.json(mockTravels[travelIndex])
  } catch {
    return NextResponse.json({ error: 'Error updating travel' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params
  try {
    const travelIndex = mockTravels.findIndex(t => t.id === id)
    if (travelIndex === -1) return NextResponse.json({ error: 'Travel not found' }, { status: 404 })
    mockTravels.splice(travelIndex, 1)
    return NextResponse.json({ message: 'Travel deleted successfully' })
  } catch {
    return NextResponse.json({ error: 'Error deleting travel' }, { status: 500 })
  }
}


