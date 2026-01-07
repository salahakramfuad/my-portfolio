'use client'

import { useMemo, useState } from 'react'

const THEME = {
  primary: '#3b82f6',
  accent: '#3b82f6',
  secondary: '#3b82f6'
}

export default function PDFCard() {
  // Path without spaces; place in /public/resume/resume.pdf
  const pdfHref = '/resume/resume.pdf'
  const downloadName = 'Mohammad_Salah_Akram_Fuad_CV.pdf'

  // Simple zoom presets; we just change the hash param and let the browser viewer handle it
  const [zoom, setZoom] = useState('page-fit') // 'page-fit' | '100' | '125' | '150' etc.
  const src = useMemo(
    () => `${pdfHref}#zoom=${zoom}&view=FitH`,
    [pdfHref, zoom]
  )

  return (
    <section id='resume' className='relative w-full px-6 py-20 sm:px-8'>
      {/* Background */}
      <div className='pointer-events-none absolute inset-0 -z-10'>
        <div
          className='absolute inset-0'
          style={{
            background:
              'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(6,182,212,0.1) 0%, transparent 70%)'
          }}
        />
      </div>

      <div className='mx-auto max-w-7xl'>
        {/* Section Header */}
        <div className='text-center mb-12'>
          <h2 className='text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4'>
            My <span className='text-blue-400'>Resume</span>
          </h2>
          <p className='text-xl text-slate-400 max-w-2xl mx-auto'>
            Download or view my resume for detailed information about my experience and skills
          </p>
        </div>

        {/* Toolbar */}
        <div
          className='mb-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-blue-500/20 px-6 py-4 backdrop-blur-xl'
          style={{
            background: 'rgba(59,130,246,0.05)',
            boxShadow: '0 10px 30px rgba(0,0,0,.3)'
          }}
        >
          {/* Left: Zoom */}
          <div className='flex items-center gap-2'>
            <span className='text-xs text-slate-300'>Zoom</span>
            <div className='flex items-center gap-1'>
              {[
                { label: 'Fit', val: 'page-fit' },
                { label: '100%', val: '100' },
                { label: '125%', val: '125' },
                { label: '150%', val: '150' }
              ].map(({ label, val }) => {
                const active = zoom === val
                return (
                  <button
                    key={val}
                    onClick={() => setZoom(val)}
                    className='rounded-lg px-4 py-2 text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-blue-400/70 transition-all'
                    style={{
                      color: active ? 'white' : 'rgba(241,245,249,.9)',
                      background: active
                        ? THEME.primary
                        : 'rgba(59,130,246,0.1)',
                      border: active ? 'none' : '1px solid rgba(59,130,246,0.3)',
                      boxShadow: active
                        ? '0 4px 12px rgba(59,130,246,.3)'
                        : 'none'
                    }}
                  >
                    {label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Right: Actions */}
          <div className='flex items-center gap-2'>
            <a
              href={pdfHref}
              target='_blank'
              rel='noopener noreferrer'
              className='rounded-lg px-6 py-2.5 text-sm font-semibold text-white outline-none focus-visible:ring-2 focus-visible:ring-blue-400/70 transition-all hover:scale-105'
              style={{
                background: THEME.primary,
                boxShadow: '0 4px 12px rgba(59,130,246,.3)'
              }}
            >
              Open in New Tab
            </a>
            <a
              href={pdfHref}
              download={downloadName}
              className='rounded-lg border-2 px-6 py-2.5 text-sm font-semibold text-slate-100 outline-none focus-visible:ring-2 focus-visible:ring-blue-400/70 transition-all hover:bg-blue-500/10 hover:border-blue-400/40'
              style={{
                borderColor: 'rgba(59,130,246,0.4)',
                background: 'rgba(59,130,246,0.05)'
              }}
            >
              Download PDF
            </a>
          </div>
        </div>

        {/* INLINE VIEWER (object with fallback) */}
        <div
          className='overflow-hidden rounded-3xl border border-blue-500/30 shadow-2xl'
          style={{
            background: 'rgba(6,182,212,0.05)',
            boxShadow: '0 20px 60px rgba(0,0,0,.4)'
          }}
        >
          {/* Prefer <object> for better native PDF support + built-in controls */}
          <object
            data={src}
            type='application/pdf'
            className='h-[70vh] w-full bg-slate-900'
            aria-label='Resume PDF preview'
          >
            {/* Fallback content if PDF viewer is blocked */}
            <div className='flex h-[70vh] w-full flex-col items-center justify-center gap-3 bg-slate-900 p-6 text-center'>
              <p className='text-slate-200'>
                Your browser blocked the embedded PDF. You can still open or
                download it:
              </p>
              <div className='flex flex-wrap items-center justify-center gap-2'>
                <a
                  href={pdfHref}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='rounded-lg px-6 py-2.5 text-sm font-semibold text-white transition-all hover:scale-105'
                  style={{
                    background: `linear-gradient(135deg, ${THEME.primary}, ${THEME.accent})`,
                    boxShadow: '0 8px 24px rgba(6,182,212,.4)'
                  }}
                >
                  Open in New Tab
                </a>
                <a
                  href={pdfHref}
                  download={downloadName}
                  className='rounded-lg border-2 px-6 py-2.5 text-sm font-semibold text-slate-100 transition-all hover:bg-blue-500/10 hover:border-blue-400/40'
                  style={{
                    borderColor: 'rgba(59,130,246,0.4)',
                    background: 'rgba(59,130,246,0.05)'
                  }}
                >
                  Download PDF
                </a>
              </div>
            </div>
          </object>
        </div>

        {/* Helper text */}
        <p className='mt-6 text-center text-sm text-slate-400'>
          Use the zoom controls above to adjust the view. For the best experience, download or open in a new tab.
        </p>
      </div>
    </section>
  )
}
