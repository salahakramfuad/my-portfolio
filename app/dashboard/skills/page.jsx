'use client'

import { useEffect, useState } from 'react'
import { Plus, Save, X } from 'lucide-react'

export default function SkillsPage() {
  const [skills, setSkills] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    loadSkills()
  }, [])

  const loadSkills = async () => {
    try {
      const res = await fetch('/api/skills')
      const data = await res.json()
      // Extract skill names from objects or use strings directly
      const skillsList = (data.skills || []).map(skill => 
        typeof skill === 'string' ? skill : (skill?.name || '')
      )
      setSkills(skillsList)
    } catch (err) {
      console.error('Load skills error:', err)
      setError('Failed to load skills')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    setMessage('')
    setError('')
    try {
      // Ensure skills is always an array of strings
      const skillsArray = Array.isArray(skills) 
        ? skills.map(skill => typeof skill === 'string' ? skill : (skill?.name || String(skill)))
        : []
      
      const res = await fetch('/api/skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ skills: skillsArray })
      })
      const data = await res.json()
      if (res.ok) {
        setMessage('Skills saved successfully!')
        setTimeout(() => setMessage(''), 3000)
        // Reload to get updated data
        await loadSkills()
      } else {
        setError(data.error || 'Failed to save skills')
      }
    } catch (err) {
      console.error('Save error:', err)
      setError('Failed to save skills')
    } finally {
      setSaving(false)
    }
  }

  const handleAdd = () => {
    if (inputValue.trim()) {
      const newSkills = inputValue
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
        .filter((s) => !skills.includes(s))
      setSkills([...skills, ...newSkills])
      setInputValue('')
    }
  }

  const handleRemove = (skill) => {
    setSkills(skills.filter((s) => s !== skill))
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAdd()
    }
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
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-white'>Skills</h1>
        <p className='mt-2 text-slate-400'>Manage your technical skills</p>
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

      <div className='rounded-xl border border-blue-500/20 bg-slate-900/50 p-6 backdrop-blur-xl'>
        <div className='mb-6'>
          <label className='mb-2 block text-sm font-medium text-slate-300'>
            Add Skills (comma-separated)
          </label>
          <div className='flex gap-2'>
            <input
              type='text'
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              className='flex-1 rounded-lg border border-blue-500/20 bg-slate-800/50 px-4 py-2 text-sm text-white outline-none focus:border-blue-500/50'
              placeholder='React, TypeScript, Next.js...'
            />
            <button
              onClick={handleAdd}
              className='flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700'
            >
              <Plus className='h-4 w-4' />
              Add
            </button>
          </div>
        </div>

        <div className='mb-6'>
          <div className='mb-3 flex items-center justify-between'>
            <span className='text-sm font-medium text-slate-300'>
              Skills ({skills.length})
            </span>
            <button
              onClick={handleSave}
              disabled={saving}
              className='flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-50'
            >
              <Save className='h-4 w-4' />
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
          <div className='flex flex-wrap gap-2'>
            {skills.map((skill, index) => (
              <div
                key={index}
                className='group flex items-center gap-2 rounded-full bg-blue-500/20 px-4 py-2 text-sm text-blue-300'
              >
                <span>{skill}</span>
                <button
                  onClick={() => handleRemove(skill)}
                  className='rounded-full p-0.5 text-blue-400 opacity-0 transition-opacity hover:bg-blue-500/30 group-hover:opacity-100'
                >
                  <X className='h-3 w-3' />
                </button>
              </div>
            ))}
          </div>
          {skills.length === 0 && (
            <p className='py-8 text-center text-sm text-slate-500'>
              No skills yet. Add some skills to get started!
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
