'use client'

import { useState } from 'react'

export default function PDFCard() {
  const [open, setOpen] = useState(false)

  return (
    <div className='py-12 px-4 flex flex-col items-center'>
      {/* Section Title */}
      <h1 className='text-2xl md:text-3xl font-bold text-white mb-8 text-center max-w-2xl'>
        📄 View or download my professional resume
      </h1>

      {/* Card */}
      <div
        onClick={() => setOpen(true)}
        className='w-full max-w-md bg-gradient-to-br from-gray-800/70 to-gray-900/90 backdrop-blur-sm border border-gray-700/50 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer p-6 text-center group hover:scale-[1.015] overflow-hidden'
      >
        <div className='flex flex-col items-center space-y-4'>
          <div className='relative'>
            <div className='w-16 h-16 bg-blue-600/10 text-blue-400 rounded-full flex items-center justify-center text-2xl transition-all duration-300 group-hover:rotate-12'>
              📄
            </div>
            <div className='absolute inset-0 rounded-full bg-blue-500/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
          </div>
          <h2 className='text-xl font-semibold text-white'>
            Professional Resume
          </h2>
          <p className='text-gray-400 text-sm max-w-xs'>
            Click to preview and download my latest CV
          </p>
        </div>
      </div>

      {/* Modal */}
      {open && (
        <div
          className='fixed inset-0 bg-black/70 backdrop-blur-md flex justify-center items-center z-50 p-4'
          onClick={() => setOpen(false)}
        >
          <div
            className='bg-white dark:bg-gray-900 rounded-xl w-full max-w-4xl max-h-[90vh] relative shadow-2xl border border-gray-200/20 dark:border-gray-700/60 flex flex-col overflow-hidden'
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 pb-4 border-b border-gray-200/20 dark:border-gray-700/60'>
              <div>
                <h3 className='text-lg font-bold text-gray-800 dark:text-white'>
                  Resume Preview
                </h3>
                <p className='text-xs text-gray-500 dark:text-gray-400 mt-1'>
                  Interactive PDF preview • Updated October 2025
                </p>
              </div>
              <div className='flex items-center space-x-3'>
                <a
                  href='/resume/Mohammad Salah Akram Fuad CV.pdf'
                  download
                  className='inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm hover:shadow-md'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-4 w-4'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4'
                    />
                  </svg>
                  <span>Download PDF</span>
                </a>
                <button
                  onClick={() => setOpen(false)}
                  className='p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors'
                  aria-label='Close preview'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M6 18L18 6M6 6l12 12'
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* PDF Viewer */}
            <div className='flex-1 min-h-[500px] bg-gray-50 dark:bg-gray-800/50 rounded-b-lg overflow-hidden'>
              <iframe
                src='/resume/resume.pdf'
                className='w-full h-full'
                title='Resume Preview'
                loading='lazy'
              />
            </div>

            {/* Modal Footer */}
            <div className='p-4 pt-3 flex justify-end border-t border-gray-200/20 dark:border-gray-700/60'>
              <button
                onClick={() => setOpen(false)}
                className='px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg transition-colors text-sm font-medium'
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
