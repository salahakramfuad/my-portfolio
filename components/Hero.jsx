'use client'
import Image from 'next/image'
import { motion, MotionConfig } from 'framer-motion'

// ---------- Motion ----------
const EASE = [0.22, 1, 0.36, 1]
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, ease: EASE }
  }
}
const item = {
  hidden: { y: 16, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { ease: EASE, duration: 0.6 } }
}
const float = {
  initial: { y: 0 },
  animate: {
    y: [0, -10, 0],
    transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
  }
}

// ---------- Component (JSX) ----------
function Hero({
  name = 'Mohammad Salah Akram Fuad',
  tagline = 'Available for new projects',
  description = 'I specialize in transforming designs into functional, high‑performing web applications. Let’s discuss your next project.',
  avatarSrc = '/images/logo.png',
  primaryHref = '#projects',
  secondaryHref = '#contact',
  className = ''
}) {
  return (
    <MotionConfig reducedMotion='user'>
      <section
        id='hero'
        className={`relative isolate flex min-h-[88vh] w-full items-center justify-center overflow-hidden px-6 py-20 sm:px-8 ${className}`}
        aria-label='Introductory hero section'
      >
        {/* --- Background --- */}
        <div className='pointer-events-none absolute inset-0 -z-20'>
          {/* Soft radial washes */}
          <div
            aria-hidden
            className='absolute inset-0 opacity-70'
            style={{
              background:
                'radial-gradient(60% 60% at 20% 20%, rgba(59,130,246,.15) 0%, transparent 60%),' +
                'radial-gradient(60% 60% at 80% 30%, rgba(16,185,129,.14) 0%, transparent 60%),' +
                'radial-gradient(60% 60% at 40% 90%, rgba(99,102,241,.14) 0%, transparent 60%)'
            }}
          />
          {/* Subtle grid */}
          <div
            aria-hidden
            className='absolute inset-0 opacity-[0.06] [mask-image:radial-gradient(60%_60%_at_50%_40%,black,transparent)]'
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(0,0,0,.7) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,.7) 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }}
          />
          {/* Glow ring */}
          <div
            aria-hidden
            className='absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full blur-3xl'
            style={{
              background:
                'conic-gradient(from 180deg at 50% 50%, rgba(14,165,233,.22), rgba(99,102,241,.18), rgba(16,185,129,.22), rgba(14,165,233,.22))'
            }}
          />
          {/* Optional texture */}
          <div
            aria-hidden
            className='absolute inset-0 opacity-[0.03]'
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, rgba(2,6,23,0.75) 1px, transparent 0)',
              backgroundSize: '28px 28px'
            }}
          />
        </div>

        {/* Decorative rose SVG */}
        <svg
          aria-hidden
          className='absolute -top-16 right-0 -z-10 h-[480px] w-[480px] opacity-15 select-none'
          viewBox='0 0 800 800'
          fill='none'
        >
          <circle cx='400' cy='400' r='300' stroke='url(#g)' strokeWidth='2' />
          <defs>
            <radialGradient id='g'>
              <stop offset='0%' stopColor='#f472b6' />
              <stop offset='100%' stopColor='transparent' />
            </radialGradient>
          </defs>
        </svg>

        {/* --- Content --- */}
        <motion.div
          className='relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center text-center'
          variants={container}
          initial='hidden'
          animate='visible'
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Avatar */}
          <motion.div variants={item}>
            <motion.div variants={float} initial='initial' animate='animate'>
              <div className='relative h-28 w-28 rounded-full shadow-xl ring-1 ring-black/10 sm:h-36 sm:w-36'>
                <Image
                  src={avatarSrc}
                  alt='Portrait'
                  fill
                  priority
                  sizes='(max-width: 640px) 7rem, 9rem'
                  className='rounded-full object-cover'
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Availability badge */}
          <motion.div variants={item} className='mt-6'>
            <span
              className='inline-flex items-center gap-2 rounded-full border border-sky-600/30 bg-sky-950/40 px-3 py-1 text-xs text-sky-300 shadow-[inset_0_1px_0_rgba(255,255,255,.06)] backdrop-blur-md dark:bg-slate-800/60 dark:text-sky-300'
              role='status'
              aria-live='polite'
            >
              <span className='inline-block h-2 w-2 animate-pulse rounded-full bg-sky-400' />
              {tagline}
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={item}
            className='mt-5 font-display text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-5xl'
          >
            {name}
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={item}
            className='mt-4 max-w-2xl text-balance text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg'
          >
            {description}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={item}
            className='mt-8 flex flex-col items-center gap-3 sm:flex-row'
          >
            <a
              href={primaryHref}
              className='group inline-flex items-center justify-center gap-2 rounded-full bg-sky-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-sky-600/20 outline-none transition-transform duration-200 hover:-translate-y-0.5 hover:bg-sky-700 focus-visible:ring-2 focus-visible:ring-sky-400 active:translate-y-0'
              aria-label='Explore my work'
            >
              <span>Explore my work</span>
              <span
                aria-hidden
                className='transition-transform group-hover:translate-y-0.5'
              >
                ↓
              </span>
            </a>
            <a
              href={secondaryHref}
              className='inline-flex items-center justify-center rounded-full border border-sky-600/50 bg-white/60 px-6 py-3 text-sm font-medium text-sky-700 backdrop-blur-md outline-none transition-colors duration-200 hover:bg-white focus-visible:ring-2 focus-visible:ring-sky-400 dark:border-sky-400/30 dark:bg-slate-900/40 dark:text-sky-300'
              aria-label='Let’s connect'
            >
              Let’s Connect
            </a>
          </motion.div>
        </motion.div>
      </section>
    </MotionConfig>
  )
}

export default Hero
