// lib/firebase-admin.js
import { initializeApp, getApps, cert } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { getAuth } from 'firebase-admin/auth'
import { getStorage } from 'firebase-admin/storage'

if (!getApps().length) {
  try {
    // Option 1: Environment variables (preferred)
    if (
      process.env.FIREBASE_ADMIN_PROJECT_ID &&
      process.env.FIREBASE_ADMIN_CLIENT_EMAIL &&
      process.env.FIREBASE_ADMIN_PRIVATE_KEY
    ) {
      initializeApp({
        credential: cert({
          projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
          clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/g, '\n')
        })
      })
    } else if (process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
      // Option 2: Minimal initialization with project ID only
      // This works for some operations but not all (like auth)
      initializeApp({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
      })
    } else {
      // Option 3: Try to load service account JSON (only at runtime, not build time)
      // This is handled dynamically to avoid build-time errors
      console.warn('Firebase Admin: No credentials found. Some features may not work.')
    }
  } catch (error) {
    console.error('Firebase Admin initialization error:', error)
    // Fallback: try minimal initialization
    if (process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
      try {
        initializeApp({
          projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
        })
      } catch (fallbackError) {
        console.error('Firebase Admin fallback initialization failed:', fallbackError)
      }
    }
  }
}

// Helper to initialize with service account JSON at runtime (if needed)
export async function initWithServiceAccount() {
  if (getApps().length > 0) {
    return // Already initialized
  }
  
  try {
    // Dynamic import to avoid build-time errors
    const fs = await import('fs')
    const path = await import('path')
    const serviceAccountPath = path.join(process.cwd(), 'lib', 'firebase-service-account.json')
    
    if (fs.existsSync(serviceAccountPath)) {
      const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'))
      initializeApp({
        credential: cert(serviceAccount)
      })
      return true
    }
  } catch (error) {
    console.warn('Could not load service account JSON:', error)
  }
  
  return false
}

// Export Firebase Admin services with error handling
let adminDb, adminAuth, adminStorage

try {
  adminDb = getFirestore()
  adminAuth = getAuth()
  adminStorage = getStorage()
} catch (error) {
  console.warn('Firebase Admin services not available:', error.message)
  // These will be null if initialization failed
  adminDb = null
  adminAuth = null
  adminStorage = null
}

export { adminDb, adminAuth, adminStorage }