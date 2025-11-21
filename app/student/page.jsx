'use client'

import { useState } from 'react'
import { db } from '../../lib/firebase'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'

export default function StudentInputPage() {
  const [name, setName] = useState('')
  const [country, setCountry] = useState('')
  const [university, setUniversity] = useState('')
  const [gradYear, setGradYear] = useState('')
  const [saving, setSaving] = useState(false)
  const [status, setStatus] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus(null)

    if (!name.trim() || !university.trim()) {
      setStatus('Please fill at least Name and University.')
      return
    }

    setSaving(true)
    try {
      await addDoc(collection(db, 'students'), {
        name: name.trim(),
        country: country.trim(),
        university: university.trim(),
        graduationYear: gradYear.trim(),
        createdAt: serverTimestamp()
      })
      setStatus('✅ Student record saved to Firestore')
      setName('')
      setCountry('')
      setUniversity('')
      setGradYear('')
    } catch (err) {
      console.error(err)
      setStatus('❌ Error saving student. Check console.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <main className='min-h-screen bg-slate-50 flex items-center justify-center px-4 py-10'>
      <div className='w-full max-w-xl rounded-2xl bg-white shadow-lg border border-slate-200 p-6 md:p-8'>
        <div className='flex items-center justify-between gap-4'>
          <div>
            <h1 className='text-2xl font-semibold text-slate-900'>
              Student Input – Basic Details
            </h1>
            <p className='mt-2 text-sm text-slate-600'>
              This form saves to the <code className='font-mono'>students</code>{' '}
              collection.
            </p>
          </div>
          <a
            href='/output'
            className='text-sm font-medium text-sky-600 hover:text-sky-700 underline underline-offset-4'
          >
            View Output
          </a>
        </div>

        <form onSubmit={handleSubmit} className='mt-6 space-y-4'>
          <div>
            <label className='block text-sm font-medium text-slate-700'>
              Name
            </label>
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500'
              placeholder='Your full name'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-slate-700'>
              Country
            </label>
            <input
              type='text'
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className='mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500'
              placeholder='e.g. Bangladesh'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-slate-700'>
              University Name
            </label>
            <input
              type='text'
              value={university}
              onChange={(e) => setUniversity(e.target.value)}
              className='mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500'
              placeholder='e.g. BRAC University'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-slate-700'>
              Graduation Year
            </label>
            <input
              type='number'
              value={gradYear}
              onChange={(e) => setGradYear(e.target.value)}
              className='mt-1 w-full max-w-xs rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500'
              placeholder='e.g. 2025'
            />
          </div>

          <button
            type='submit'
            disabled={saving}
            className='mt-2 inline-flex items-center justify-center rounded-lg bg-sky-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-sky-700 disabled:opacity-60'
          >
            {saving ? 'Saving…' : 'Save Student'}
          </button>
        </form>

        {status && <p className='mt-4 text-sm text-slate-700'>{status}</p>}

        <p className='mt-4 text-xs text-slate-500'>
          All student records will be visible on the{' '}
          <code className='font-mono'>/output</code> page under the Students
          table.
        </p>
      </div>
    </main>
  )
}
