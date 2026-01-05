'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { db, storage, auth } from '../../lib/firebase'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { onAuthStateChanged, signOut } from 'firebase/auth'

const EMPTY_ROW = {
  name: '',
  category: '',
  quantity: 1,
  price: '',
  note: '',
  imageUrl: '',
  uploading: false
}

export default function FirebaseInputPage() {
  const [rows, setRows] = useState([{ ...EMPTY_ROW }])
  const [saving, setSaving] = useState(false)
  const [status, setStatus] = useState(null)
  const [checkingAuth, setCheckingAuth] = useState(true)

  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace('/login')
      } else {
        setCheckingAuth(false)
      }
    })

    return () => unsubscribe()
  }, [router])

  const handleLogout = async () => {
    try {
      await signOut(auth)
      router.replace('/')
    } catch (err) {
      console.error(err)
      setStatus('❌ Failed to log out. Please try again.')
    }
  }

  const updateRow = (index, field, value) => {
    setRows((prev) => {
      const copy = [...prev]
      copy[index] = { ...copy[index], [field]: value }
      return copy
    })
  }

  const addRow = () => {
    setRows((prev) => [...prev, { ...EMPTY_ROW }])
  }

  const removeRow = (index) => {
    setRows((prev) =>
      prev.length === 1 ? prev : prev.filter((_, i) => i !== index)
    )
  }

  const handleImageChange = async (index, file) => {
    if (!file) return
    updateRow(index, 'uploading', true)
    try {
      const fileRef = ref(storage, `testItems/${Date.now()}-${file.name}`)
      await uploadBytes(fileRef, file)
      const url = await getDownloadURL(fileRef)
      updateRow(index, 'imageUrl', url)
    } catch (err) {
      console.error(err)
      setStatus('❌ Image upload failed for one row')
    } finally {
      updateRow(index, 'uploading', false)
    }
  }

  const handleSaveAll = async (e) => {
    e.preventDefault()
    setStatus(null)

    const validRows = rows.filter((r) => r.name.trim() || r.category.trim())
    if (validRows.length === 0) {
      setStatus('Please fill at least one row (Name or Category).')
      return
    }

    setSaving(true)
    try {
      const colRef = collection(db, 'testItems')

      await Promise.all(
        validRows.map((r) =>
          addDoc(colRef, {
            name: r.name.trim(),
            category: r.category.trim(),
            quantity: Number(r.quantity) || 0,
            price: Number(r.price) || 0,
            note: r.note.trim(),
            imageUrl: r.imageUrl || '',
            createdAt: serverTimestamp()
          })
        )
      )

      setStatus(`✅ Saved ${validRows.length} item(s) to Firestore`)
      setRows([{ ...EMPTY_ROW }])
    } catch (err) {
      console.error(err)
      setStatus('❌ Error saving data. Check console.')
    } finally {
      setSaving(false)
    }
  }

  if (checkingAuth) {
    return (
      <main className='min-h-screen flex items-center justify-center bg-slate-50'>
        <p className='text-sm text-slate-600'>Checking authentication…</p>
      </main>
    )
  }

  return (
    <main className='min-h-screen bg-slate-50 flex items-center justify-center px-4 py-10'>
      <div className='w-full max-w-5xl rounded-2xl bg-white shadow-lg border border-slate-200 p-6 md:p-8'>
        <div className='flex items-center justify-between gap-4'>
          <div>
            <h1 className='text-2xl font-semibold text-slate-900'>
              Firebase Table Input – Multiple Items
            </h1>
            <p className='mt-2 text-sm text-slate-600'>
              Add multiple items in a table. Each row will be stored as a
              separate document in the{' '}
              <code className='font-mono'>testItems</code> collection.
            </p>
          </div>

          <div className='flex items-center gap-3'>
            <a
              href='/output'
              className='text-sm font-medium text-sky-600 hover:text-sky-700 underline underline-offset-4'
            >
              View Output Table
            </a>
            <button
              type='button'
              onClick={handleLogout}
              className='inline-flex items-center rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50'
            >
              Log out
            </button>
          </div>
        </div>

        <form onSubmit={handleSaveAll} className='mt-6 space-y-4'>
          <div className='overflow-x-auto border border-slate-200 rounded-xl'>
            <table className='min-w-full text-sm'>
              <thead className='bg-slate-100 text-slate-700'>
                <tr>
                  <th className='px-3 py-2 text-left'>Name</th>
                  <th className='px-3 py-2 text-left'>Category</th>
                  <th className='px-3 py-2 text-center'>Qty</th>
                  <th className='px-3 py-2 text-right'>Price</th>
                  <th className='px-3 py-2 text-left'>Note</th>
                  <th className='px-3 py-2 text-left'>Image</th>
                  <th className='px-3 py-2 text-center'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr key={index} className='border-t border-slate-200'>
                    <td className='px-3 py-2 align-top'>
                      <input
                        type='text'
                        value={row.name}
                        onChange={(e) =>
                          updateRow(index, 'name', e.target.value)
                        }
                        placeholder='Item name'
                        className='w-full rounded-md border border-slate-300 px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-sky-500'
                      />
                    </td>
                    <td className='px-3 py-2 align-top'>
                      <input
                        type='text'
                        value={row.category}
                        onChange={(e) =>
                          updateRow(index, 'category', e.target.value)
                        }
                        placeholder='Category'
                        className='w-full rounded-md border border-slate-300 px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-sky-500'
                      />
                    </td>
                    <td className='px-3 py-2 align-top text-center'>
                      <input
                        type='number'
                        min='0'
                        value={row.quantity}
                        onChange={(e) =>
                          updateRow(index, 'quantity', e.target.value)
                        }
                        className='w-16 rounded-md border border-slate-300 px-2 py-1 text-xs text-center focus:outline-none focus:ring-1 focus:ring-sky-500'
                      />
                    </td>
                    <td className='px-3 py-2 align-top text-right'>
                      <input
                        type='number'
                        min='0'
                        step='0.01'
                        value={row.price}
                        onChange={(e) =>
                          updateRow(index, 'price', e.target.value)
                        }
                        className='w-24 rounded-md border border-slate-300 px-2 py-1 text-xs text-right focus:outline-none focus:ring-1 focus:ring-sky-500'
                        placeholder='0.00'
                      />
                    </td>
                    <td className='px-3 py-2 align-top'>
                      <textarea
                        value={row.note}
                        onChange={(e) =>
                          updateRow(index, 'note', e.target.value)
                        }
                        placeholder='Short note'
                        className='w-full rounded-md border border-slate-300 px-2 py-1 text-xs min-h-[40px] focus:outline-none focus:ring-1 focus:ring-sky-500'
                      />
                    </td>
                    <td className='px-3 py-2 align-top'>
                      <div className='flex flex-col gap-1'>
                        <input
                          type='file'
                          accept='image/*'
                          onChange={(e) =>
                            handleImageChange(
                              index,
                              e.target.files?.[0] ?? null
                            )
                          }
                          className='block w-40 text-[10px] text-slate-600 file:text-[10px]'
                        />
                        {row.uploading && (
                          <span className='text-[10px] text-sky-600'>
                            Uploading…
                          </span>
                        )}
                        {row.imageUrl && !row.uploading && (
                          <span className='text-[10px] text-emerald-600'>
                            Image uploaded
                          </span>
                        )}
                      </div>
                    </td>
                    <td className='px-3 py-2 align-top text-center'>
                      <button
                        type='button'
                        onClick={() => removeRow(index)}
                        className='text-xs text-red-600 hover:text-red-700 disabled:opacity-40'
                        disabled={rows.length === 1}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className='flex items-center justify-between'>
            <button
              type='button'
              onClick={addRow}
              className='inline-flex items-center rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50'
            >
              + Add Row
            </button>

            <button
              type='submit'
              disabled={saving}
              className='inline-flex items-center rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-sky-700 disabled:opacity-60'
            >
              {saving ? 'Saving…' : 'Save All to Firestore'}
            </button>
          </div>
        </form>

        {status && <p className='mt-4 text-sm text-slate-700'>{status}</p>}

        <p className='mt-4 text-xs text-slate-500'>
          Images are uploaded to Firebase Storage; only the image URL is stored
          in Firestore.
        </p>
      </div>
    </main>
  )
}
