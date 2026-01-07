'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Hero() {
  return (
    <section id='hero' className='relative min-h-screen flex items-center overflow-hidden'>
      {/* Animated gradient background */}
      <div className='absolute inset-0 -z-10'>
        <div
          className='absolute inset-0'
          style={{
            background:
              'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(59,130,246,0.1) 0%, transparent 70%)'
          }}
        />
        <div
          className='absolute inset-0 opacity-[0.08]'
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.15) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className='mx-auto w-full max-w-7xl px-6 py-20 sm:py-32 lg:py-40'>
        <div className='grid lg:grid-cols-12 gap-12 items-center'>
          {/* Left Column - Content */}
          <motion.div
            className='lg:col-span-7'
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className='inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-medium mb-6'
              style={{
                borderColor: 'rgba(59,130,246,0.3)',
                background: 'rgba(59,130,246,0.1)',
                color: '#60a5fa'
              }}
            >
              <span className='relative flex h-2 w-2'>
                <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75'></span>
                <span className='relative inline-flex rounded-full h-2 w-2 bg-blue-400'></span>
              </span>
              Available for new projects
            </motion.div>

            <h1 className='text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-tight'>
              <span className='block'>Hello, I'm</span>
              <span className='block text-blue-400'>
                Mohammad Salah
              </span>
              <span className='block'>Akram Fuad</span>
            </h1>

            <p className='text-xl sm:text-2xl text-slate-300 mb-10 leading-relaxed max-w-2xl'>
              Full-Stack Developer crafting elegant, high-performance web and mobile experiences with modern technologies.
            </p>

            <div className='flex flex-wrap gap-4 mb-12'>
              <motion.a
                href='#projects'
                className='group inline-flex items-center gap-2 rounded-xl px-6 py-4 text-base font-semibold text-white outline-none focus-visible:ring-2 focus-visible:ring-blue-400/70 transition-all'
                style={{
                  background: '#3b82f6',
                  boxShadow: '0 4px 12px rgba(59,130,246,.3)'
                }}
                whileHover={{ scale: 1.02, boxShadow: '0 6px 16px rgba(59,130,246,.4)' }}
                whileTap={{ scale: 0.98 }}
              >
                View My Work
                <svg className='w-5 h-5 group-hover:translate-x-1 transition-transform' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 8l4 4m0 0l-4 4m4-4H3' />
                </svg>
              </motion.a>
              <motion.a
                href='#contact'
                className='inline-flex items-center gap-2 rounded-xl border-2 px-6 py-4 text-base font-semibold text-slate-100 outline-none focus-visible:ring-2 focus-visible:ring-blue-400/70 transition-all hover:bg-white/5'
                style={{
                  borderColor: 'rgba(59,130,246,0.4)',
                  background: 'rgba(59,130,246,0.05)'
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Get In Touch
              </motion.a>
            </div>

            {/* Quick stats or badges */}
            <div className='flex flex-wrap gap-4'>
              {['Next.js', 'React Native', 'TypeScript', 'Tailwind CSS'].map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                  className='rounded-lg border px-4 py-2 text-sm font-medium text-slate-300'
                  style={{
                    borderColor: 'rgba(59,130,246,0.3)',
                    background: 'rgba(59,130,246,0.08)'
                  }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Image */}
          <motion.div
            className='lg:col-span-5 relative'
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className='relative'>
              {/* Glow effect */}
              <div
                className='absolute -inset-8 rounded-[3rem] blur-3xl opacity-40'
                style={{
                  background: 'rgba(59,130,246,0.2)'
                }}
              />
              
              {/* Image container */}
              <div className='relative rounded-[2.5rem] border-2 border-blue-500/30 bg-blue-500/5 p-2 backdrop-blur-xl shadow-2xl'>
                <div className='rounded-[2rem] overflow-hidden bg-slate-900/50'>
                  <Image
                    src='/images/logo.png'
                    alt='Mohammad Salah Akram Fuad'
                    width={600}
                    height={600}
                    className='w-full h-auto object-cover'
                    priority
                  />
                </div>
              </div>

              {/* Floating decorative elements */}
              <motion.div
                className='absolute -top-4 -right-4 w-20 h-20 rounded-full border-2 border-blue-400/30'
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                style={{ background: 'rgba(59,130,246,0.1)' }}
              />
              <motion.div
                className='absolute -bottom-4 -left-4 w-16 h-16 rounded-full border-2 border-blue-400/30'
                animate={{
                  y: [0, 10, 0],
                  rotate: [0, -5, 0]
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.5
                }}
                style={{ background: 'rgba(59,130,246,0.1)' }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
