'use client'

import { useEffect, useState } from 'react'
import { db } from '../../lib/firebase'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'

export default function FirebaseOutputPage() {
  const [items, setItems] = useState([])
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        // Items collection
        const itemsRef = collection(db, 'testItems')
        const itemsQuery = query(itemsRef, orderBy('createdAt', 'desc'))
        const itemsSnap = await getDocs(itemsQuery)
        const itemsData = itemsSnap.docs.map((doc) => {
          const d = doc.data()
          return {
            id: doc.id,
            name: d.name || '',
            category: d.category || '',
            quantity: d.quantity ?? 0,
            price: d.price ?? 0,
            note: d.note || '',
            imageUrl: d.imageUrl || '',
            createdAt: d.createdAt?.toDate ? d.createdAt.toDate() : null
          }
        })

        // Students collection
        const studentsRef = collection(db, 'students')
        const studentsQuery = query(studentsRef, orderBy('createdAt', 'desc'))
        const studentsSnap = await getDocs(studentsQuery)
        const studentsData = studentsSnap.docs.map((doc) => {
          const d = doc.data()
          return {
            id: doc.id,
            name: d.name || '',
            country: d.country || '',
            university: d.university || '',
            graduationYear: d.graduationYear || '',
            createdAt: d.createdAt?.toDate ? d.createdAt.toDate() : null
          }
        })

        setItems(itemsData)
        setStudents(studentsData)
      } catch (err) {
        console.error(err)
        setError(err?.message || 'Failed to load data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <main className='min-h-screen bg-slate-50 flex items-center justify-center px-4 py-10'>
      <div className='w-full max-w-6xl rounded-2xl bg-white shadow-lg border border-slate-200 p-6 md:p-8 space-y-8'>
        {/* Header */}
        <div className='flex items-center justify-between gap-4'>
          <div>
            <h1 className='text-2xl font-semibold text-slate-900'>
              Firebase Output – Items & Students
            </h1>
            <p className='mt-2 text-sm text-slate-600'>
              Data from the{' '}
              <code className='font-mono bg-slate-100 px-1 py-0.5 rounded'>
                testItems
              </code>{' '}
              and{' '}
              <code className='font-mono bg-slate-100 px-1 py-0.5 rounded'>
                students
              </code>{' '}
              collections.
            </p>
          </div>
          <div className='flex flex-col items-end gap-1 text-sm'>
            <a
              href='/input'
              className='font-medium text-sky-600 hover:text-sky-700 underline underline-offset-4'
            >
              Add Items
            </a>
            <a
              href='/student-input'
              className='font-medium text-sky-600 hover:text-sky-700 underline underline-offset-4'
            >
              Add Students
            </a>
          </div>
        </div>

        {loading && <p className='mt-2 text-sm text-slate-700'>Loading…</p>}
        {error && <p className='mt-2 text-sm text-red-600'>Error: {error}</p>}

        {/* ITEMS TABLE */}
        {!loading && !error && (
          <section className='space-y-3'>
            <h2 className='text-lg font-semibold text-slate-900'>
              Items (testItems)
            </h2>
            {items.length === 0 ? (
              <p className='text-sm text-slate-600'>
                No items yet. Use <code className='font-mono'>/input</code> to
                add some.
              </p>
            ) : (
              <div className='overflow-x-auto border border-slate-200 rounded-xl'>
                <table className='min-w-full text-sm'>
                  <thead className='bg-slate-100 text-slate-700'>
                    <tr>
                      <th className='px-3 py-2 text-left'>Image</th>
                      <th className='px-3 py-2 text-left'>Name</th>
                      <th className='px-3 py-2 text-left'>Category</th>
                      <th className='px-3 py-2 text-center'>Qty</th>
                      <th className='px-3 py-2 text-right'>Price</th>
                      <th className='px-3 py-2 text-left'>Note</th>
                      <th className='px-3 py-2 text-left'>Created At</th>
                      <th className='px-3 py-2 text-left'>Doc ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr key={item.id} className='border-t border-slate-200'>
                        <td className='px-3 py-2 align-middle'>
                          {item.imageUrl ? (
                            <img
                              src={item.imageUrl}
                              alt={item.name || 'item image'}
                              className='h-12 w-12 rounded-md object-cover border border-slate-200'
                            />
                          ) : (
                            <span className='text-[11px] text-slate-400'>
                              No image
                            </span>
                          )}
                        </td>
                        <td className='px-3 py-2 align-middle'>
                          <span className='font-medium text-slate-900'>
                            {item.name || '—'}
                          </span>
                        </td>
                        <td className='px-3 py-2 align-middle text-slate-700'>
                          {item.category || '—'}
                        </td>
                        <td className='px-3 py-2 align-middle text-center text-slate-700'>
                          {item.quantity}
                        </td>
                        <td className='px-3 py-2 align-middle text-right text-slate-700'>
                          {item.price?.toFixed
                            ? item.price.toFixed(2)
                            : item.price}
                        </td>
                        <td className='px-3 py-2 align-middle text-slate-700 max-w-xs'>
                          <div className='line-clamp-3'>{item.note || '—'}</div>
                        </td>
                        <td className='px-3 py-2 align-middle text-slate-600 text-xs whitespace-nowrap'>
                          {item.createdAt
                            ? item.createdAt.toLocaleString()
                            : '—'}
                        </td>
                        <td className='px-3 py-2 align-middle text-[10px] text-slate-400 break-all font-mono'>
                          {item.id}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}

        {/* STUDENTS TABLE */}
        {!loading && !error && (
          <section className='space-y-3'>
            <h2 className='text-lg font-semibold text-slate-900'>
              Students (students)
            </h2>
            {students.length === 0 ? (
              <p className='text-sm text-slate-600'>
                No students yet. Use{' '}
                <code className='font-mono'>/student-input</code> to add some.
              </p>
            ) : (
              <div className='overflow-x-auto border border-slate-200 rounded-xl'>
                <table className='min-w-full text-sm'>
                  <thead className='bg-slate-100 text-slate-700'>
                    <tr>
                      <th className='px-3 py-2 text-left'>Name</th>
                      <th className='px-3 py-2 text-left'>Country</th>
                      <th className='px-3 py-2 text-left'>University</th>
                      <th className='px-3 py-2 text-left'>Graduation Year</th>
                      <th className='px-3 py-2 text-left'>Created At</th>
                      <th className='px-3 py-2 text-left'>Doc ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student) => (
                      <tr
                        key={student.id}
                        className='border-t border-slate-200'
                      >
                        <td className='px-3 py-2 align-middle font-medium text-slate-900'>
                          {student.name || '—'}
                        </td>
                        <td className='px-3 py-2 align-middle text-slate-700'>
                          {student.country || '—'}
                        </td>
                        <td className='px-3 py-2 align-middle text-slate-700'>
                          {student.university || '—'}
                        </td>
                        <td className='px-3 py-2 align-middle text-slate-700'>
                          {student.graduationYear || '—'}
                        </td>
                        <td className='px-3 py-2 align-middle text-slate-600 text-xs whitespace-nowrap'>
                          {student.createdAt
                            ? student.createdAt.toLocaleString()
                            : '—'}
                        </td>
                        <td className='px-3 py-2 align-middle text-[10px] text-slate-400 break-all font-mono'>
                          {student.id}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}
      </div>
    </main>
  )
}
