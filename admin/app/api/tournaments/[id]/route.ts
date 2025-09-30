import { NextRequest, NextResponse } from 'next/server'
import { mockTournaments } from '@/lib/data'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params
  try {
    const tournament = mockTournaments.find(t => t.id === id)
    if (!tournament) return NextResponse.json({ error: 'Tournament not found' }, { status: 404 })
    return NextResponse.json(tournament)
  } catch {
    return NextResponse.json({ error: 'Error fetching tournament' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params
  try {
    const tournamentData = await request.json()
    const tournamentIndex = mockTournaments.findIndex(t => t.id === id)
    if (tournamentIndex === -1) return NextResponse.json({ error: 'Tournament not found' }, { status: 404 })
    mockTournaments[tournamentIndex] = { ...mockTournaments[tournamentIndex], ...tournamentData, updatedAt: new Date().toISOString() }
    return NextResponse.json(mockTournaments[tournamentIndex])
  } catch {
    return NextResponse.json({ error: 'Error updating tournament' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params
  try {
    const tournamentIndex = mockTournaments.findIndex(t => t.id === id)
    if (tournamentIndex === -1) return NextResponse.json({ error: 'Tournament not found' }, { status: 404 })
    mockTournaments.splice(tournamentIndex, 1)
    return NextResponse.json({ message: 'Tournament deleted successfully' })
  } catch {
    return NextResponse.json({ error: 'Error deleting tournament' }, { status: 500 })
  }
}


