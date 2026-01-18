// app/api/resume/route.js
import { NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth-helpers'
import { adminDb } from '@/lib/firebase-admin'
import { uploadPDF } from '@/lib/cloudinary'

/**
 * GET /api/resume - Get resume info and download stats
 */
export async function GET() {
  try {
    const [resumeDoc, downloadsSnapshot] = await Promise.all([
      adminDb.collection('portfolio').doc('resume').get(),
      adminDb.collection('resumeDownloads')
        .orderBy('timestamp', 'desc')
        .limit(100)
        .get()
    ])

    const resumeData = resumeDoc.exists ? resumeDoc.data() : { url: null }
    const downloads = downloadsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      timestamp: doc.data().timestamp?.toDate?.() || doc.data().timestamp
    }))

    return NextResponse.json({
      url: resumeData.url,
      filename: resumeData.filename || 'resume.pdf',
      downloadCount: downloads.length,
      downloads
    })
  } catch (error) {
    console.error('Get resume error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch resume data' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/resume - Upload new resume
 */
export async function POST(request) {
  try {
    await requireAuth()

    const formData = await request.formData()
    const file = formData.get('file')

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Validate file type
    if (file.type !== 'application/pdf') {
      return NextResponse.json(
        { error: 'Invalid file type. Only PDF files are allowed.' },
        { status: 400 }
      )
    }

    // Validate file size (10MB max)
    const maxSize = 10 * 1024 * 1024 // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File size exceeds 10MB limit' },
        { status: 400 }
      )
    }

    // Upload to Cloudinary
    const result = await uploadPDF(file, 'portfolio/resume')

    // Save resume info to Firestore
    await adminDb.collection('portfolio').doc('resume').set({
      url: result.url,
      publicId: result.publicId,
      filename: file.name || 'resume.pdf',
      uploadedAt: new Date().toISOString(),
      size: file.size
    })

    return NextResponse.json({
      success: true,
      url: result.url,
      filename: file.name || 'resume.pdf'
    })
  } catch (error) {
    console.error('Resume upload error:', error)
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    return NextResponse.json(
      { error: 'Failed to upload resume' },
      { status: 500 }
    )
  }
}
