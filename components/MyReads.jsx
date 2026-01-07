'use client'
import React from 'react'
import {
  BookOpen,
  Camera,
  Table,
  Goal,
  Badge as BadmintonIcon,
  Languages as LanguagesIcon
} from 'lucide-react'

/** ---------- Data ---------- */
const books = [
  {
    id: 1,
    title: 'Atomic Habits',
    author: 'James Clear',
    image: 'https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg',
    review: 'A great book on how small habits can lead to big changes.'
  },
  {
    id: 2,
    title: 'The Da Vinci Code',
    author: 'Dan Brown',
    image: 'https://covers.openlibrary.org/b/isbn/9780307474278-L.jpg',
    review: 'A thrilling mix of mystery, history, and conspiracy.'
  },
  {
    id: 3,
    title: 'Angels & Demons',
    author: 'Dan Brown',
    image: 'https://covers.openlibrary.org/b/isbn/9781416524793-L.jpg',
    review: 'A fast-paced adventure uncovering secrets of the Vatican.'
  },
  {
    id: 4,
    title: 'Inferno',
    author: 'Dan Brown',
    image: 'https://covers.openlibrary.org/b/isbn/9780804172264-L.jpg',
    review: 'A gripping story inspired by Dante’s Inferno.'
  },
  {
    id: 5,
    title: 'The Lost Symbol',
    author: 'Dan Brown',
    image: 'https://covers.openlibrary.org/b/isbn/9780385537858-L.jpg',
    review: 'An intense journey into the world of Freemasonry.'
  },
  {
    id: 6,
    title: 'Origin',
    author: 'Dan Brown',
    image: 'https://covers.openlibrary.org/b/isbn/9780385514231-L.jpg',
    review: 'Explores the intersection of science and religion.'
  },
  {
    id: 7,
    title: 'The Godfather',
    author: 'Mario Puzo',
    image: 'https://covers.openlibrary.org/b/isbn/9780451205766-L.jpg',
    review: 'A legendary crime novel about power, honor, and family.'
  },
  {
    id: 8,
    title: 'Harry Potter and the Sorcerer’s Stone',
    author: 'J.K. Rowling',
    image: 'https://covers.openlibrary.org/b/isbn/9780590353427-L.jpg',
    review: 'The magical beginning of an unforgettable journey.'
  },
  {
    id: 9,
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling',
    image: 'https://covers.openlibrary.org/b/isbn/9780439064873-L.jpg',
    review: 'A thrilling sequel filled with secrets and danger.'
  },
  {
    id: 10,
    title: 'Harry Potter and the Prisoner of Azkaban',
    author: 'J.K. Rowling',
    image: 'https://covers.openlibrary.org/b/isbn/9780439136365-L.jpg',
    review: 'The darkest and most intriguing twist in the series.'
  },
  {
    id: 11,
    title: 'Harry Potter and the Goblet of Fire',
    author: 'J.K. Rowling',
    image: 'https://covers.openlibrary.org/b/isbn/9780439139595-L.jpg',
    review: 'A tournament, a mystery, and a shocking revelation.'
  },
  {
    id: 12,
    title: 'Harry Potter and the Order of the Phoenix',
    author: 'J.K. Rowling',
    image: 'https://covers.openlibrary.org/b/isbn/9780439358071-L.jpg',
    review: 'The rise of rebellion and the fight against darkness.'
  },
  {
    id: 13,
    title: 'Harry Potter and the Half-Blood Prince',
    author: 'J.K. Rowling',
    image: 'https://covers.openlibrary.org/b/isbn/9780439785969-L.jpg',
    review: 'The story takes a dramatic and emotional turn.'
  },
  {
    id: 14,
    title: 'Harry Potter and the Deathly Hallows',
    author: 'J.K. Rowling',
    image: 'https://covers.openlibrary.org/b/isbn/9780545010221-L.jpg',
    review: 'An epic conclusion to the magical saga.'
  }
]

const hobbies = [
  { name: 'Photography', icon: <Camera className='h-4 w-4' /> },
  { name: 'Reading', icon: <BookOpen className='h-4 w-4' /> },
  { name: 'Badminton', icon: <BadmintonIcon className='h-4 w-4' /> },
  { name: 'Table Tennis', icon: <Table className='h-4 w-4' /> },
  { name: 'Cricket', icon: <Goal className='h-4 w-4' /> }
]

const languages = ['English', 'Bangla', 'Turkish']

const placeholder = 'https://via.placeholder.com/300x420?text=No+Cover'
const cx = (...c) => c.filter(Boolean).join(' ')

