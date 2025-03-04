'use client'
import React, { useState, useEffect } from 'react'

export const Header = () => {
  const [visible, setVisible] = useState(true)
  let lastScrollY = -1

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setVisible(false) // Hide navbar when scrolling down
      } else {
        setVisible(true) // Show navbar when scrolling up
      }
      lastScrollY = window.scrollY
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className={`flex justify-center items-center top-3 z-20 sticky transition-transform duration-300 ${
        visible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <nav className='flex gap-1 p-0.5 border border-white/15 rounded-full bg-white/10 backdrop-blur'>
        <a href='#hero' className='nav-item'>
          Home
        </a>
        <a href='#projects' className='nav-item'>
          Projects
        </a>
        <a href='#about' className='nav-item'>
          About
        </a>
        <a
          href='#contact'
          className='nav-item bg-white text-gray-900 hover:text-gray-900 hover:bg-white/75'
        >
          Contact
        </a>
      </nav>
    </div>
  )
}
