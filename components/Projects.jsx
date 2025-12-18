'use client'
import React from 'react'
import { motion, MotionConfig } from 'framer-motion'
import Image from 'next/image'

// ---- Theme (Midnight Violet) ----
const PALETTE = {
  primary: '#6D28D9',
  accent: '#8B5CF6',
  surface: 'rgba(255,255,255,0.05)',
  gridInk: 'rgba(255,255,255,.18)'
}

// ---- Data ----
const projects = [
  {
    title: 'Hope TTC',
    description:
      'Conversion-focused site for an education provider, built on Next.js.',
    image: '/images/hope-ttc.png',
    link: 'hopettc.com',
    year: '2025'
  },
  {
    title: 'International Hope School Bangladesh',
    description:
      'Redesigned the school website using Next.js and Tailwind CSS.',
    image: '/images/school.png',
    link: 'https://ihsb.vercel.app/',
    year: '2024'
  },
  {
    title: 'Library Management System',
    description:
      'Modern platform for browsing, searching, and managing library materials.',
    image: '/images/library.png',
    link: 'https://ihsblibrary.vercel.app/',
    year: '2025'
  },
  {
    title: 'Healthcare Management System',
    description: 'Professional platform for streamlined healthcare ops.',
    image: '/images/Healthcare.png',
    link: 'https://healthcare-lyart.vercel.app/',
    year: '2024'
  }
]

// ---- Motion Variants ----
const EASE = [0.22, 1, 0.36, 1]
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.06, ease: EASE }
  }
}
const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } }
}

export default function Projects() {
  return (
    <MotionConfig reducedMotion='user'>
      <section
        id='projects'
        className='relative mx-auto max-w-7xl px-6 py-16 sm:px-8'
        aria-labelledby='projects-heading'
      >
        {/* Background tuned to violet palette */}
        <div className='pointer-events-none absolute inset-0 -z-10'>
          <div
            aria-hidden
            className='absolute inset-0 opacity-60'
            style={{
              background:
                `radial-gradient(60% 60% at 20% 20%, ${PALETTE.primary}33 0%, transparent 60%),` +
                `radial-gradient(60% 60% at 80% 30%, ${PALETTE.accent}2b 0%, transparent 60%),` +
                `radial-gradient(60% 60% at 40% 90%, ${PALETTE.accent}29 0%, transparent 60%)`
            }}
          />
          <div
            aria-hidden
            className='absolute inset-0 opacity-[0.06] [mask-image:radial-gradient(65%_60%_at_50%_40%,black,transparent)]'
            style={{
              backgroundImage: `linear-gradient(to right, ${PALETTE.gridInk} 1px, transparent 1px),
                 linear-gradient(to bottom, ${PALETTE.gridInk} 1px, transparent 1px)`,
              backgroundSize: '36px 36px'
            }}
          />
        </div>

        {/* Heading */}
        <motion.h1
          id='projects-heading'
          className='text-center font-[Calistoga] text-4xl font-bold tracking-tight text-white sm:text-5xl'
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          Featured Projects
        </motion.h1>

        {/* Subtext */}
        <motion.p
          className='mx-auto mt-4 max-w-2xl text-center text-lg leading-relaxed text-slate-300'
          initial={{ opacity: 0, y: -8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.45, delay: 0.05, ease: EASE }}
        >
          Elegant, high-performance web apps crafted with care and clean code.
        </motion.p>

        {/* Grid — 4 columns on xl */}
        <motion.div
          className='mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.2 }}
        >
          {projects.map((project, i) => (
            <motion.a
              key={project.link}
              href={project.link}
              target='_blank'
              rel='noopener noreferrer'
              aria-label={`${project.title} — open project site`}
              className='group relative block overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-xl outline-none transition-all hover:shadow-2xl focus-visible:ring-2'
              style={{ backdropFilter: 'blur(6px)' }}
              variants={cardVariants}
              whileHover={{ y: -2 }}
            >
              {/* Violet border glow on hover */}
              <span
                aria-hidden
                className='pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100'
                style={{
                  background: `linear-gradient(135deg, ${PALETTE.primary}40, ${PALETTE.accent}40)`
                }}
              />

              {/* Image */}
              <div className='relative aspect-[16/10] w-full'>
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes='(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw'
                  className='object-cover transition-transform duration-500 group-hover:scale-[1.04]'
                  priority={i < 1}
                />
                {/* Gradient + year badge */}
                <div className='pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/65 via-transparent to-transparent' />
                <span
                  className='absolute left-3 top-3 inline-flex items-center rounded-full px-3 py-1 text-xs font-medium text-slate-100 ring-1 backdrop-blur-md'
                  style={{
                    background: 'rgba(15, 15, 30, .55)',
                    boxShadow: '0 6px 18px rgba(0,0,0,.35)',
                    borderColor: 'rgba(255,255,255,.14)'
                  }}
                >
                  {project.year}
                </span>
                {/* Hover overlay CTA */}
                <div className='absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
                  <span
                    className='rounded-full px-4 py-2 text-sm font-medium text-white ring-1 backdrop-blur-md'
                    style={{
                      background: `linear-gradient(90deg, ${PALETTE.primary}, ${PALETTE.accent})`,
                      borderColor: 'rgba(255,255,255,.18)'
                    }}
                  >
                    View project →
                  </span>
                </div>
              </div>

              {/* Details */}
              <div
                className='relative p-6 transition-colors'
                style={{ background: 'rgba(255,255,255,0.035)' }}
              >
                <h2 className='text-lg font-semibold text-white sm:text-xl'>
                  {project.title}
                </h2>
                <p className='mt-2 text-slate-300'>{project.description}</p>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </section>
    </MotionConfig>
  )
}
