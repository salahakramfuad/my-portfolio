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

  const handleSave = async (index) => {
    const currentExperience = Array.isArray(experience) ? experience : []
    
    if (index < 0 || index >= currentExperience.length) {
      setError('Invalid experience index')
      return
    }

    const entry = currentExperience[index]
    
    setSaving(true)
    setMessage('')
    setError('')
    
    try {
      // Sanitize experience entry data to ensure only serializable data
      const sanitizedEntry = {
        title: String(entry.title || ''),
        company: String(entry.company || ''),
        summary: String(entry.summary || ''),
        stack: Array.isArray(entry.stack) ? entry.stack.map(s => String(s)) : [],
        links: {
          site: entry.links?.site ? String(entry.links.site) : '',
          repo: entry.links?.repo ? String(entry.links.repo) : '',
          caseStudy: entry.links?.caseStudy ? String(entry.links.caseStudy) : ''
        }
      }

      let res
      if (entry.id) {
        // Update existing experience entry
        res = await fetch('/api/experience', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: entry.id, ...sanitizedEntry })
        })
      } else {
        // Create new experience entry
        res = await fetch('/api/experience', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(sanitizedEntry)
        })
      }

      const data = await res.json()
      if (res.ok) {
        setMessage('Experience saved successfully!')
        setEditingIndex(null)
        setShowAddForm(false)
        
        // Update the entry in local state with the returned ID
        const updatedExperience = [...currentExperience]
        if (!entry.id && data.entry && data.entry.id) {
          // New entry - update with returned ID
          updatedExperience[index] = { ...updatedExperience[index], id: data.entry.id }
          setExperience(updatedExperience)
        }
        
        // Reload to ensure sync
        await loadExperience()
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
    const currentExperience = Array.isArray(experience) ? experience : []
    const newEntry = {
      id: null, // Will be set after saving
      title: '',
      company: '',
      summary: '',
      stack: [],
      links: { site: '', repo: '', caseStudy: '' }
    }
    setExperience([newEntry, ...currentExperience])
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

  const handleDelete = async (index) => {
    if (confirm('Are you sure you want to delete this experience entry?')) {
      const currentExperience = Array.isArray(experience) ? experience : []
      const entry = currentExperience[index]
      
      if (!entry) {
        setError('Experience entry not found')
        return
      }

      // If entry has an ID, delete from database
      if (entry.id) {
        try {
          const res = await fetch(`/api/experience?id=${entry.id}`, {
            method: 'DELETE'
          })
          
          if (res.ok) {
            // Remove from local state
            const updated = currentExperience.filter((_, i) => i !== index)
            setExperience(updated)
            setMessage('Experience entry deleted successfully!')
            setTimeout(() => setMessage(''), 3000)
          } else {
            setError('Failed to delete experience entry')
          }
        } catch (err) {
          console.error('Delete error:', err)
          setError('Failed to delete experience entry')
        }
      } else {
        // If no ID (new unsaved entry), just remove from local state
        const updated = currentExperience.filter((_, i) => i !== index)
        setExperience(updated)
      }
    }
  }

  const updateExperience = (index, field, value) => {
    // Ensure experience is always an array before updating
    const currentExperience = Array.isArray(experience) ? experience : []
    const updated = [...currentExperience]
    
    // Ensure we only store serializable values
    let sanitizedValue = value
    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
      sanitizedValue = value
    } else if (Array.isArray(value)) {
      sanitizedValue = value.map(item => String(item))
    } else if (typeof value === 'object' && value !== null) {
      // For objects like links, recursively sanitize
      sanitizedValue = {}
      for (const key in value) {
        sanitizedValue[key] = String(value[key] || '')
      }
    } else {
      sanitizedValue = String(value || '')
    }
    
    // Only update if index is valid
    if (index >= 0 && index < updated.length) {
      updated[index] = { ...updated[index], [field]: sanitizedValue }
      setExperience(updated)
    }
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
                      onChange={(e) => {
                        let value = e.target.value.trim()
                        // Auto-add https:// if no protocol is provided
                        if (value && !value.startsWith('http://') && !value.startsWith('https://')) {
                          value = `https://${value}`
                        }
                        updateLink(index, 'site', value)
                      }}
                      className='w-full rounded-lg border border-blue-500/20 bg-slate-800/50 px-4 py-2 text-sm text-white outline-none focus:border-blue-500/50'
                      placeholder='https://example.com or example.com'
                    />
                    <p className='mt-1 text-xs text-slate-500'>
                      Enter URL with or without https:// (will be added automatically)
                    </p>
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
                    onClick={() => handleSave(index)}
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
