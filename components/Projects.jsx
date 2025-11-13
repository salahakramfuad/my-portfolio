'use client'
import React from 'react'
import { motion, MotionConfig } from 'framer-motion'
import Image from 'next/image'

// ---- Data ----
const projects = [
  {
    title: 'International Hope School Bangladesh',
    description:
      'Redesigned the school website using Next.js and Tailwind CSS.',
    image: '/images/school.png',
    link: 'https://ihsbhostel.vercel.app/',
    year: '2024'
  },
  {
    title: 'Library Management System',
    description:
      'A modern platform for browsing, searching, and managing library materials for students and faculty.',
    image: '/images/library.png',
    link: 'https://ihsblibrary.vercel.app/',
    year: '2025'
  },
  {
    title: 'Healthcare Management System',
    description: 'A professional platform for streamlined healthcare ops.',
    image: '/images/Healthcare.png',
    link: 'https://healthcare-lyart.vercel.app/',
    year: '2024'
  },
  {
    title: 'Hope TTC',
    description:
      'Clean, conversion-focused site for an education provider, built on Next.js with modern UI patterns.',
    image: '/images/hope-ttc.png', // add this asset or swap to a valid path
    link: 'https://hope-ttc.vercel.app/',
    year: '2025'
  }
]

// ---- Motion Variants ----
const EASE = [0.22, 1, 0.36, 1]
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.14, delayChildren: 0.1, ease: EASE }
  }
}
const cardVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } }
}

export default function Projects() {
  return (
    <MotionConfig reducedMotion='user'>
      <section
        id='projects'
        className='relative mx-auto max-w-7xl px-6 py-16 sm:px-8'
        aria-labelledby='projects-heading'
      >
        {/* Background aesthetics */}
        <div
          aria-hidden
          className='pointer-events-none absolute inset-0 -z-10 opacity-[0.04]'
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgb(2 6 23 / 0.8) 1px, transparent 0)',
            backgroundSize: '28px 28px'
          }}
        />

        {/* Heading */}
        <motion.h1
          id='projects-heading'
          className='text-center font-[Calistoga] text-4xl font-bold tracking-tight text-white sm:text-5xl'
          initial={{ opacity: 0, y: -18 }}
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
          transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
        >
          Explore a selection of elegant, high-performance web apps I’ve built.
        </motion.p>

        {/* Grid */}
        <motion.div
          className='mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'
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
              className='group relative block overflow-hidden rounded-2xl border border-slate-700/70 bg-slate-800/70 shadow-xl outline-none transition-all hover:shadow-2xl focus-visible:ring-2 focus-visible:ring-sky-400'
              variants={cardVariants}
              whileHover={{ scale: 1.02 }}
            >
              {/* Top image */}
              <div className='relative h-60 w-full md:h-72'>
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes='(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw'
                  className='object-cover transition-transform duration-500 group-hover:scale-105'
                  priority={i < 1}
                />
                {/* Gradient + year badge */}
                <div className='pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-80' />
                <span className='absolute left-3 top-3 inline-flex items-center rounded-full bg-slate-950/70 px-3 py-1 text-xs font-medium text-slate-200 ring-1 ring-white/10 backdrop-blur-md'>
                  {project.year}
                </span>
                {/* Hover overlay */}
                <div className='absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
                  <span className='rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white ring-1 ring-white/20 backdrop-blur-md'>
                    View project →
                  </span>
                </div>
              </div>

              {/* Details */}
              <div className='p-6 transition-colors group-hover:bg-slate-700/60'>
                <h2 className='text-xl font-semibold text-white'>
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
