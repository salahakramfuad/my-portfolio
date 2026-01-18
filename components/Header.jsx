'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

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
            className='sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-blue-600 focus:px-3 focus:py-2 focus:text-sm focus:text-white shadow-lg'
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
        <nav className='mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8'>
          {/* Brand */}
          <Link
            href='#hero'
            onClick={() => handleNavClick('#hero')}
            className='flex items-center gap-2 text-sm font-semibold tracking-tight text-slate-50'
          >
            <div className='flex h-10 w-10 items-center justify-center rounded-2xltext-sm font-bold shadow-lg overflow-hidden'>
              <Image src='/images/Fuad.png' alt='Logo' width={40} height={40} className='rounded-full' />
            </div>
            <span className='text-lg sm:text-xl font-bold'>
              <span className='text-blue-400'>Mohammad Salah Akram </span>
              <span className='opacity-75'>Fuad</span>
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
                        'focus-visible:ring-2 focus-visible:ring-blue-400/70',
                        'hover:bg-slate-800/70 hover:text-slate-50'
                      ].join(' ')}
                      style={{
                        color: isActive
                          ? '#ffffff'
                          : 'rgba(226,232,240,0.86)',
                        background: isActive
                          ? 'rgba(59,130,246,0.2)'
                          : 'rgba(15,23,42,0.4)',
                        boxShadow: isActive
                          ? '0 0 0 1px rgba(59,130,246,0.5)'
                          : 'inset 0 0 0 1px rgba(148,163,184,0.36)'
                      }}
                    >
                      {label}
                      {isActive && (
                        <span className='pointer-events-none absolute inset-x-4 -bottom-1 h-px rounded-full bg-blue-400' />
                      )}
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Mobile hamburger */}
          <button
            className='inline-flex items-center justify-center rounded-lg p-2 text-slate-100 sm:hidden hover:bg-slate-800/70 focus-visible:ring-2 focus-visible:ring-blue-400/70'
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
                <div className='flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-600 text-sm font-bold shadow-lg'>
                  F
                </div>
                <span className='text-base font-bold'>
                  <span className='text-blue-400'>Mohammad Salah Akram </span>
                  <span className='opacity-75'>Fuad</span>
                </span>
              </Link>

              <button
                className='rounded-md p-2 text-slate-200 hover:bg-slate-800/70 focus-visible:ring-2 focus-visible:ring-blue-400/70'
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
                      className='block rounded-xl px-3 py-2.5 text-base outline-none transition focus-visible:ring-2 focus-visible:ring-blue-400/70'
                      style={{
                        color: isActive
                          ? '#ffffff'
                          : 'rgba(226,232,240,0.9)',
                        background: isActive
                          ? 'rgba(59,130,246,0.2)'
                          : 'rgba(15,23,42,0.7)',
                        boxShadow: isActive
                          ? '0 0 0 1px rgba(59,130,246,0.5)'
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
                className='inline-flex w-full items-center justify-center rounded-full px-4 py-2.5 text-sm font-medium text-white outline-none focus-visible:ring-2 focus-visible:ring-blue-400/70'
                style={{
                  background: '#3b82f6',
                  boxShadow: '0 4px 12px rgba(59,130,246,0.3)'
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
