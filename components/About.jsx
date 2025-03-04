'use client'
import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

// Framer Motion Variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

const About = () => {
  return (
    <div className='container mx-auto px-6 py-16 text-white'>
      <motion.h1
        className='text-4xl font-bold text-center mb-6 font-[Calistoga]'
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true }}
        variants={fadeIn}
      >
        About Me
      </motion.h1>
      <motion.p
        className='text-center text-gray-300 max-w-2xl mx-auto mb-12'
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true }}
        variants={fadeIn}
      >
        Passionate Frontend Developer crafting seamless user experiences with
        modern technologies.
      </motion.p>
      <div className='flex flex-col md:flex-row gap-12 items-center backdrop-blur-md p-8 rounded-xl shadow-2xl'>
        {/* Image Section */}
        <motion.div
          className='relative w-full h-96 md:h-[500px] flex items-center justify-center overflow-hidden rounded-xl shadow-lg group'
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <Image
            src='/images/Fuad.png' // Updated profile picture
            alt='Profile Picture - Fuad'
            width={400} // Larger width
            height={400} // Larger height
            className='object-cover rounded-full border-4 border-blue-500 transition-transform duration-500 group-hover:scale-105'
          />
        </motion.div>

        {/* Bio Section */}
        <motion.div
          className='space-y-6 text-center md:text-left'
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h2 className='text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent'>
            Hi, I'm Salah Akram Fuad 👋
          </h2>
          <p className='text-gray-300 text-lg'>
            I'm a passionate frontend developer with a love for building sleek,
            responsive, and high-performance web applications. I specialize in
            modern web technologies like React, Next.js, and Tailwind CSS.
          </p>
          <p className='text-gray-300 text-lg'>
            My journey started with a curiosity for coding, and today, I bring
            ideas to life through engaging digital experiences.
          </p>
          <a
            href='#contact'
            className='inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
            aria-label='Contact Fuad'
          >
            Let's Connect →
          </a>
        </motion.div>
      </div>
      {/* Skills Section */}
      <motion.div
        className='mt-16'
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <h2 className='text-3xl font-semibold text-center mb-6'>My Skills</h2>
        <div className='flex flex-wrap justify-center gap-4'>
          {[
            'HTML',
            'CSS',
            'JavaScript',
            'React',
            'Next.js',
            'Tailwind CSS',
            'Framer Motion',
            'Git',
            'Responsive Design'
          ].map((skill, index) => (
            <motion.span
              key={index}
              className='bg-slate-800 px-4 py-2 rounded-md text-sm font-medium text-white border border-slate-700 cursor-pointer'
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Skill: ${skill}`}
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </motion.div>
      {/* Fun Facts Section */}
      <motion.div
        className='mt-16 text-center'
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <h2 className='text-3xl font-semibold mb-6'>Fun Facts About Me</h2>
        <p className='text-gray-300 max-w-xl mx-auto space-y-2'>
          <span>🚀 I started coding at 16!</span>
          <br />
          <span>🎨 I love designing smooth and interactive UI/UX.</span>
          <br />
          <span>☕ Fuelled by coffee and late-night coding sessions.</span>
        </p>
      </motion.div>
    </div>
  )
}

export default About
