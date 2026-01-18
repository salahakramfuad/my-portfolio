// app/api/resume/download/route.js
import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-admin'

/**
 * POST /api/resume/download - Track resume download
 */
export async function POST(request) {
  try {
    const { userAgent, ip } = await request.json()

    // Track download in Firestore
    await adminDb.collection('resumeDownloads').add({
      timestamp: new Date(),
      userAgent: userAgent || 'Unknown',
      ip: ip || 'Unknown'
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Download tracking error:', error)
    // Don't fail the request if tracking fails
    return NextResponse.json({ success: true })
  }
}
