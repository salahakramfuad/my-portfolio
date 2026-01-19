// app/api/experience/route.js
import { NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth-helpers'
import { adminDb } from '@/lib/firebase-admin'

/**
 * GET /api/experience - Get all experience entries
 */
export async function GET() {
  try {
    let snapshot
    try {
      // Try to order by 'order' field if it exists
      snapshot = await adminDb.collection('experience')
        .orderBy('order', 'asc')
        .get()
    } catch (orderError) {
      // If order field doesn't exist or isn't indexed, get all and sort manually
      snapshot = await adminDb.collection('experience').get()
    }
    
    const experience = snapshot.docs
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

    return NextResponse.json({ experience })
  } catch (error) {
    console.error('Get experience error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch experience' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/experience - Create a new experience entry
 */
export async function POST(request) {
  try {
    await requireAuth()

    const entryData = await request.json()
    
    // Get current max order to append to end
    const snapshot = await adminDb.collection('experience').get()
    const maxOrder = snapshot.docs.reduce((max, doc) => {
      const order = doc.data().order || 0
      return Math.max(max, order)
    }, -1)

    const newEntryRef = adminDb.collection('experience').doc()
    await newEntryRef.set({
      ...entryData,
      order: maxOrder + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    })

    const createdEntry = await newEntryRef.get()
    return NextResponse.json({ 
      success: true, 
      entry: { id: newEntryRef.id, ...createdEntry.data() }
    })
  } catch (error) {
    console.error('Create experience error:', error)
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    return NextResponse.json(
      { error: 'Failed to create experience' },
      { status: 500 }
    )
  }
}

/**
 * PUT /api/experience - Update an experience entry
 */
export async function PUT(request) {
  try {
    await requireAuth()

    const { id, ...entryData } = await request.json()

    if (!id) {
      return NextResponse.json(
        { error: 'Experience entry ID is required' },
        { status: 400 }
      )
    }

    await adminDb.collection('experience').doc(id).update({
      ...entryData,
      updatedAt: new Date().toISOString()
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Update experience error:', error)
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    return NextResponse.json(
      { error: 'Failed to update experience' },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/experience - Delete an experience entry
 */
export async function DELETE(request) {
  try {
    await requireAuth()

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Experience entry ID is required' },
        { status: 400 }
      )
    }

    await adminDb.collection('experience').doc(id).delete()

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete experience error:', error)
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    return NextResponse.json(
      { error: 'Failed to delete experience' },
      { status: 500 }
    )
  }
}
