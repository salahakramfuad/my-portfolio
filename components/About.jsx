'use client'
import React from 'react'
import Image from 'next/image'
import { motion, MotionConfig } from 'framer-motion'
import {
  FaUser,
  FaGraduationCap,
  FaBriefcase,
  FaCode,
  FaGithub,
  FaLinkedin,
  FaEnvelope
} from 'react-icons/fa'

const EASE = [0.22, 1, 0.36, 1]
const PALETTE = {
  primary: '#6D28D9', // headings, pins, gradients start
  accent: '#8B5CF6', // hovers, rings, gradients end
  surface: 'rgba(255,255,255,0.05)', // card bg (glass)
  gridInk: 'rgba(255,255,255,.2)', // grid lines
  text: '#F1F5F9', // base text (dark mode)
  surfaceDeep: '#1E1B4B' // deep surface for bg effects
}

export default function AboutPage() {
  // Experience — latest first
  const experience = [
    {
      title: 'Full Stack Developer',
      company: 'Hope TTC • Oct 2025 – Present',
      summary:
        'Building an Airbnb-style marketplace with listings, search, booking, and messaging flows.',
      stack: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
      links: {
        site: 'https://www.hope-ttc.vercel.app',
        repo: null,
        caseStudy: null
      }
    },
    {
      title: 'Mobile App Developer (Expo)',
      company: 'Party-Room Booking App • 2025',
      summary:
        'Hong Kong–style party/mahjong room marketplace using Expo Router and React Native with a unified violet brand system.',
      stack: ['Expo', 'React Native', 'TypeScript', 'Expo Router'],
      links: { site: null, repo: null, caseStudy: null }
    },
    {
      title: 'Frontend Developer',
      company: 'International Hope Company LTD • 2024–2025',
      summary:
        'Delivered modern UI features and performance improvements across key pages.',
      stack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
      links: {
        site: 'https://www.ihsb.vercel.app',
        repo: null,
        caseStudy: null
      }
    }
  ]

  const education = [
    {
      degree: "Bachelor's in Computer Science and Engineering",
      school: 'BRAC University • 2021–2025',
      link: 'https://www.bracu.ac.bd/'
    }
  ]

  const skills = [
    'React',
    'TypeScript',
    'JavaScript',
    'Tailwind CSS',
    'Next.js',
    'MySQL',
    'Drizzle',
    'shadcn/ui',
    'PostgreSQL',
    'GitHub'
  ]

  const socials = [
    {
      label: 'GitHub',
      href: 'https://github.com/salahakramfuad',
      icon: <FaGithub aria-hidden />
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/salahakramfuad/',
      icon: <FaLinkedin aria-hidden />
    },
    {
      label: 'Email',
      href: 'mailto:salahakramfuad@gmail.com',
      icon: <FaEnvelope aria-hidden />
    }
  ]

  return (
    <MotionConfig reducedMotion='user'>
      <section
        id='about'
        aria-labelledby='about-heading'
        className='relative min-h-screen'
      >
        {/* BACKGROUND */}
        <div className='pointer-events-none absolute inset-0 -z-10'>
          <div
            aria-hidden
            className='absolute inset-0'
            style={{
              background:
                `radial-gradient(60% 60% at 20% 20%, ${PALETTE.primary}33 0%, transparent 60%),` +
                `radial-gradient(60% 60% at 80% 30%, ${PALETTE.accent}2b 0%, transparent 60%),` +
                `radial-gradient(60% 60% at 40% 90%, ${PALETTE.accent}2d 0%, transparent 60%)`
            }}
          />
          <div
            aria-hidden
            className='absolute inset-0 opacity-[0.08] [mask-image:radial-gradient(65%_60%_at_50%_40%,black,transparent)]'
            style={{
              backgroundImage: `linear-gradient(to right, ${PALETTE.gridInk} 1px, transparent 1px),
                 linear-gradient(to bottom, ${PALETTE.gridInk} 1px, transparent 1px)`,
              backgroundSize: '34px 34px'
            }}
          />
        </div>

        {/* CONTAINER */}
        <div className='mx-auto w-full max-w-7xl px-6 py-16 sm:px-8'>
          {/* HEADER BAND */}
          <motion.header
            className='mb-10 rounded-3xl border border-white/10 p-6 text-center shadow-2xl backdrop-blur-lg sm:p-10'
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, ease: EASE }}
            style={{
              background: PALETTE.surface,
              boxShadow:
                '0 20px 60px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)'
            }}
          >
            <div className='relative mx-auto mb-6 h-32 w-32 overflow-hidden rounded-full ring-2 ring-white/15 shadow-xl sm:h-36 sm:w-36'>
              <Image
                src='/images/Fuad.png'
                alt='Profile portrait of Mohammad Salah Akram Fuad'
                width={288}
                height={288}
                className='h-full w-full object-cover'
                priority
              />
              <span
                aria-hidden
                className='absolute bottom-2 right-2 inline-block h-3 w-3 rounded-full ring-2 ring-slate-900'
                style={{ background: PALETTE.accent }}
                title='Open to work'
              />
            </div>
            <h1
              id='about-heading'
              className='text-3xl font-bold tracking-tight text-white sm:text-4xl'
            >
              Mohammad Salah Akram Fuad
            </h1>
            <p className='mt-2 text-lg text-slate-300'>Full-Stack Developer</p>

            {/* SOCIAL LINKS */}
            <nav className='mt-5 flex flex-wrap items-center justify-center gap-3'>
              {socials.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={
                    href.startsWith('http') ? 'noopener noreferrer' : undefined
                  }
                  aria-label={label}
                  className='inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-slate-100 backdrop-blur-md outline-none transition-colors hover:bg-white/10 focus-visible:ring-2'
                  style={{ background: PALETTE.surface }}
                >
                  <span className='text-slate-200'>{icon}</span>
                  <span>{label}</span>
                </a>
              ))}
            </nav>
          </motion.header>

          {/* EXPERIENCE */}
          <motion.section
            className='mb-8 rounded-3xl border border-white/10 p-6 shadow-xl backdrop-blur-lg sm:p-10'
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, ease: EASE }}
            style={{
              background: PALETTE.surface,
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)'
            }}
          >
            <h2 className='mb-6 flex items-center text-2xl font-bold text-gray-100'>
              <FaBriefcase className='mr-3' style={{ color: PALETTE.accent }} />{' '}
              Experience
            </h2>

            <ol className='relative ml-3 border-l border-white/10'>
              {experience.map(({ title, company, summary, stack, links }) => (
                <li key={`${title}-${company}`} className='mb-8 ml-5'>
                  <span
                    className='absolute -left-2 mt-1 inline-flex h-3 w-3 rounded-full ring-2 ring-slate-900'
                    style={{ background: PALETTE.primary }}
                    aria-hidden
                  />
                  <div
                    className='rounded-2xl p-5'
                    style={{ background: 'rgba(255,255,255,0.05)' }}
                  >
                    <h3 className='text-lg font-semibold text-white'>
                      {title}
                    </h3>
                    <p className='text-sm text-slate-300'>{company}</p>
                    {summary && (
                      <p className='mt-2 text-slate-300/90'>{summary}</p>
                    )}

                    {/* Tech stack badges */}
                    {stack?.length ? (
                      <div className='mt-3 flex flex-wrap gap-2'>
                        {stack.map((s) => (
                          <span
                            key={s}
                            className='inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium text-white/90'
                            style={{
                              borderColor: `${PALETTE.accent}66`,
                              background:
                                'linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))'
                            }}
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    ) : null}

                    {/* Links */}
                    {(links?.site || links?.repo || links?.caseStudy) && (
                      <div className='mt-4 flex flex-wrap gap-2'>
                        {links.site && (
                          <a
                            href={links.site}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-medium text-slate-100 backdrop-blur-md outline-none transition-colors hover:bg-white/10 focus-visible:ring-2'
                            style={{
                              borderColor: 'rgba(255,255,255,.15)',
                              background: PALETTE.surface
                            }}
                          >
                            View Site →
                          </a>
                        )}
                        {links.repo && (
                          <a
                            href={links.repo}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-medium text-slate-100 backdrop-blur-md outline-none transition-colors hover:bg-white/10 focus-visible:ring-2'
                            style={{
                              borderColor: 'rgba(255,255,255,.15)',
                              background: PALETTE.surface
                            }}
                          >
                            GitHub Repo
                          </a>
                        )}
                        {links.caseStudy && (
                          <a
                            href={links.caseStudy}
                            className='inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-medium text-slate-100 backdrop-blur-md outline-none transition-colors hover:bg-white/10 focus-visible:ring-2'
                            style={{
                              borderColor: 'rgba(255,255,255,.15)',
                              background: PALETTE.surface
                            }}
                          >
                            Case Study
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </motion.section>

          {/* ABOUT ME */}
          <motion.section
            className='mb-8 rounded-3xl border border-white/10 p-6 shadow-xl backdrop-blur-lg sm:p-10'
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.05 }}
            style={{
              background: PALETTE.surface,
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)'
            }}
          >
            <h2 className='mb-4 flex items-center text-2xl font-bold text-gray-100'>
              <FaUser className='mr-3' style={{ color: PALETTE.accent }} />{' '}
              About Me
            </h2>
            <p className='text-slate-300 leading-relaxed'>
              I’m a frontend-leaning full-stack developer focused on elegant,
              high-performance web and mobile experiences. I specialize in
              Next.js, TypeScript/JavaScript, Tailwind CSS, and React Native,
              with an eye for UX, clean state flows, and production polish.
            </p>
          </motion.section>

          {/* EDUCATION */}
          <motion.section
            className='mb-8 rounded-3xl border border-white/10 p-6 shadow-xl backdrop-blur-lg sm:p-10'
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.06 }}
            style={{
              background: PALETTE.surface,
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)'
            }}
          >
            <h2 className='mb-4 flex items-center text-2xl font-bold text-gray-100'>
              <FaGraduationCap
                className='mr-3'
                style={{ color: PALETTE.accent }}
              />{' '}
              Education
            </h2>
            <ul className='space-y-4'>
              {education.map(({ degree, school, link }) => (
                <li
                  key={degree}
                  className='rounded-xl p-4'
                  style={{ background: 'rgba(255,255,255,0.05)' }}
                >
                  <h3 className='font-semibold text-gray-100'>{degree}</h3>
                  {link ? (
                    <a
                      href={link}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-violet-300 underline decoration-violet-300/40 underline-offset-4 hover:text-violet-200 hover:decoration-violet-200/60'
                      aria-label='BRAC University website'
                    >
                      {school}
                    </a>
                  ) : (
                    <p className='text-slate-300'>{school}</p>
                  )}
                </li>
              ))}
            </ul>
          </motion.section>

          {/* SKILLS */}
          <motion.section
            className='rounded-3xl border border-white/10 p-6 shadow-xl backdrop-blur-lg sm:p-10'
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.07 }}
            style={{
              background: PALETTE.surface,
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)'
            }}
          >
            <h2 className='mb-4 flex items-center text-2xl font-bold text-gray-100'>
              <FaCode className='mr-3' style={{ color: PALETTE.accent }} />{' '}
              Skills
            </h2>
            <div className='grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6'>
              {skills.map((skill) => (
                <div
                  key={skill}
                  className='group relative overflow-hidden rounded-xl border px-4 py-3 text-center font-medium text-slate-100 transition-all'
                  style={{
                    borderColor: 'rgba(255,255,255,0.12)',
                    background:
                      'linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
                    boxShadow: '0 6px 18px rgba(0,0,0,0.25)'
                  }}
                >
                  <span
                    aria-hidden
                    className='pointer-events-none absolute inset-0 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100'
                    style={{ transform: 'skewX(-15deg)' }}
                  />
                  {skill}
                </div>
              ))}
            </div>
          </motion.section>
        </div>
      </section>
    </MotionConfig>
  )
}
