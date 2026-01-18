// lib/auth-helpers.js
import { cookies } from 'next/headers'
import { adminAuth } from './firebase-admin'

/**
 * Get the current authenticated user from the session token
 * @returns {Promise<{uid: string, email: string} | null>}
 */
export async function getCurrentUser() {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get('session')?.value

    if (!sessionCookie) {
      return null
    }

    const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true)
    return {
      uid: decodedClaims.uid,
      email: decodedClaims.email
    }
  } catch (error) {
    console.error('Auth error:', error)
    return null
  }
}

/**
 * Verify user is authenticated (throw error if not)
 * @returns {Promise<{uid: string, email: string}>}
 */
export async function requireAuth() {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error('Unauthorized')
  }
  return user
}
