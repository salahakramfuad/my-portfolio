'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Github, Linkedin } from 'lucide-react'

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

const Contact = () => {
  return (
    <div className='container mx-auto px-6 py-16 text-white'>
      {/* Heading */}
      <motion.h1
        className='text-4xl font-bold text-center mb-6 text-indigo-400'
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true }}
        variants={fadeIn}
      >
        Get In Touch
      </motion.h1>
      <p className='text-center text-gray-300 max-w-2xl mx-auto mb-12'>
        Have a question or want to work together? Feel free to reach out!
      </p>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-center'>
        {/* Contact Info */}
        <motion.div
          className='space-y-6'
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
          variants={fadeIn}
        >
          {/* Email */}
          <div className='flex items-center gap-4 bg-slate-800 p-4 rounded-lg shadow-lg'>
            <Mail className='text-indigo-400' size={24} />
            <span className='text-gray-300'>fuad@example.com</span>
          </div>

          {/* Phone */}
          <div className='flex items-center gap-4 bg-slate-800 p-4 rounded-lg shadow-lg'>
            <Phone className='text-indigo-400' size={24} />
            <span className='text-gray-300'>+123 456 7890</span>
          </div>

          {/* Location */}
          <div className='flex items-center gap-4 bg-slate-800 p-4 rounded-lg shadow-lg'>
            <MapPin className='text-indigo-400' size={24} />
            <span className='text-gray-300'>Dhaka, Bangladesh</span>
          </div>

          {/* Social Links */}
          <div className='flex gap-6 mt-4'>
            <a
              href='https://github.com/yourgithub'
              target='_blank'
              rel='noopener noreferrer'
              className='text-indigo-400 hover:text-indigo-300 transition'
            >
              <Github size={28} />
            </a>
            <a
              href='https://linkedin.com/in/yourlinkedin'
              target='_blank'
              rel='noopener noreferrer'
              className='text-indigo-400 hover:text-indigo-300 transition'
            >
              <Linkedin size={28} />
            </a>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.form
          className='bg-slate-800 p-6 rounded-lg shadow-lg space-y-4'
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <label className='block'>
            <span className='text-gray-300'>Your Name</span>
            <input
              type='text'
              className='w-full mt-2 p-3 rounded-lg bg-slate-900 border border-gray-700 focus:border-indigo-500 focus:ring focus:ring-indigo-500/30 text-white'
              placeholder='Enter your name'
            />
          </label>

          <label className='block'>
            <span className='text-gray-300'>Your Email</span>
            <input
              type='email'
              className='w-full mt-2 p-3 rounded-lg bg-slate-900 border border-gray-700 focus:border-indigo-500 focus:ring focus:ring-indigo-500/30 text-white'
              placeholder='Enter your email'
            />
          </label>

          <label className='block'>
            <span className='text-gray-300'>Message</span>
            <textarea
              rows='4'
              className='w-full mt-2 p-3 rounded-lg bg-slate-900 border border-gray-700 focus:border-indigo-500 focus:ring focus:ring-indigo-500/30 text-white'
              placeholder='Write your message...'
            ></textarea>
          </label>

          <button
            type='submit'
            className='w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-lg'
          >
            Send Message
          </button>
        </motion.form>
      </div>
    </div>
  )
}

export default Contact
