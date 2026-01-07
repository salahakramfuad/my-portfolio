'use client'
import React from 'react'
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaLinkedin,
  FaGithub,
  FaFacebook
} from 'react-icons/fa'


const ContactFooter = () => {
  return (
    <footer
      className='relative py-20 px-6 sm:px-8 overflow-hidden'
      id='contact'
    >
      {/* Background */}
      <div className='absolute inset-0 -z-10'>
        <div
          className='absolute inset-0'
          style={{
            background:
              'radial-gradient(ellipse 80% 50% at 50% 100%, rgba(6,182,212,0.15) 0%, transparent 70%)'
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

      <div className='max-w-7xl mx-auto'>
        {/* Section Header */}
        <div className='text-center mb-16'>
          <h2 className='text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4'>
            Get in <span className='bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent'>Touch</span>
          </h2>
          <p className='text-xl text-slate-400 max-w-2xl mx-auto'>
            Let's collaborate on your next project. I'm always open to new opportunities.
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className='grid md:grid-cols-3 gap-6 mb-12'>
          <a
            href='mailto:salahakramfuad@gmail.com'
            className='group relative rounded-2xl border-2 border-cyan-500/20 p-8 backdrop-blur-xl transition-all hover:border-cyan-400/40 hover:scale-105'
            style={{
              background: 'rgba(6,182,212,0.1)',
              boxShadow: '0 10px 30px rgba(0,0,0,.3)'
            }}
          >
            <div className='text-4xl text-cyan-400 mb-4 group-hover:scale-110 transition-transform'>
              <FaEnvelope />
            </div>
            <h3 className='text-xl font-bold text-white mb-2'>Email</h3>
            <p className='text-slate-300'>salahakramfuad@gmail.com</p>
          </a>

          <a
            href='tel:+8801538380532'
            className='group relative rounded-2xl border-2 border-cyan-500/20 p-8 backdrop-blur-xl transition-all hover:border-cyan-400/40 hover:scale-105'
            style={{
              background: 'rgba(6,182,212,0.1)',
              boxShadow: '0 10px 30px rgba(0,0,0,.3)'
            }}
          >
            <div className='text-4xl text-cyan-400 mb-4 group-hover:scale-110 transition-transform'>
              <FaPhone />
            </div>
            <h3 className='text-xl font-bold text-white mb-2'>Phone</h3>
            <p className='text-slate-300'>(+88) 01538380532</p>
          </a>

          <a
            href='https://www.google.com/maps/search/?q=Dhaka,Bangladesh'
            target='_blank'
            rel='noopener noreferrer'
            className='group relative rounded-2xl border-2 border-cyan-500/20 p-8 backdrop-blur-xl transition-all hover:border-cyan-400/40 hover:scale-105'
            style={{
              background: 'rgba(6,182,212,0.1)',
              boxShadow: '0 10px 30px rgba(0,0,0,.3)'
            }}
          >
            <div className='text-4xl text-cyan-400 mb-4 group-hover:scale-110 transition-transform'>
              <FaMapMarkerAlt />
            </div>
            <h3 className='text-xl font-bold text-white mb-2'>Location</h3>
            <p className='text-slate-300'>Dhaka, Bangladesh</p>
          </a>
        </div>

        {/* Social Links */}
        <div className='flex justify-center gap-6 mb-12'>
          <a
            href='https://linkedin.com/in/salahakramfuad'
            target='_blank'
            rel='noopener noreferrer'
            aria-label='LinkedIn'
            className='group rounded-xl border-2 border-cyan-500/30 p-4 text-2xl text-cyan-400 backdrop-blur-xl transition-all hover:bg-cyan-500/20 hover:border-cyan-400/50 hover:scale-110'
            style={{ background: 'rgba(6,182,212,0.1)' }}
          >
            <FaLinkedin />
          </a>
          <a
            href='https://github.com/salahakramfuad'
            target='_blank'
            rel='noopener noreferrer'
            aria-label='GitHub'
            className='group rounded-xl border-2 border-cyan-500/30 p-4 text-2xl text-cyan-400 backdrop-blur-xl transition-all hover:bg-cyan-500/20 hover:border-cyan-400/50 hover:scale-110'
            style={{ background: 'rgba(6,182,212,0.1)' }}
          >
            <FaGithub />
          </a>
          <a
            href='https://facebook.com/salahakramfuad'
            target='_blank'
            rel='noopener noreferrer'
            aria-label='Facebook'
            className='group rounded-xl border-2 border-cyan-500/30 p-4 text-2xl text-cyan-400 backdrop-blur-xl transition-all hover:bg-cyan-500/20 hover:border-cyan-400/50 hover:scale-110'
            style={{ background: 'rgba(6,182,212,0.1)' }}
          >
            <FaFacebook />
          </a>
        </div>

        {/* Copyright */}
        <div className='text-center pt-8 border-t border-cyan-500/20'>
          <p className='text-slate-400'>
            © 2025 Mohammad Salah Akram Fuad. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default ContactFooter
