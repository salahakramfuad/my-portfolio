'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'

export const Hero = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2 // Stagger children animations
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  }

  const floatVariants = {
    float: {
      y: [0, -10, 0], // Floating animation
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  }

  return (
    <div
      className='min-h-screen flex flex-col justify-center items-center py-20 relative font-sans'
      id='hero'
    >
      {/* Background Image */}
      <div
        className='absolute inset-0 bg-cover bg-center opacity-20 top-5'
        style={{ backgroundImage: 'url(/images/rose.svg)' }}
      ></div>

      <motion.div
        className='container mx-auto px-4 flex flex-col items-center text-center relative z-10'
        variants={containerVariants}
        initial='hidden'
        animate='visible'
      >
        {/* Memoji Image with Floating Animation */}
        <motion.div
          className='w-32 h-32 sm:w-48 sm:h-48 mb-8'
          variants={floatVariants}
          animate='float'
        >
          <Image
            src='/images/logo.png'
            alt='My picture'
            className='rounded-full shadow-lg'
            width={300}
            height={300}
          />
        </motion.div>

        {/* Availability Text */}
        <motion.div
          className='text-xs sm:text-sm bg-slate-800 px-4 text-blue-400 border border-slate-700 py-2 rounded-md mb-4'
          variants={itemVariants}
        >
          <span className='inline-block w-2 h-2 bg-blue-500 rounded-full mr-2'></span>
          Available for new projects
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          className='text-3xl font-[Calistoga] sm:text-5xl font-bold text-white mb-6 tracking-tight' // ✅ Fixed
          variants={itemVariants}
        >
          Building exceptional user experiences
        </motion.h1>

        {/* Description */}
        <motion.p
          className='text-base sm:text-lg text-slate-400 max-w-2xl mb-8'
          variants={itemVariants}
        >
          Specialize in transforming designs into functional, high-performing
          web applications. Let&apos;s discuss your next project.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className='flex flex-col sm:flex-row gap-4'
          variants={itemVariants}
        >
          <a href='#projects'>
            <motion.button
              className='inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-all cursor-pointer'
              whileHover={{ scale: 1.05 }} // Scale up on hover
              whileTap={{ scale: 0.95 }} // Scale down on tap
              aria-label='Explore my work'
            >
              <span className='mr-2'>Explore my work ↓</span>
            </motion.button>
          </a>
          <a href='#contact'>
            <motion.button
              className='inline-flex bg-transparent border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-full hover:bg-blue-600 hover:text-white transition-all cursor-pointer'
              whileHover={{ scale: 1.05 }} // Scale up on hover
              whileTap={{ scale: 0.95 }} // Scale down on tap
              aria-label="Let's Connect"
            >
              Let&apos;s Connect
            </motion.button>
          </a>
        </motion.div>
      </motion.div>
    </div>
  )
}
