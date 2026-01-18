// app/api/experience/route.js
import { NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth-helpers'
import { adminDb } from '@/lib/firebase-admin'

/**
 * GET /api/experience - Get all experience entries
 */
export async function GET() {
  try {
    const snapshot = await adminDb.collection('portfolio').doc('experience').get()
    
    if (!snapshot.exists) {
      return NextResponse.json({ experience: [] })
    }

    const data = snapshot.data()
    return NextResponse.json({ experience: data.items || [] })
  } catch (error) {
    console.error('Get experience error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch experience' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/experience - Create or update experience
 */
export async function POST(request) {
  try {
    await requireAuth()

    const { experience } = await request.json()

    if (!Array.isArray(experience)) {
      return NextResponse.json(
        { error: 'Experience must be an array' },
        { status: 400 }
      )
    }

    await adminDb.collection('portfolio').doc('experience').set({
      items: experience,
      updatedAt: new Date().toISOString()
    })

    return NextResponse.json({ success: true, experience })
  } catch (error) {
    console.error('Save experience error:', error)
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    return NextResponse.json(
      { error: 'Failed to save experience' },
      { status: 500 }
    )
  }
}
