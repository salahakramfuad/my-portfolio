// app/api/projects/route.js
import { NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth-helpers'
import { adminDb } from '@/lib/firebase-admin'

/**
 * GET /api/projects - Get all projects
 */
export async function GET() {
  try {
    let snapshot
    try {
      // Try to order by 'order' field if it exists
      snapshot = await adminDb.collection('projects')
        .orderBy('order', 'asc')
        .get()
    } catch (orderError) {
      // If order field doesn't exist or isn't indexed, get all and sort manually
      snapshot = await adminDb.collection('projects').get()
    }
    
    const projects = snapshot.docs
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

    return NextResponse.json({ projects })
  } catch (error) {
    console.error('Get projects error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/projects - Create a new project
 */
export async function POST(request) {
  try {
    await requireAuth()

    const projectData = await request.json()
    
    // Get current max order to append to end
    const snapshot = await adminDb.collection('projects').get()
    const maxOrder = snapshot.docs.reduce((max, doc) => {
      const order = doc.data().order || 0
      return Math.max(max, order)
    }, -1)

    const newProjectRef = adminDb.collection('projects').doc()
    await newProjectRef.set({
      ...projectData,
      order: maxOrder + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    })

    const createdProject = await newProjectRef.get()
    return NextResponse.json({ 
      success: true, 
      project: { id: newProjectRef.id, ...createdProject.data() }
    })
  } catch (error) {
    console.error('Create project error:', error)
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    )
  }
}

/**
 * PUT /api/projects - Update a project
 */
export async function PUT(request) {
  try {
    await requireAuth()

    const { id, ...projectData } = await request.json()

    if (!id) {
      return NextResponse.json(
        { error: 'Project ID is required' },
        { status: 400 }
      )
    }

    await adminDb.collection('projects').doc(id).update({
      ...projectData,
      updatedAt: new Date().toISOString()
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Update project error:', error)
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/projects - Delete a project
 */
export async function DELETE(request) {
  try {
    await requireAuth()

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Project ID is required' },
        { status: 400 }
      )
    }

    await adminDb.collection('projects').doc(id).delete()

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete project error:', error)
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    )
  }
}
