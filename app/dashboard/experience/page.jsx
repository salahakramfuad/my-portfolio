'use client'

import { useEffect, useState } from 'react'
import { Plus, Edit2, Trash2, ExternalLink, Save, X } from 'lucide-react'

export default function ExperiencePage() {
  const [experience, setExperience] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [editingIndex, setEditingIndex] = useState(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    loadExperience()
  }, [])

  const loadExperience = async () => {
    try {
      const res = await fetch('/api/experience')
      const data = await res.json()
      setExperience(data.experience || [])
    } catch (err) {
      console.error('Load experience error:', err)
      setError('Failed to load experience')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    setMessage('')
    setError('')
    try {
      const res = await fetch('/api/experience', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ experience })
      })
      const data = await res.json()
      if (res.ok) {
        setMessage('Experience saved successfully!')
        setEditingIndex(null)
        setShowAddForm(false)
        setTimeout(() => setMessage(''), 3000)
      } else {
        setError(data.error || 'Failed to save experience')
      }
    } catch (err) {
      console.error('Save error:', err)
      setError('Failed to save experience')
    } finally {
      setSaving(false)
    }
  }

  const handleAdd = () => {
    const newEntry = {
      title: '',
      company: '',
      summary: '',
      stack: [],
      links: { site: '', repo: '', caseStudy: '' }
    }
    setExperience([newEntry, ...experience])
    setEditingIndex(0)
    setShowAddForm(true)
  }

  const handleEdit = (index) => {
    setEditingIndex(index)
    setShowAddForm(false)
  }

  const handleCancel = () => {
    setEditingIndex(null)
    setShowAddForm(false)
    loadExperience()
  }

  const handleDelete = (index) => {
    if (confirm('Are you sure you want to delete this experience entry?')) {
      setExperience(experience.filter((_, i) => i !== index))
    }
  }

  const updateExperience = (index, field, value) => {
    const updated = [...experience]
    updated[index] = { ...updated[index], [field]: value }
    setExperience(updated)
  }

  const updateStack = (index, stackString) => {
    const stack = stackString.split(',').map((s) => s.trim()).filter(Boolean)
    updateExperience(index, 'stack', stack)
  }

  const updateLink = (index, linkField, value) => {
    const updated = [...experience]
    updated[index] = {
      ...updated[index],
      links: { ...updated[index].links, [linkField]: value || null }
    }
    setExperience(updated)
  }

  if (loading) {
    return (
      <div className='flex items-center justify-center py-20'>
        <div className='inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-400 border-r-transparent'></div>
      </div>
    )
  }

  return (
    <div>
      <div className='mb-8 flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold text-white'>Experience</h1>
          <p className='mt-2 text-slate-400'>Manage your work experience</p>
        </div>
        <button
          onClick={handleAdd}
          className='flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700'
        >
          <Plus className='h-4 w-4' />
          Add Experience
        </button>
      </div>

      {message && (
        <div className='mb-4 rounded-lg border border-blue-500/40 bg-blue-500/10 p-3 text-sm text-blue-300'>
          {message}
        </div>
      )}

      {error && (
        <div className='mb-4 rounded-lg border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-300'>
          {error}
        </div>
      )}

      <div className='space-y-4'>
        {experience.map((entry, index) => (
          <div
            key={index}
            className='rounded-xl border border-blue-500/20 bg-slate-900/50 p-6 backdrop-blur-xl'
          >
            {editingIndex === index ? (
              <div className='space-y-4'>
                <div>
                  <label className='mb-2 block text-sm font-medium text-slate-300'>
                    Title
                  </label>
                  <input
                    type='text'
                    value={entry.title}
                    onChange={(e) => updateExperience(index, 'title', e.target.value)}
                    className='w-full rounded-lg border border-blue-500/20 bg-slate-800/50 px-4 py-2 text-sm text-white outline-none focus:border-blue-500/50'
                    placeholder='Job Title'
                  />
                </div>
                <div>
                  <label className='mb-2 block text-sm font-medium text-slate-300'>
                    Company
                  </label>
                  <input
                    type='text'
                    value={entry.company}
                    onChange={(e) => updateExperience(index, 'company', e.target.value)}
                    className='w-full rounded-lg border border-blue-500/20 bg-slate-800/50 px-4 py-2 text-sm text-white outline-none focus:border-blue-500/50'
                    placeholder='Company Name • Date Range'
                  />
                </div>
                <div>
                  <label className='mb-2 block text-sm font-medium text-slate-300'>
                    Summary
                  </label>
                  <textarea
                    value={entry.summary}
                    onChange={(e) => updateExperience(index, 'summary', e.target.value)}
                    rows={4}
                    className='w-full rounded-lg border border-blue-500/20 bg-slate-800/50 px-4 py-2 text-sm text-white outline-none focus:border-blue-500/50'
                    placeholder='Describe your role and achievements...'
                  />
                </div>
                <div>
                  <label className='mb-2 block text-sm font-medium text-slate-300'>
                    Tech Stack (comma-separated)
                  </label>
                  <input
                    type='text'
                    value={entry.stack?.join(', ') || ''}
                    onChange={(e) => updateStack(index, e.target.value)}
                    className='w-full rounded-lg border border-blue-500/20 bg-slate-800/50 px-4 py-2 text-sm text-white outline-none focus:border-blue-500/50'
                    placeholder='Next.js, TypeScript, Firebase'
                  />
                </div>
                <div className='grid grid-cols-3 gap-4'>
                  <div>
                    <label className='mb-2 block text-sm font-medium text-slate-300'>
                      Site URL
                    </label>
                    <input
                      type='text'
                      value={entry.links?.site || ''}
                      onChange={(e) => updateLink(index, 'site', e.target.value)}
                      className='w-full rounded-lg border border-blue-500/20 bg-slate-800/50 px-4 py-2 text-sm text-white outline-none focus:border-blue-500/50'
                      placeholder='https://...'
                    />
                  </div>
                  <div>
                    <label className='mb-2 block text-sm font-medium text-slate-300'>
                      Repo URL
                    </label>
                    <input
                      type='text'
                      value={entry.links?.repo || ''}
                      onChange={(e) => updateLink(index, 'repo', e.target.value)}
                      className='w-full rounded-lg border border-blue-500/20 bg-slate-800/50 px-4 py-2 text-sm text-white outline-none focus:border-blue-500/50'
                      placeholder='https://...'
                    />
                  </div>
                  <div>
                    <label className='mb-2 block text-sm font-medium text-slate-300'>
                      Case Study URL
                    </label>
                    <input
                      type='text'
                      value={entry.links?.caseStudy || ''}
                      onChange={(e) => updateLink(index, 'caseStudy', e.target.value)}
                      className='w-full rounded-lg border border-blue-500/20 bg-slate-800/50 px-4 py-2 text-sm text-white outline-none focus:border-blue-500/50'
                      placeholder='https://...'
                    />
                  </div>
                </div>
                <div className='flex gap-2'>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className='flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-50'
                  >
                    <Save className='h-4 w-4' />
                    {saving ? 'Saving...' : 'Save'}
                  </button>
                  <button
                    onClick={handleCancel}
                    className='flex items-center gap-2 rounded-lg border border-blue-500/20 bg-slate-800/50 px-4 py-2 text-sm font-semibold text-slate-300 transition-colors hover:bg-slate-800'
                  >
                    <X className='h-4 w-4' />
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className='flex items-start justify-between'>
                <div className='flex-1'>
                  <div className='flex items-center gap-3'>
                    <h3 className='text-xl font-semibold text-white'>
                      {entry.title || 'Untitled Position'}
                    </h3>
                    {entry.links?.site && (
                      <a
                        href={entry.links.site}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-blue-400 hover:text-blue-300'
                      >
                        <ExternalLink className='h-4 w-4' />
                      </a>
                    )}
                  </div>
                  <p className='mt-1 text-sm font-medium text-blue-400'>{entry.company}</p>
                  <p className='mt-2 text-sm text-slate-400'>{entry.summary}</p>
                  {entry.stack && entry.stack.length > 0 && (
                    <div className='mt-3 flex flex-wrap gap-2'>
                      {entry.stack.map((tech, i) => (
                        <span
                          key={i}
                          className='rounded-full bg-blue-500/20 px-3 py-1 text-xs text-blue-300'
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className='ml-4 flex gap-2'>
                  <button
                    onClick={() => handleEdit(index)}
                    className='rounded-lg border border-blue-500/20 bg-slate-800/50 p-2 text-slate-300 transition-colors hover:bg-slate-800'
                  >
                    <Edit2 className='h-4 w-4' />
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className='rounded-lg border border-red-500/20 bg-slate-800/50 p-2 text-red-400 transition-colors hover:bg-slate-800'
                  >
                    <Trash2 className='h-4 w-4' />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}

        {experience.length === 0 && (
          <div className='rounded-xl border border-blue-500/20 bg-slate-900/50 p-12 text-center backdrop-blur-xl'>
            <p className='text-slate-400'>No experience entries yet. Add your first entry!</p>
          </div>
        )}
      </div>
    </div>
  )
}
