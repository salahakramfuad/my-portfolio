// app/api/projects/route.js
import { NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth-helpers'
import { adminDb } from '@/lib/firebase-admin'

/**
 * GET /api/projects - Get all projects
 */
export async function GET() {
  try {
    const snapshot = await adminDb.collection('portfolio').doc('projects').get()
    
    if (!snapshot.exists) {
      return NextResponse.json({ projects: [] })
    }

    const data = snapshot.data()
    return NextResponse.json({ projects: data.items || [] })
  } catch (error) {
    console.error('Get projects error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/projects - Create or update projects
 */
export async function POST(request) {
  try {
    await requireAuth()

    const { projects } = await request.json()

    if (!Array.isArray(projects)) {
      return NextResponse.json(
        { error: 'Projects must be an array' },
        { status: 400 }
      )
    }

    await adminDb.collection('portfolio').doc('projects').set({
      items: projects,
      updatedAt: new Date().toISOString()
    })

    return NextResponse.json({ success: true, projects })
  } catch (error) {
    console.error('Save projects error:', error)
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    return NextResponse.json(
      { error: 'Failed to save projects' },
      { status: 500 }
    )
  }
}
