// app/api/skills/route.js
import { NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth-helpers'
import { adminDb } from '@/lib/firebase-admin'

/**
 * GET /api/skills - Get all skills
 */
export async function GET() {
  try {
    let snapshot
    try {
      // Try to order by 'order' field if it exists
      snapshot = await adminDb.collection('skills')
        .orderBy('order', 'asc')
        .get()
    } catch (orderError) {
      // If order field doesn't exist or isn't indexed, get all and sort manually
      snapshot = await adminDb.collection('skills').get()
    }
    
    const skills = snapshot.docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))
      .sort((a, b) => {
        // Sort by order field if it exists, otherwise maintain insertion order
        const orderA = a.order !== undefined ? a.order : Infinity
        const orderB = b.order !== undefined ? b.order : Infinity
        return orderA - orderB
      })

    return NextResponse.json({ skills })
  } catch (error) {
    console.error('Get skills error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch skills' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/skills - Create or update skills (bulk save)
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

    const batch = adminDb.batch()
    const skillsRef = adminDb.collection('skills')

    // Delete all existing skills
    const existingSnapshot = await skillsRef.get()
    existingSnapshot.docs.forEach((doc) => {
      batch.delete(doc.ref)
    })

    // Add all new skills
    skills.forEach((skill, index) => {
      const newDocRef = skillsRef.doc()
      // Handle both string and object formats
      const skillData = typeof skill === 'string' 
        ? { name: skill, order: index }
        : { ...skill, order: index }
      
      batch.set(newDocRef, {
        ...skillData,
        updatedAt: new Date().toISOString()
      })
    })

    await batch.commit()

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
