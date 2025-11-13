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
  const [active, setActive] = React.useState(
    typeof window !== 'undefined' ? window.location.hash || '#hero' : '#hero'
  )

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Highlight active anchor when hash changes (e.g., back/forward)
  React.useEffect(() => {
    const onHash = () => setActive(window.location.hash || '#hero')
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  // Close mobile menu on route/hash click
  function handleNavClick(href) {
    setActive(href)
    setOpen(false)
  }

  return (
    <header className='sticky top-0 z-40'>
      {/* Skip to content */}
      <a
        href='#hero'
        className='sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-violet-700 focus:px-3 focus:py-2 focus:text-white'
      >
        Skip to content
      </a>

      {/* Top bar */}
      <div
        className='border-b backdrop-blur supports-[backdrop-filter]:bg-white/5'
        style={{
          background: 'color-mix(in oklab, #0F172A 70%, transparent)',
          borderColor: 'rgba(255,255,255,0.08)',
          boxShadow: scrolled ? '0 6px 24px rgba(0,0,0,0.28)' : 'none',
          transition: 'box-shadow .25s ease'
        }}
      >
        <nav className='mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6'>
          {/* Brand */}
          <Link
            href='#hero'
            className='font-semibold tracking-tight text-[var(--text,#F1F5F9)]'
            onClick={() => handleNavClick('#hero')}
          >
            <span style={{ color: 'var(--primary,#A78BFA)' }}>Fuad</span>
            <span className='opacity-80'>.dev</span>
          </Link>

          {/* Desktop links */}
          <ul className='hidden items-center gap-1 text-sm sm:flex'>
            {NAV.map(({ label, href }) => {
              const isActive = active === href
              return (
                <li key={href}>
                  <a
                    href={href}
                    onClick={() => handleNavClick(href)}
                    className='rounded-full px-3 py-1 outline-none focus-visible:ring-2'
                    style={{
                      color: 'rgba(248,250,252,0.9)',
                      boxShadow: 'inset 0 0 0 1px rgba(255,255,255,.08)',
                      background: isActive
                        ? 'rgba(167,139,250,.22)'
                        : 'rgba(255,255,255,.04)'
                    }}
                  >
                    {label}
                  </a>
                </li>
              )
            })}
          </ul>

          {/* Desktop CTA */}
          <a
            href='#contact'
            onClick={() => handleNavClick('#contact')}
            className='hidden rounded-full px-4 py-2 text-sm font-medium text-white shadow-sm sm:inline-flex outline-none focus-visible:ring-2'
            style={{
              background: 'linear-gradient(90deg, #6D28D9, #8B5CF6)',
              boxShadow: '0 8px 24px rgba(139,92,246,.35)'
            }}
          >
            Hire Me
          </a>

          {/* Mobile hamburger */}
          <button
            className='inline-flex items-center justify-center rounded-md p-2 text-slate-200 sm:hidden hover:bg-white/10 focus-visible:ring-2'
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
          <div className='fixed right-0 top-0 z-50 h-full w-80 max-w-[85vw] border-l border-white/10 bg-[color-mix(in_okrLab,_#0F172A_85%,_transparent)] backdrop-blur-xl shadow-2xl'>
            <div className='flex items-center justify-between px-4 py-3 border-b border-white/10'>
              <Link
                href='#hero'
                className='font-semibold tracking-tight text-white'
                onClick={() => handleNavClick('#hero')}
              >
                <span style={{ color: '#A78BFA' }}>Fuad</span>
                <span className='opacity-80'>.dev</span>
              </Link>
              <button
                className='rounded-md p-2 text-slate-200 hover:bg-white/10 focus-visible:ring-2'
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

            <ul className='p-2'>
              {NAV.map(({ label, href }) => {
                const isActive = active === href
                return (
                  <li key={href}>
                    <a
                      href={href}
                      onClick={() => handleNavClick(href)}
                      className='mt-1 block rounded-lg px-3 py-2 text-base outline-none focus-visible:ring-2'
                      style={{
                        color: 'rgba(241,245,249,0.95)',
                        background: isActive
                          ? 'rgba(167,139,250,.18)'
                          : 'transparent'
                      }}
                    >
                      {label}
                    </a>
                  </li>
                )
              })}
            </ul>

            <div className='px-3 pt-2'>
              <a
                href='#contact'
                onClick={() => handleNavClick('#contact')}
                className='inline-flex w-full items-center justify-center rounded-full px-4 py-2 text-sm font-medium text-white outline-none focus-visible:ring-2'
                style={{
                  background: 'linear-gradient(90deg, #6D28D9, #8B5CF6)',
                  boxShadow: '0 10px 26px rgba(139,92,246,.35)'
                }}
              >
                Hire Me
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
