// lib/cloudinary.js
import { v2 as cloudinary } from 'cloudinary'

// Parse CLOUDINARY_URL or use individual env vars
const cloudinaryUrl = process.env.CLOUDINARY_URL

if (cloudinaryUrl) {
  // Parse cloudinary://api_key:api_secret@cloud_name
  const urlMatch = cloudinaryUrl.match(/cloudinary:\/\/([^:]+):([^@]+)@(.+)/)
  if (urlMatch) {
    const [, apiKey, apiSecret, cloudName] = urlMatch
    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
      secure: true
    })
  }
} else if (
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET
) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
  })
} else {
  console.warn('⚠️ Cloudinary config missing. Check .env.local values.')
}

/**
 * Upload image to Cloudinary with AVIF optimization
 * @param {File|Buffer} file - Image file to upload
 * @param {string} folder - Folder path in Cloudinary (e.g., 'portfolio/images')
 * @returns {Promise<{url: string, publicId: string}>}
 */
export async function uploadImage(file, folder = 'portfolio') {
  try {
    // Convert file to buffer if it's a File object
    let buffer
    if (file instanceof File) {
      const arrayBuffer = await file.arrayBuffer()
      buffer = Buffer.from(arrayBuffer)
    } else {
      buffer = file
    }

    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder,
            format: 'avif',
            quality: 'auto',
            fetch_format: 'auto',
            resource_type: 'image'
          },
          (error, result) => {
            if (error) reject(error)
            else
              resolve({
                url: result.secure_url,
                publicId: result.public_id
              })
          }
        )
        .end(buffer)
    })
  } catch (error) {
    console.error('Cloudinary upload error:', error)
    throw error
  }
}

/**
 * Upload PDF to Cloudinary
 * @param {File|Buffer} file - PDF file to upload
 * @param {string} folder - Folder path (e.g., 'portfolio/resume')
 * @returns {Promise<{url: string, publicId: string}>}
 */
export async function uploadPDF(file, folder = 'portfolio/resume') {
  try {
    let buffer
    if (file instanceof File) {
      const arrayBuffer = await file.arrayBuffer()
      buffer = Buffer.from(arrayBuffer)
    } else {
      buffer = file
    }

    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder,
            resource_type: 'raw',
            format: 'pdf'
          },
          (error, result) => {
            if (error) reject(error)
            else
              resolve({
                url: result.secure_url,
                publicId: result.public_id
              })
          }
        )
        .end(buffer)
    })
  } catch (error) {
    console.error('Cloudinary PDF upload error:', error)
    throw error
  }
}

/**
 * Delete asset from Cloudinary
 * @param {string} publicId - Public ID of the asset
 * @returns {Promise<void>}
 */
export async function deleteAsset(publicId) {
  try {
    await cloudinary.uploader.destroy(publicId)
  } catch (error) {
    console.error('Cloudinary delete error:', error)
    throw error
  }
}

export default cloudinary
