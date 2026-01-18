'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { signOut, onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../lib/firebase'
import Link from 'next/link'

const navItems = [
  { label: 'Projects', href: '/dashboard', icon: '📁' },
  { label: 'Experience', href: '/dashboard/experience', icon: '💼' },
  { label: 'Skills', href: '/dashboard/skills', icon: '🛠️' },
  { label: 'Resume', href: '/dashboard/resume', icon: '📄' }
]

export default function DashboardLayout({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser || !firebaseUser.emailVerified) {
        setLoading(false)
        router.push('/login')
        return
      }

      try {
        // Create session
        const token = await firebaseUser.getIdToken()
        const res = await fetch('/api/auth/session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ idToken: token })
        })

        if (res.ok) {
          const data = await res.json()
          setUser(data.user)
        } else {
          router.push('/login')
        }
      } catch (error) {
        console.error('Session error:', error)
        router.push('/login')
      } finally {
        setLoading(false)
      }
    })

    return () => unsubscribe()
  }, [router])

  const handleLogout = async () => {
    try {
      await signOut(auth)
      await fetch('/api/auth/session', { method: 'DELETE' })
      router.push('/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-slate-950 text-slate-50'>
        <div className='text-center'>
          <div className='inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-400 border-r-transparent'></div>
          <p className='mt-4 text-slate-400'>Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className='min-h-screen bg-slate-950 text-slate-50'>
      {/* Sidebar */}
      <aside className='fixed left-0 top-0 z-40 h-screen w-64 border-r border-blue-500/20 bg-slate-900/80 backdrop-blur-xl'>
        <div className='flex h-full flex-col'>
          {/* Header */}
          <div className='border-b border-blue-500/20 p-6'>
            <Link href='/dashboard' className='flex items-center gap-2'>
              <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-sm font-bold'>
                F
              </div>
              <div>
                <div className='font-semibold text-white'>Dashboard</div>
                <div className='text-xs text-slate-400'>{user?.email}</div>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className='flex-1 space-y-1 p-4'>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className='flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-slate-300 transition-colors hover:bg-blue-500/10 hover:text-white'
              >
                <span className='text-xl'>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Footer */}
          <div className='border-t border-blue-500/20 p-4'>
            <Link
              href='/'
              className='mb-2 flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-slate-300 transition-colors hover:bg-blue-500/10 hover:text-white'
            >
              <span className='text-xl'>🏠</span>
              <span>View Portfolio</span>
            </Link>
            <button
              onClick={handleLogout}
              className='w-full flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/10'
            >
              <span className='text-xl'>🚪</span>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className='ml-64 min-h-screen p-8'>
        <div className='mx-auto max-w-7xl'>{children}</div>
      </main>
    </div>
  )
}