/** ---------- Component ---------- */
export default function MyReads() {
  return (
    <section className='min-h-screen w-full mv-scope relative'>
      {/* Scoped theme variables (Simple Blue) */}
      <style jsx>{`
        .mv-scope {
          --primary: #3b82f6;
          --accent: #3b82f6;
          --secondary: #3b82f6;
          --surface: rgba(59, 130, 246, 0.05);
          --border: rgba(59, 130, 246, 0.2);
          --ink: rgba(255, 255, 255, 0.18);
          --text: #f8fafc;
        }
        :global(.light) .mv-scope {
          --text: #0e172a;
          --surface: rgba(6, 182, 212, 0.05);
          --border: rgba(6, 182, 212, 0.15);
          --ink: rgba(0, 0, 0, 0.14);
        }
      `}</style>

      {/* Background grid */}
      <div
        className='pointer-events-none absolute inset-0 -z-10 opacity-[0.06]'
        style={{
          backgroundImage: `linear-gradient(to right, var(--ink) 1px, transparent 1px),
             linear-gradient(to bottom, var(--ink) 1px, transparent 1px)`,
          backgroundSize: '34px 34px',
          maskImage: 'radial-gradient(70% 60% at 50% 40%, black, transparent)',
          WebkitMaskImage:
            'radial-gradient(70% 60% at 50% 40%, black, transparent)'
        }}
      />

      <div className='mx-auto max-w-7xl px-6 py-20 sm:px-8'>
        {/* Section Header */}
        <header className='mb-16 text-center'>
          <h2 className='text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4'>
            My <span className='text-blue-400'>Reads</span>
          </h2>
          <p className='text-xl text-slate-400 max-w-2xl mx-auto'>
            A curated selection of books I've enjoyed recently—hover for a quick note.
          </p>
        </header>

        {/* Books grid */}
        <div
          className={cx(
            'grid gap-6',
            'grid-cols-[repeat(auto-fit,minmax(160px,1fr))]'
          )}
        >
          {books.map((b) => (
            <article
              key={b.id}
              className='group relative overflow-hidden rounded-2xl border border-blue-500/20 shadow-xl transition-all hover:-translate-y-2 hover:shadow-2xl hover:border-blue-400/40'
              style={{
                background: 'var(--surface)',
                boxShadow: '0 10px 30px rgba(0,0,0,.3)'
              }}
              aria-label={`${b.title} by ${b.author}`}
            >
              {/* Cover (3:4) */}
              <div
                className='relative w-full overflow-hidden rounded-t-2xl bg-slate-900'
                style={{ aspectRatio: '3 / 4' }}
              >
                <img
                  src={b.image}
                  alt={`${b.title} — cover`}
                  loading='lazy'
                  onError={(e) => {
                    e.currentTarget.src = placeholder
                  }}
                  className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]'
                />
                <div className='pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent opacity-80' />
                <div className='absolute inset-x-0 bottom-0 translate-y-2 px-3 pb-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100'>
                  <p className='text-xs leading-snug text-slate-200'>
                    {b.review}
                  </p>
                </div>
              </div>

              {/* Meta */}
              <div className='p-3'>
                <h3
                  className='line-clamp-2 text-sm font-semibold'
                  style={{ color: 'var(--text)' }}
                >
                  {b.title}
                </h3>
                <p className='mt-1 text-xs text-slate-400'>by {b.author}</p>
              </div>

              {/* Simple glow on hover */}
              <span
                aria-hidden
                className='pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100'
                style={{
                  background: `linear-gradient(135deg, var(--primary)3d, var(--accent)38)`
                }}
              />
            </article>
          ))}
        </div>

        {/* Hobbies & Languages */}
        <div className='mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2'>
          {/* Hobbies */}
          <section
            className='rounded-3xl border border-blue-500/20 p-8 shadow-xl backdrop-blur-xl'
            aria-labelledby='hobbies-heading'
            style={{
              background: 'var(--surface)',
              boxShadow: '0 20px 40px rgba(0,0,0,.3)'
            }}
          >
            <div className='mb-4 flex items-center gap-2'>
              <span
                className='inline-flex h-7 w-7 items-center justify-center rounded-full'
                style={{
                  background:
                    'color-mix(in oklab, var(--primary) 15%, transparent)',
                  color: 'var(--accent)'
                }}
              >
                <Camera className='h-4 w-4' aria-hidden />
              </span>
              <h3
                id='hobbies-heading'
                className='text-xl font-semibold'
                style={{ color: 'var(--text)' }}
              >
                Hobbies
              </h3>
            </div>

            <div className='flex flex-wrap gap-3'>
              {hobbies.map((h, i) => (
                <span
                  key={`${h.name}-${i}`}
                  className='inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium shadow-sm backdrop-blur-md transition-colors hover:bg-white/10'
                  style={{
                    border: `1px solid var(--border)`,
                    background: 'var(--surface)',
                    color: 'var(--text)'
                  }}
                >
                  <span className='text-slate-200'>{h.icon}</span>
                  {h.name}
                </span>
              ))}
            </div>
          </section>

          {/* Languages */}
          <section
            className='rounded-3xl border border-blue-500/20 p-8 shadow-xl backdrop-blur-xl'
            aria-labelledby='languages-heading'
            style={{
              background: 'var(--surface)',
              boxShadow: '0 20px 40px rgba(0,0,0,.3)'
            }}
          >
            <div className='mb-4 flex items-center gap-2'>
              <span
                className='inline-flex h-7 w-7 items-center justify-center rounded-full'
                style={{
                  background:
                    'color-mix(in oklab, var(--primary) 15%, transparent)',
                  color: 'var(--accent)'
                }}
              >
                <LanguagesIcon className='h-4 w-4' aria-hidden />
              </span>
              <h3
                id='languages-heading'
                className='text-xl font-semibold'
                style={{ color: 'var(--text)' }}
              >
                Languages I Know
              </h3>
            </div>

            <div className='flex flex-wrap gap-3'>
              {languages.map((lang) => (
                <span
                  key={lang}
                  className='rounded-full px-3 py-2 text-sm font-medium shadow-sm backdrop-blur-md transition-colors hover:bg-white/10'
                  style={{
                    border: `1px solid var(--border)`,
                    background: 'var(--surface)',
                    color: 'var(--text)'
                  }}
                >
                  {lang}
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>
    </section>
  )
}
