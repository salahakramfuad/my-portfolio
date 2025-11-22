'use client'

import { useEffect, useState } from 'react'
import { auth } from '../../lib/firebase' // 🔁 adjust if your path is different
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signOut
} from 'firebase/auth'

export default function LoginPage() {
  const [mode, setMode] = useState('login') // 'login' | 'register'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser)
      setLoading(false)
    })
    return () => unsub()
  }, [])

  const resetFeedback = () => {
    setMessage('')
    setError('')
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    resetFeedback()
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password)
      await sendEmailVerification(cred.user)
      setMessage(
        'Account created! A verification email has been sent. Please check your inbox.'
      )
    } catch (err) {
      console.error(err)
      setError(err.message || 'Failed to register.')
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    resetFeedback()
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password)
      if (!cred.user.emailVerified) {
        setMessage(
          'Your email is not verified yet. Please check your inbox and verify.'
        )
        // Optional: force sign out if not verified
        await signOut(auth)
      } else {
        setMessage('Login successful! 🎉')
      }
    } catch (err) {
      console.error(err)
      setError(err.message || 'Failed to login.')
    }
  }

  const handleLogout = async () => {
    resetFeedback()
    await signOut(auth)
  }

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-slate-950 text-slate-50'>
        Loading...
      </div>
    )
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-slate-950 text-slate-50'>
      <div className='w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl'>
        <h1 className='mb-2 text-2xl font-semibold text-center'>
          HOPE TTC Portal
        </h1>
        <p className='mb-6 text-sm text-slate-300 text-center'>
          {mode === 'login'
            ? 'Sign in with your email and password.'
            : 'Create an account and verify your email.'}
        </p>

        {user && user.emailVerified && (
          <div className='mb-4 rounded-xl bg-emerald-500/10 border border-emerald-500/40 p-3 text-sm'>
            Logged in as <span className='font-medium'>{user.email}</span>
          </div>
        )}

        {message && (
          <div className='mb-3 rounded-xl bg-emerald-500/10 border border-emerald-500/40 p-3 text-xs'>
            {message}
          </div>
        )}

        {error && (
          <div className='mb-3 rounded-xl bg-red-500/10 border border-red-500/40 p-3 text-xs'>
            {error}
          </div>
        )}

        {!user && (
          <form
            className='space-y-4'
            onSubmit={mode === 'login' ? handleLogin : handleRegister}
          >
            <div>
              <label className='block text-xs mb-1 text-slate-300'>Email</label>
              <input
                type='email'
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm outline-none focus:border-emerald-500'
                placeholder='you@example.com'
              />
            </div>

            <div>
              <label className='block text-xs mb-1 text-slate-300'>
                Password
              </label>
              <input
                type='password'
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm outline-none focus:border-emerald-500'
                placeholder='••••••••'
              />
            </div>

            <button
              type='submit'
              className='w-full rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-400 transition'
            >
              {mode === 'login' ? 'Login' : 'Register & Send Verification'}
            </button>
          </form>
        )}

        {user && (
          <button
            onClick={handleLogout}
            className='mt-4 w-full rounded-xl bg-slate-800 px-4 py-2 text-sm font-medium hover:bg-slate-700'
          >
            Logout
          </button>
        )}

        <div className='mt-4 text-center text-xs text-slate-400'>
          {mode === 'login' ? (
            <>
              Don&apos;t have an account?{' '}
              <button
                type='button'
                onClick={() => {
                  resetFeedback()
                  setMode('register')
                }}
                className='text-emerald-400 hover:underline'
              >
                Register
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button
                type='button'
                onClick={() => {
                  resetFeedback()
                  setMode('login')
                }}
                className='text-emerald-400 hover:underline'
              >
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
