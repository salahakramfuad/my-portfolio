'use client'
import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

// Sample projects data with images
const projects = [
  {
    title: 'AI Startup Landing Page',
    description: 'A sleek, modern AI-based startup landing page.',
    image: '/images/ai-startup-landing-page.png',
    link: '#',
    year: '2025'
  },
  {
    title: 'Dark SaaS Landing Page',
    description: 'A professional and elegant dark-themed SaaS landing page.',
    image: '/images/dark-saas-landing-page.png',
    link: '#',
    year: '2025'
  },
  {
    title: 'Creative Portfolio',
    description: 'A minimal and aesthetic portfolio website.',
    image: '/images/creative-portfolio.png',
    link: '#',
    year: '2025'
  }
]

// Framer Motion Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2
    }
  }
}

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
}

const Projects = () => {
  return (
    <div id='projects' className='container mx-auto px-6 py-16'>
      {/* Heading */}
      <motion.h1
        className='text-5xl font-bold font-[Calistoga] mb-6 text-center text-white'
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Featured Projects
      </motion.h1>

      {/* Subtext */}
      <motion.p
        className='text-lg text-gray-300 text-center max-w-2xl mx-auto mb-12 leading-relaxed'
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Explore my collection of beautifully designed and highly functional web
        projects.
      </motion.p>

      {/* Projects Grid */}
      <motion.div
        className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'
        variants={containerVariants}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.2 }}
      >
        {projects.map((project, index) => (
          <motion.a
            key={index}
            href={project.link}
            className='group block bg-slate-800 text-white shadow-xl rounded-lg overflow-hidden border border-slate-700 transition-all relative'
            variants={cardVariants}
            whileHover={{ scale: 1.05 }}
          >
            {/* Project Image */}
            <div className='relative h-60 md:h-72 w-full overflow-hidden'>
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                style={{ objectFit: 'cover' }}
                priority={index === 0}
                className='group-hover:scale-110 transition-transform duration-500'
              />
              {/* Dark Overlay */}
              <div className='absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center'>
                <span className='text-white text-xl font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-500'>
                  View Project →
                </span>
              </div>
            </div>

            {/* Project Details */}
            <div className='p-6 transition-all group-hover:bg-slate-700'>
              <h2 className='text-2xl font-semibold mb-2'>{project.title}</h2>
              <p className='text-gray-400 text-lg leading-relaxed'>
                {project.description}
              </p>
            </div>
          </motion.a>
        ))}
      </motion.div>
    </div>
  )
}

export default Projects
