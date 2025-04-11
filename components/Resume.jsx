'use client'

import { useState } from 'react'

export default function PDFCard() {
  const [open, setOpen] = useState(false)

  return (
    <div className='py-10 px-4 flex flex-col items-center'>
      {/* Section Title */}
      <h1 className='text-2xl md:text-3xl text-white font-bold mb-6 text-center'>
        📄 Click below to view my resume
      </h1>

      {/* Card */}
      <div
        onClick={() => setOpen(true)}
        className='w-full max-w-sm bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer p-6 text-center hover:scale-[1.02] group'
      >
        <div className='flex flex-col items-center space-y-3'>
          <div className='w-16 h-16 bg-blue-700/20 text-blue-400 rounded-full flex items-center justify-center text-3xl group-hover:rotate-12 transition-transform duration-300'>
            📁
          </div>
          <h2 className='text-xl font-semibold text-white'>Resume (PDF)</h2>
          <p className='text-gray-400 text-sm'>
            Tap to preview and download my resume
          </p>
          <div className='mt-2 text-xs text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
            Click to open preview
          </div>
        </div>
      </div>

      {/* Modal */}
      {open && (
        <div className='fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-50 p-4'>
          <div className='bg-white dark:bg-gray-900 p-6 rounded-xl w-full max-w-5xl max-h-[90vh] relative shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col'>
            {/* Modal Header */}
            <div className='flex justify-between items-center mb-4 pb-2 border-b border-gray-200 dark:border-gray-700'>
              <div>
                <h3 className='text-xl font-bold text-gray-800 dark:text-white'>
                  Resume Preview
                </h3>
                <p className='text-sm text-gray-500 dark:text-gray-400'>
                  View or download my professional resume
                </p>
              </div>
              <div className='flex space-x-3'>
                <a
                  href='/resume/Mohammad Salah Akram Fuad CV.pdf'
                  download
                  className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1'
                >
                  <span>Download</span>
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
                </a>
                <button
                  onClick={() => setOpen(false)}
                  className='p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors'
                  aria-label='Close modal'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-6 w-6'
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
            <div className='flex-1 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800'>
              <iframe
                src='/resume/resume.pdf'
                className='w-full h-full min-h-[500px]'
                title='Resume Preview'
              ></iframe>
            </div>

            {/* Modal Footer */}
            <div className='mt-4 pt-3 border-t border-gray-200 dark:border-gray-700 flex justify-end'>
              <button
                onClick={() => setOpen(false)}
                className='px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-lg transition-colors text-sm font-medium'
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
