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
  primary: '#06b6d4', // headings, pins, gradients start
  accent: '#0891b2', // hovers, rings, gradients end
  secondary: '#22d3ee', // highlights, gradients end
  surface: 'rgba(6,182,212,0.1)', // card bg (glass)
  gridInk: 'rgba(255,255,255,.18)', // grid lines
  text: '#F1F5F9', // base text (dark mode)
  surfaceDeep: '#0e172a' // deep surface for bg effects
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
        site: 'https://www.hopettc.com',
        repo: null,
        caseStudy: null
      }
    },
    {
      title: 'Mobile App Developer (Expo)',
      company: 'Party-Room Booking App • 2025',
      summary:
        'Hong Kong–style party/mahjong room marketplace using Expo Router and React Native with modern UI/UX design.',
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
                `radial-gradient(60% 60% at 20% 20%, ${PALETTE.primary}22 0%, transparent 60%),` +
                `radial-gradient(60% 60% at 80% 30%, ${PALETTE.accent}1f 0%, transparent 60%),` +
                `radial-gradient(60% 60% at 40% 90%, ${PALETTE.secondary}22 0%, transparent 60%)`
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
        <div className='mx-auto w-full max-w-7xl px-6 py-20 sm:px-8'>
          {/* Section Header */}
          <motion.div
            className='text-center mb-16'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2
              id='about-heading'
              className='text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4'
            >
              About <span className='bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent'>Me</span>
            </h2>
            <p className='text-xl text-slate-400 max-w-2xl mx-auto'>
              Passionate developer crafting modern digital experiences
            </p>
          </motion.div>

          {/* Two Column Layout */}
          <div className='grid lg:grid-cols-3 gap-8 mb-16'>
            {/* Left Column - Profile Card */}
            <motion.div
              className='lg:col-span-1'
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <div
                className='sticky top-24 rounded-3xl border-2 border-cyan-500/20 p-8 shadow-2xl backdrop-blur-xl'
                style={{
                  background: PALETTE.surface,
                  boxShadow: '0 20px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)'
                }}
              >
                <div className='relative mx-auto mb-6 w-40 h-40 overflow-hidden rounded-2xl ring-4 ring-cyan-500/30 shadow-xl'>
                  <Image
                    src='/images/Fuad.png'
                    alt='Profile portrait'
                    width={240}
                    height={240}
                    className='h-full w-full object-cover'
                    priority
                  />
                  <span
                    aria-hidden
                    className='absolute bottom-3 right-3 inline-block h-4 w-4 rounded-full ring-2 ring-slate-900'
                    style={{ background: PALETTE.secondary }}
                    title='Open to work'
                  />
                </div>
                <h3 className='text-2xl font-bold text-white text-center mb-2'>
                  Mohammad Salah Akram Fuad
                </h3>
                <p className='text-center text-cyan-300 mb-6 font-medium'>Full-Stack Developer</p>

                {/* SOCIAL LINKS */}
                <nav className='flex flex-col gap-3'>
                  {socials.map(({ label, href, icon }) => (
                    <a
                      key={label}
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel={
                        href.startsWith('http') ? 'noopener noreferrer' : undefined
                      }
                      aria-label={label}
                      className='group inline-flex items-center justify-center gap-2 rounded-xl border border-cyan-500/30 px-4 py-3 text-sm font-medium text-slate-100 backdrop-blur-md outline-none transition-all hover:bg-cyan-500/20 hover:border-cyan-400/50 focus-visible:ring-2 focus-visible:ring-cyan-400/70'
                      style={{ background: 'rgba(6,182,212,0.08)' }}
                    >
                      <span className='text-cyan-300 group-hover:scale-110 transition-transform'>{icon}</span>
                      <span>{label}</span>
                    </a>
                  ))}
                </nav>
              </div>
            </motion.div>

            {/* Right Column - Content */}
            <div className='lg:col-span-2 space-y-8'>
              {/* ABOUT ME */}
              <motion.section
                className='rounded-3xl border-2 border-cyan-500/20 p-8 shadow-xl backdrop-blur-xl'
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5, ease: EASE }}
                style={{
                  background: PALETTE.surface,
                  boxShadow: '0 20px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)'
                }}
              >
                <h2 className='mb-4 flex items-center text-2xl font-bold text-white'>
                  <FaUser className='mr-3 text-cyan-400' />
                  About Me
                </h2>
                <p className='text-slate-300 leading-relaxed text-lg'>
                  I'm a frontend-leaning full-stack developer focused on elegant,
                  high-performance web and mobile experiences. I specialize in
                  Next.js, TypeScript/JavaScript, Tailwind CSS, and React Native,
                  with an eye for UX, clean state flows, and production polish.
                </p>
              </motion.section>

              {/* EXPERIENCE */}
              <motion.section
                className='rounded-3xl border-2 border-cyan-500/20 p-8 shadow-xl backdrop-blur-xl'
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
                style={{
                  background: PALETTE.surface,
                  boxShadow: '0 20px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)'
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
                              borderColor: `${PALETTE.secondary}66`,
                              background:
                                'linear-gradient(180deg, rgba(6,182,212,0.15), rgba(6,182,212,0.05))'
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

              {/* EDUCATION */}
              <motion.section
                className='rounded-3xl border-2 border-cyan-500/20 p-8 shadow-xl backdrop-blur-xl'
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.15 }}
                style={{
                  background: PALETTE.surface,
                  boxShadow: '0 20px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)'
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
                      className='text-cyan-300 underline decoration-cyan-300/40 underline-offset-4 hover:text-cyan-200 hover:decoration-cyan-200/60'
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
            </div>
          </div>

          {/* SKILLS - Full Width */}
          <motion.section
            className='rounded-3xl border-2 border-cyan-500/20 p-8 sm:p-10 shadow-xl backdrop-blur-xl'
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.2 }}
            style={{
              background: PALETTE.surface,
              boxShadow: '0 20px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)'
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
                    borderColor: 'rgba(6,182,212,0.3)',
                    background:
                      'linear-gradient(180deg, rgba(6,182,212,0.15), rgba(6,182,212,0.05))',
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
