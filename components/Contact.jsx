'use client'
import React from 'react'
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaLinkedin,
  FaGithub,
  FaTwitter
} from 'react-icons/fa'

// Contact Info Card
const ContactCard = ({ icon, title, content, link }) => (
  <a
    href={link}
    target='_blank'
    rel='noopener noreferrer'
    className='flex items-center space-x-3 text-slate-400 hover:text-[#625ffb] transition-colors'
  >
    <div className='text-lg text-[#625ffb]'>{icon}</div>
    <p className='text-sm'>{content}</p>
  </a>
)

// Social Media Links
const SocialLinks = () => (
  <div className='flex justify-center space-x-4 mt-6'>
    <a
      href='https://linkedin.com/in/salahakramfuad'
      target='_blank'
      rel='noopener noreferrer'
      aria-label='LinkedIn'
      className='text-xl text-slate-400 hover:text-[#625ffb] transition-colors'
    >
      <FaLinkedin />
    </a>
    <a
      href='https://github.com/salahakramfuad'
      target='_blank'
      rel='noopener noreferrer'
      aria-label='GitHub'
      className='text-xl text-slate-400 hover:text-[#625ffb] transition-colors'
    >
      <FaGithub />
    </a>
    <a
      href='https://twitter.com/yourusername'
      target='_blank'
      rel='noopener noreferrer'
      aria-label='Twitter'
      className='text-xl text-slate-400 hover:text-[#625ffb] transition-colors'
    >
      <FaTwitter />
    </a>
  </div>
)

const ContactFooter = () => {
  return (
    <footer
      className='bg-slate-900 py-12 px-4 bg-cover bg-center'
      style={{ backgroundImage: 'url(/images/footer.svg)' }}
      id='contact'
    >
      <div className='max-w-3xl mx-auto text-center space-y-8'>
        {/* Heading */}
        <h2 className='text-2xl font-bold text-slate-200 mb-4 font-[Calistoga]'>
          Get in Touch
        </h2>

        {/* Contact Cards */}
        <div className='flex flex-col sm:flex-row justify-center items-center sm:items-start gap-6 text-center'>
          <ContactCard
            icon={<FaEnvelope />}
            title='Email'
            content='salahakramfuad@gmail.com'
            link='mailto:salahakramfuad@gmail.com'
          />
          <ContactCard
            icon={<FaPhone />}
            title='Phone'
            content='(+88) 01538380532'
            link='tel:+8801538380532'
          />
          <ContactCard
            icon={<FaMapMarkerAlt />}
            title='Location'
            content='Dhaka, Bangladesh'
            link='https://www.google.com/maps/search/?q=Dhaka,Bangladesh'
          />
        </div>

        {/* Social Links */}
        <SocialLinks />

        {/* Copyright */}
        <p className='text-sm text-slate-500 mt-8'>
          © {new Date().getFullYear()} Salah Akram Fuad. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default ContactFooter
