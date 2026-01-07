'use client'
import React from 'react'
import { motion, MotionConfig } from 'framer-motion'
import Image from 'next/image'

// ---- Theme (Simple Blue) ----
const PALETTE = {
  primary: '#3b82f6',
  accent: '#3b82f6',
  secondary: '#3b82f6',
  surface: 'rgba(59,130,246,0.05)',
  gridInk: 'rgba(255,255,255,.18)'
}

// ---- Data ----
const projects = [
  {
    title: 'Hope TTC',
    description:
      'Conversion-focused site for an education provider, built on Next.js.',
    image: '/images/hope-ttc.png',
    link: 'https://www.hopettc.com',
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
  const featuredProject = projects[0]
  const otherProjects = projects.slice(1)

  return (
    <MotionConfig reducedMotion='user'>
      <section
        id='projects'
        className='relative mx-auto max-w-7xl px-6 py-20 sm:px-8'
        aria-labelledby='projects-heading'
      >
        {/* Background */}
        <div className='pointer-events-none absolute inset-0 -z-10'>
          <div
            aria-hidden
            className='absolute inset-0'
            style={{
              background:
                `radial-gradient(ellipse 80% 50% at 50% 0%, ${PALETTE.primary}08 0%, transparent 70%)`
            }}
          />
          <div
            aria-hidden
            className='absolute inset-0 opacity-[0.08]'
            style={{
              backgroundImage: `linear-gradient(to right, ${PALETTE.gridInk} 1px, transparent 1px),
                 linear-gradient(to bottom, ${PALETTE.gridInk} 1px, transparent 1px)`,
              backgroundSize: '40px 40px'
            }}
          />
        </div>

        {/* Section Header */}
        <motion.div
          className='text-center mb-16'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h1
            id='projects-heading'
            className='text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4'
          >
            Featured <span className='text-blue-400'>Projects</span>
          </h1>
          <p className='text-xl text-slate-400 max-w-2xl mx-auto'>
            Elegant, high-performance web apps crafted with care and clean code
          </p>
        </motion.div>

        {/* Featured Project */}
        <motion.a
          href={featuredProject.link}
          target='_blank'
          rel='noopener noreferrer'
          className='group block mb-16'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className='relative overflow-hidden rounded-3xl border border-blue-500/30 bg-blue-500/5 backdrop-blur-xl shadow-2xl'>
            <div className='grid lg:grid-cols-2 gap-0'>
              {/* Image */}
              <div className='relative h-64 lg:h-auto lg:min-h-[500px] order-2 lg:order-1'>
                <Image
                  src={featuredProject.image}
                  alt={`${featuredProject.title} - Featured project`}
                  fill
                  className='object-cover transition-transform duration-700 group-hover:scale-105'
                  priority
                />
                <div className='absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/40 to-transparent lg:from-transparent lg:via-transparent' />
                <span
                  className='absolute top-4 left-4 inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold text-white backdrop-blur-md border border-blue-400/30'
                  style={{
                    background: 'rgba(59,130,246,0.2)',
                    boxShadow: '0 8px 24px rgba(0,0,0,.4)'
                  }}
                >
                  Featured • {featuredProject.year}
                </span>
              </div>
              
              {/* Content */}
              <div className='flex flex-col justify-center p-8 lg:p-12 order-1 lg:order-2 relative'>
                <h2 className='text-3xl lg:text-4xl font-bold text-white mb-4'>
                  {featuredProject.title}
                </h2>
                <p className='text-lg text-slate-300 mb-6 leading-relaxed'>
                  {featuredProject.description}
                </p>
                <div className='inline-flex items-center gap-2 text-blue-300 font-semibold group-hover:gap-4 transition-all'>
                  View Project
                  <svg className='w-5 h-5 group-hover:translate-x-1 transition-transform' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 8l4 4m0 0l-4 4m4-4H3' />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </motion.a>

        {/* Other Projects Grid */}
        <motion.div
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.2 }}
        >
          {otherProjects.map((project, i) => (
            <motion.a
              key={project.link}
              href={project.link}
              target='_blank'
              rel='noopener noreferrer'
              aria-label={`${project.title} — open project site`}
              className='group relative block overflow-hidden rounded-2xl border border-blue-500/20 bg-blue-500/5 backdrop-blur-xl shadow-xl outline-none transition-all hover:shadow-2xl focus-visible:ring-2 focus-visible:ring-blue-400/70 hover:border-blue-400/40'
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              {/* Simple glow on hover */}
              <span
                aria-hidden
                className='pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100'
                style={{
                  background: `rgba(59,130,246,0.1)`
                }}
              />

              {/* Image */}
              <div className='relative aspect-video w-full'>
                <Image
                  src={project.image}
                  alt={`${project.title} project screenshot`}
                  fill
                  sizes='(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw'
                  className='object-cover transition-transform duration-500 group-hover:scale-110'
                  loading={i === 0 ? 'eager' : 'lazy'}
                />
                <div className='absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent' />
                <span
                  className='absolute top-3 left-3 inline-flex items-center rounded-lg px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md border border-blue-400/30'
                  style={{
                    background: 'rgba(59,130,246,0.2)',
                    boxShadow: '0 4px 12px rgba(0,0,0,.3)'
                  }}
                >
                  {project.year}
                </span>
              </div>

              {/* Details */}
              <div className='relative p-6'>
                <h2 className='text-xl font-bold text-white mb-2'>
                  {project.title}
                </h2>
                <p className='text-slate-300 text-sm leading-relaxed'>
                  {project.description}
                </p>
                <div className='mt-4 inline-flex items-center gap-2 text-blue-300 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity'>
                  View Details
                  <svg className='w-4 h-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                  </svg>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </section>
    </MotionConfig>
  )
}
