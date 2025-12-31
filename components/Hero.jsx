'use client'
import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Hero() {
  return (
    <section id='hero' className='relative overflow-hidden bg-cover'>
      {/* Local theme vars (only this section uses them) */}
      <div
        className='absolute inset-0 -z-10'
        style={{
          background:
            'radial-gradient(60% 60% at 20% 20%, #6D28D922 0%, transparent 60%),' +
            'radial-gradient(60% 60% at 80% 30%, #8B5CF61F 0%, transparent 60%),' +
            'radial-gradient(60% 60% at 40% 90%, rgba(167,139,250,.18) 0%, transparent 60%)'
        }}
      />
      <div
        className='absolute inset-0 -z-10 opacity-[0.06]'
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.2) 1px, transparent 1px)',
          backgroundSize: '38px 38px',
          maskImage: 'radial-gradient(70% 60% at 50% 40%, black, transparent)',
          WebkitMaskImage:
            'radial-gradient(70% 60% at 50% 40%, black, transparent)'
        }}
      />

      <div className='mx-auto max-w-7xl px-6 py-24 sm:py-32'>
        <div className='grid items-center gap-10 lg:grid-cols-2'>
          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p
              className='inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium'
              style={{
                borderColor: 'rgba(255,255,255,.12)',
                background: 'rgba(255,255,255,.06)',
                color: '#C4B5FD'
              }}
            >
              Available for new projects
            </p>

            <h1 className='mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl'>
              Mohammad Salah Akram Fuad
            </h1>
            <p className='mt-3 max-w-xl text-slate-300'>
              I transform designs into fast, accessible, production-grade apps.
              Specializing in Next.js, React-Native (Expo), Tailwind, and clean
              UI systems.
            </p>

            <div className='mt-8 flex flex-wrap gap-3'>
              <a
                href='#projects'
                className='inline-flex items-center rounded-full px-5 py-3 text-sm font-medium text-white outline-none focus-visible:ring-2'
                style={{
                  background: 'linear-gradient(90deg, #6D28D9, #8B5CF6)',
                  boxShadow: '0 12px 30px rgba(139,92,246,.35)'
                }}
              >
                Explore my work  here→
              </a>
              <a
                href='#contact'
                className='inline-flex items-center rounded-full border px-5 py-3 text-sm font-medium text-slate-100 outline-none focus-visible:ring-2 hover:bg-white/10'
                style={{
                  borderColor: 'rgba(255,255,255,.15)',
                  background: 'rgba(255,255,255,.06)'
                }}
              >
                Let’s connect
              </a>
            </div>
          </motion.div>

          {/* Portrait / Logo */}
          <motion.div
            className='relative mx-auto aspect-square w-72 max-w-sm sm:w-80'
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className='absolute -inset-6 -z-10 rounded-[2rem] blur-3xl'
              style={{
                background:
                  'conic-gradient(from 180deg at 50% 50%, #6D28D933, #8B5CF633, rgba(167,139,250,.35), #6D28D933)'
              }}
            />
            <div className='overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-4 backdrop-blur'>
              <Image
                src='/images/logo.png'
                alt='Portrait or brand mark'
                width={640}
                height={640}
                className='h-full w-full rounded-[1.5rem] object-cover'
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
