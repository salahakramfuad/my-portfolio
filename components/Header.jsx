'use client'

import React from 'react'
import Link from 'next/link'

const NAV = [
  { label: 'Projects', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Resume', href: '#resume' },
  { label: 'Reads', href: '#myreads' },
  { label: 'Contact', href: '#contact' }
]

export default function Header() {
  const [open, setOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)
  const [active, setActive] = React.useState('#hero')

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setActive(window.location.hash || '#hero')
    }
  }, [])

  React.useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 6)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  React.useEffect(() => {
    const onHash = () => {
      setActive(window.location.hash || '#hero')
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  // ✅ plain JS now
  function handleNavClick(href) {
    setActive(href)
    setOpen(false)
  }

  return (
    <header className='sticky inset-x-0 top-0 z-40'>
      {/* Skip to content */}
      <a
        href='#hero'
        className='sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-violet-700 focus:px-3 focus:py-2 focus:text-sm focus:text-white shadow-lg'
      >
        Skip to content
      </a>

      {/* Top bar */}
      <div
        className='border-b border-white/10 bg-slate-950/60 backdrop-blur-xl supports-[backdrop-filter]:bg-slate-950/40'
        style={{
          boxShadow: scrolled
            ? '0 14px 40px rgba(15,23,42,0.75)'
            : '0 0 0 rgba(0,0,0,0)',
          transition: 'box-shadow .25s ease'
        }}
      >
        <nav className='mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8'>
          {/* Brand */}
          <Link
            href='#hero'
            onClick={() => handleNavClick('#hero')}
            className='flex items-center gap-2 text-sm font-semibold tracking-tight text-slate-50'
          >
            <div className='flex h-8 w-8 items-center justify-center rounded-2xl bg-gradient-to-tr from-violet-600 to-fuchsia-500 text-xs shadow-lg shadow-violet-500/40'>
              F
            </div>
            <span className='text-base sm:text-lg'>
              <span className='text-violet-300'>Fuad</span>
              <span className='opacity-75'>.dev</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className='hidden items-center gap-6 sm:flex'>
            <ul className='flex items-center gap-1 text-xs sm:text-sm'>
              {NAV.map(({ label, href }) => {
                const isActive = active === href
                return (
                  <li key={href}>
                    <a
                      href={href}
                      onClick={() => handleNavClick(href)}
                      className={[
                        'relative rounded-full px-3 py-1.5 outline-none transition',
                        'focus-visible:ring-2 focus-visible:ring-violet-400/70',
                        'hover:bg-slate-800/70 hover:text-slate-50'
                      ].join(' ')}
                      style={{
                        color: isActive
                          ? 'rgba(250,250,255,0.98)'
                          : 'rgba(226,232,240,0.86)',
                        background: isActive
                          ? 'linear-gradient(120deg, rgba(139,92,246,0.35), rgba(236,72,153,0.35))'
                          : 'rgba(15,23,42,0.4)',
                        boxShadow: isActive
                          ? '0 8px 22px rgba(88,28,135,0.55)'
                          : 'inset 0 0 0 1px rgba(148,163,184,0.36)'
                      }}
                    >
                      {label}
                      {isActive && (
                        <span className='pointer-events-none absolute inset-x-4 -bottom-1 h-px rounded-full bg-gradient-to-r from-violet-300/80 via-fuchsia-300/80 to-violet-300/80' />
                      )}
                    </a>
                  </li>
                )
              })}
            </ul>

            {/* Desktop CTAs */}
            <div className='flex items-center gap-2'>
              <a
                href='#contact'
                onClick={() => handleNavClick('#contact')}
                className='rounded-full px-4 py-2 text-xs sm:text-sm font-medium text-white outline-none focus-visible:ring-2 focus-visible:ring-violet-400/70'
                style={{
                  background: 'linear-gradient(120deg,#6D28D9,#8B5CF6,#EC4899)',
                  boxShadow:
                    '0 14px 30px rgba(109,40,217,0.55), 0 0 0 1px rgba(248,250,252,0.06)'
                }}
              >
                Hire Me
              </a>
              <Link
                href='/login'
                className='rounded-full border border-emerald-400/60 bg-emerald-500/10 px-4 py-2 text-xs sm:text-sm font-semibold text-emerald-300 hover:bg-emerald-400/20 hover:text-emerald-50 outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/70'
              >
                Portal Login
              </Link>
            </div>
          </div>

          {/* Mobile hamburger */}
          <button
            className='inline-flex items-center justify-center rounded-lg p-2 text-slate-100 sm:hidden hover:bg-slate-800/70 focus-visible:ring-2 focus-visible:ring-violet-400/70'
            aria-label='Toggle menu'
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <svg width='22' height='22' viewBox='0 0 24 24' fill='none'>
              <path
                d='M4 7h16M4 12h16M4 17h16'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
              />
            </svg>
          </button>
        </nav>
      </div>

      {/* Mobile sheet */}
      {open && (
        <div className='sm:hidden'>
          {/* Backdrop */}
          <div
            className='fixed inset-0 z-40 bg-black/60 backdrop-blur-sm'
            onClick={() => setOpen(false)}
          />

          {/* Panel */}
          <div className='fixed right-0 top-0 z-50 flex h-full w-80 max-w-[85vw] flex-col border-l border-white/10 bg-slate-950/95 backdrop-blur-xl shadow-2xl'>
            <div className='flex items-center justify-between border-b border-white/10 px-4 py-3'>
              <Link
                href='#hero'
                className='flex items-center gap-2 text-sm font-semibold tracking-tight text-slate-50'
                onClick={() => handleNavClick('#hero')}
              >
                <div className='flex h-8 w-8 items-center justify-center rounded-2xl bg-gradient-to-tr from-violet-600 to-fuchsia-500 text-xs shadow-lg shadow-violet-500/40'>
                  F
                </div>
                <span>
                  <span className='text-violet-300'>Fuad</span>
                  <span className='opacity-75'>.dev</span>
                </span>
              </Link>

              <button
                className='rounded-md p-2 text-slate-200 hover:bg-slate-800/70 focus-visible:ring-2 focus-visible:ring-violet-400/70'
                aria-label='Close menu'
                onClick={() => setOpen(false)}
              >
                <svg width='22' height='22' viewBox='0 0 24 24' fill='none'>
                  <path
                    d='M6 6l12 12M18 6l-12 12'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                  />
                </svg>
              </button>
            </div>

            <ul className='flex-1 space-y-1 overflow-y-auto px-3 py-3'>
              {NAV.map(({ label, href }) => {
                const isActive = active === href
                return (
                  <li key={href}>
                    <a
                      href={href}
                      onClick={() => handleNavClick(href)}
                      className='block rounded-xl px-3 py-2.5 text-base outline-none transition focus-visible:ring-2 focus-visible:ring-violet-400/70'
                      style={{
                        color: isActive
                          ? 'rgba(248,250,252,0.98)'
                          : 'rgba(226,232,240,0.9)',
                        background: isActive
                          ? 'linear-gradient(120deg, rgba(139,92,246,0.32), rgba(236,72,153,0.32))'
                          : 'rgba(15,23,42,0.7)',
                        boxShadow: isActive
                          ? '0 10px 26px rgba(88,28,135,0.6)'
                          : 'inset 0 0 0 1px rgba(148,163,184,0.30)'
                      }}
                    >
                      {label}
                    </a>
                  </li>
                )
              })}
            </ul>

            <div className='space-y-2 border-t border-white/10 px-3 py-3'>
              <a
                href='#contact'
                onClick={() => handleNavClick('#contact')}
                className='inline-flex w-full items-center justify-center rounded-full px-4 py-2.5 text-sm font-medium text-white outline-none focus-visible:ring-2 focus-visible:ring-violet-400/70'
                style={{
                  background: 'linear-gradient(120deg,#6D28D9,#8B5CF6,#EC4899)',
                  boxShadow: '0 10px 26px rgba(109,40,217,0.55)'
                }}
              >
                Hire Me
              </a>
              <Link
                href='/login'
                onClick={() => setOpen(false)}
                className='inline-flex w-full items-center justify-center rounded-full border border-emerald-400/60 bg-emerald-500/10 px-4 py-2.5 text-sm font-semibold text-emerald-300 hover:bg-emerald-400/20 hover:text-emerald-50 outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/70'
              >
                Portal Login
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
