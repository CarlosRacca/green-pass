import { NextResponse } from 'next/server'
import { mockAnalytics } from '@/lib/data'

export async function GET() {
  try {
    return NextResponse.json(mockAnalytics)
  } catch {
    return NextResponse.json({ error: 'Error fetching analytics' }, { status: 500 })
  }
}


