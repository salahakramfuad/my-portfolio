// app/api/skills/route.js
import { NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth-helpers'
import { adminDb } from '@/lib/firebase-admin'

/**
 * GET /api/skills - Get all skills
 */
export async function GET() {
  try {
    const snapshot = await adminDb.collection('portfolio').doc('skills').get()
    
    if (!snapshot.exists) {
      return NextResponse.json({ skills: [] })
    }

    const data = snapshot.data()
    return NextResponse.json({ skills: data.items || [] })
  } catch (error) {
    console.error('Get skills error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch skills' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/skills - Create or update skills
 */
export async function POST(request) {
  try {
    await requireAuth()

    const { skills } = await request.json()

    if (!Array.isArray(skills)) {
      return NextResponse.json(
        { error: 'Skills must be an array' },
        { status: 400 }
      )
    }

    await adminDb.collection('portfolio').doc('skills').set({
      items: skills,
      updatedAt: new Date().toISOString()
    })

    return NextResponse.json({ success: true, skills })
  } catch (error) {
    console.error('Save skills error:', error)
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    return NextResponse.json(
      { error: 'Failed to save skills' },
      { status: 500 }
    )
  }
}
