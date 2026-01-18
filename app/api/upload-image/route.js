// app/api/upload-image/route.js
import { NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth-helpers'
import { uploadImage } from '@/lib/cloudinary'

export async function POST(request) {
  try {
    // Verify authentication
    await requireAuth()

    const formData = await request.formData()
    const file = formData.get('file')
    const folder = formData.get('folder') || 'portfolio'

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.' },
        { status: 400 }
      )
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File size exceeds 5MB limit' },
        { status: 400 }
      )
    }

    // Upload to Cloudinary
    const result = await uploadImage(file, folder)

    return NextResponse.json({
      success: true,
      url: result.url,
      publicId: result.publicId
    })
  } catch (error) {
    console.error('Image upload error:', error)
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    )
  }
}
