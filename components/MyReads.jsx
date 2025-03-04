'use client'
import React from 'react'

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

const MyReads = () => {
  return (
    <div className='min-h-screen  py-10 px-4'>
      <h2 className='text-center font-[Calistoga] text-2xl font-semibold text-slate-200 mb-6'>
        My Reads
      </h2>
      <div className='flex flex-wrap justify-center gap-4 mb-0.5'>
        {books.map((book) => (
          <div
            key={book.id}
            className='w-36 bg-slate-800 rounded-lg shadow p-2 text-center transform transition-all hover:scale-105'
          >
            <img
              src={book.image}
              alt={book.title}
              className='w-full h-24 object-cover rounded-lg mb-2'
              onError={(e) =>
                (e.target.src = 'https://via.placeholder.com/150?text=No+Cover')
              }
            />
            <h3 className='text-base font-medium text-slate-200'>
              {book.title}
            </h3>
            <p className='text-slate-400 text-xs'>by {book.author}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyReads
