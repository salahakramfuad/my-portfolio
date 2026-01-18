'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { auth } from '@/lib/firebase'
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser)
      setLoading(false)
      
      // Redirect if logged in and verified
      if (firebaseUser && firebaseUser.emailVerified) {
        router.push('/dashboard')
        return
      }
      
      // If logged in but not verified, sign out to show form
      if (firebaseUser && !firebaseUser.emailVerified) {
        signOut(auth).catch(console.error)
        setUser(null)
      }
    })
    return () => unsubscribe()
  }, [router])

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password)
      if (!cred.user.emailVerified) {
        setError('Please verify your email before logging in. Check your inbox.')
        await signOut(auth) // Force logout if not verified
      } else {
        // Create session and redirect to dashboard
        try {
          const token = await cred.user.getIdToken()
          await fetch('/api/auth/session', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idToken: token })
          })
          router.push('/dashboard')
        } catch (sessionError) {
          console.error('Session creation error:', sessionError)
          // Still redirect even if session creation fails
          router.push('/dashboard')
        }
      }
    } catch (err) {
      console.error(err)
      setError(err.message || 'Failed to login.')
    }
  }

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-slate-950'>
        <div className='inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-400 border-r-transparent'></div>
      </div>
    )
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-slate-950 px-4'>
      <div className='w-full max-w-md rounded-2xl border border-blue-500/20 bg-slate-900/80 p-8 shadow-xl backdrop-blur-xl'>
        <div className='mb-6 text-center'>
          <div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-2xl font-bold'>
            F
          </div>
          <h1 className='text-2xl font-bold text-white'>salahakramfuad&apos;s Dashboard</h1>
          <p className='mt-2 text-sm text-slate-400'>
            Log in to salahakramfuad&apos;s dashboard
          </p>
        </div>

        {error && (
          <div className='mb-4 rounded-xl border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-300'>
            {error}
          </div>
        )}

        <form
          className='space-y-4'
          onSubmit={handleLogin}
        >
            <div>
              <label className='mb-2 block text-sm font-medium text-slate-300'>
                Email
              </label>
              <input
                type='email'
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='w-full rounded-lg border border-blue-500/20 bg-slate-800/50 px-4 py-2.5 text-sm text-white outline-none transition-colors focus:border-blue-500/50 focus:bg-slate-800'
                placeholder='you@example.com'
              />
            </div>

            <div>
              <label className='mb-2 block text-sm font-medium text-slate-300'>
                Password
              </label>
              <input
                type='password'
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='w-full rounded-lg border border-blue-500/20 bg-slate-800/50 px-4 py-2.5 text-sm text-white outline-none transition-colors focus:border-blue-500/50 focus:bg-slate-800'
                placeholder='••••••••'
                minLength={6}
              />
            </div>

            <button
              type='submit'
              className='w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700'
            >
              Sign In
            </button>
          </form>

        <div className='mt-4 text-center'>
          <Link
            href='/'
            className='text-sm text-slate-500 hover:text-slate-400 transition-colors'
          >
            ← Back to Portfolio
          </Link>
        </div>
      </div>
    </div>
  )
}
