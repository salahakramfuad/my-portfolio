'use client'

import { useMemo, useState } from 'react'

const THEME = {
  primary: '#6D28D9',
  accent: '#8B5CF6'
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
    <section className='w-full px-4 py-12'>
      <div className='mx-auto max-w-7xl'>
        {/* Title */}
        <header className='mb-4 text-center'>
          <h2 className='text-2xl md:text-3xl font-bold text-white'>
            📄 Resume — Mohammad Salah Akram Fuad
          </h2>
          <p className='mt-1 text-sm text-slate-300'>
            Inline preview with quick controls. Works even if iframes are
            blocked (fallback links below).
          </p>
        </header>

        {/* Toolbar */}
        <div
          className='mb-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border px-3 py-2'
          style={{
            borderColor: 'rgba(255,255,255,.12)',
            background: 'rgba(255,255,255,.05)',
            boxShadow: '0 8px 24px rgba(0,0,0,.26)',
            backdropFilter: 'blur(6px)'
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
                    className='rounded-full px-3 py-1 text-xs font-medium outline-none focus-visible:ring-2'
                    style={{
                      color: active ? 'white' : 'rgba(241,245,249,.9)',
                      background: active
                        ? `linear-gradient(90deg, ${THEME.primary}, ${THEME.accent})`
                        : 'rgba(255,255,255,.06)',
                      boxShadow: active
                        ? '0 8px 20px rgba(139,92,246,.35)'
                        : 'inset 0 0 0 1px rgba(255,255,255,.08)'
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
              className='rounded-full px-4 py-2 text-xs font-medium text-white outline-none focus-visible:ring-2'
              style={{
                background: `linear-gradient(90deg, ${THEME.primary}, ${THEME.accent})`,
                boxShadow: '0 8px 24px rgba(139,92,246,.35)'
              }}
            >
              Open in new tab
            </a>
            <a
              href={pdfHref}
              download={downloadName}
              className='rounded-full border px-4 py-2 text-xs font-medium text-slate-100 outline-none focus-visible:ring-2 hover:bg-white/10'
              style={{
                borderColor: 'rgba(255,255,255,.15)',
                background: 'rgba(255,255,255,.06)'
              }}
            >
              Download PDF
            </a>
          </div>
        </div>

        {/* INLINE VIEWER (object with fallback) */}
        <div
          className='overflow-hidden rounded-2xl border'
          style={{
            borderColor: 'rgba(255,255,255,.12)',
            boxShadow: '0 16px 40px rgba(0,0,0,.32)'
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
                  className='rounded-full px-4 py-2 text-sm font-medium text-white'
                  style={{
                    background: `linear-gradient(90deg, ${THEME.primary}, ${THEME.accent})`,
                    boxShadow: '0 8px 24px rgba(139,92,246,.35)'
                  }}
                >
                  Open in new tab
                </a>
                <a
                  href={pdfHref}
                  download={downloadName}
                  className='rounded-full border px-4 py-2 text-sm font-medium text-slate-100 hover:bg-white/10'
                  style={{
                    borderColor: 'rgba(255,255,255,.15)',
                    background: 'rgba(255,255,255,.06)'
                  }}
                >
                  Download PDF
                </a>
              </div>
            </div>
          </object>
        </div>

        {/* Tiny helper line */}
        <p className='mt-3 text-center text-xs text-slate-400'>
          If pages look too small/large, use the Zoom buttons above (Fit / 100 /
          125 / 150).
        </p>
      </div>
    </section>
  )
}
