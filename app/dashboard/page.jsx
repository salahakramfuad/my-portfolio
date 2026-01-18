'use client'

import { useEffect, useState } from 'react'
import { Plus, Edit2, Trash2, ExternalLink, Save, X } from 'lucide-react'

export default function ProjectsPage() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [editingIndex, setEditingIndex] = useState(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    loadProjects()
  }, [])

  const loadProjects = async () => {
    try {
      const res = await fetch('/api/projects')
      const data = await res.json()
      setProjects(data.projects || [])
    } catch (err) {
      console.error('Load projects error:', err)
      setError('Failed to load projects')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    setMessage('')
    setError('')
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projects })
      })
      const data = await res.json()
      if (res.ok) {
        setMessage('Projects saved successfully!')
        setEditingIndex(null)
        setShowAddForm(false)
        setTimeout(() => setMessage(''), 3000)
      } else {
        setError(data.error || 'Failed to save projects')
      }
    } catch (err) {
      console.error('Save error:', err)
      setError('Failed to save projects')
    } finally {
      setSaving(false)
    }
  }

  const handleAdd = () => {
    const newProject = {
      title: '',
      description: '',
      image: '',
      link: '',
      year: new Date().getFullYear().toString(),
      tech: []
    }
    setProjects([newProject, ...projects])
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
    loadProjects()
  }

  const handleDelete = (index) => {
    if (confirm('Are you sure you want to delete this project?')) {
      setProjects(projects.filter((_, i) => i !== index))
    }
  }

  const updateProject = (index, field, value) => {
    const updated = [...projects]
    updated[index] = { ...updated[index], [field]: value }
    setProjects(updated)
  }

  const updateTech = (index, techString) => {
    const tech = techString.split(',').map((t) => t.trim()).filter(Boolean)
    updateProject(index, 'tech', tech)
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
          <h1 className='text-3xl font-bold text-white'>Projects</h1>
          <p className='mt-2 text-slate-400'>Manage your portfolio projects</p>
        </div>
        <button
          onClick={handleAdd}
          className='flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700'
        >
          <Plus className='h-4 w-4' />
          Add Project
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
        {projects.map((project, index) => (
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
                    value={project.title}
                    onChange={(e) => updateProject(index, 'title', e.target.value)}
                    className='w-full rounded-lg border border-blue-500/20 bg-slate-800/50 px-4 py-2 text-sm text-white outline-none focus:border-blue-500/50'
                    placeholder='Project Title'
                  />
                </div>
                <div>
                  <label className='mb-2 block text-sm font-medium text-slate-300'>
                    Description
                  </label>
                  <textarea
                    value={project.description}
                    onChange={(e) => updateProject(index, 'description', e.target.value)}
                    rows={3}
                    className='w-full rounded-lg border border-blue-500/20 bg-slate-800/50 px-4 py-2 text-sm text-white outline-none focus:border-blue-500/50'
                    placeholder='Project description...'
                  />
                </div>
                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <label className='mb-2 block text-sm font-medium text-slate-300'>
                      Image URL
                    </label>
                    <input
                      type='text'
                      value={project.image}
                      onChange={(e) => updateProject(index, 'image', e.target.value)}
                      className='w-full rounded-lg border border-blue-500/20 bg-slate-800/50 px-4 py-2 text-sm text-white outline-none focus:border-blue-500/50'
                      placeholder='/images/project.png'
                    />
                  </div>
                  <div>
                    <label className='mb-2 block text-sm font-medium text-slate-300'>
                      Link
                    </label>
                    <input
                      type='text'
                      value={project.link}
                      onChange={(e) => updateProject(index, 'link', e.target.value)}
                      className='w-full rounded-lg border border-blue-500/20 bg-slate-800/50 px-4 py-2 text-sm text-white outline-none focus:border-blue-500/50'
                      placeholder='https://...'
                    />
                  </div>
                </div>
                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <label className='mb-2 block text-sm font-medium text-slate-300'>
                      Year
                    </label>
                    <input
                      type='text'
                      value={project.year}
                      onChange={(e) => updateProject(index, 'year', e.target.value)}
                      className='w-full rounded-lg border border-blue-500/20 bg-slate-800/50 px-4 py-2 text-sm text-white outline-none focus:border-blue-500/50'
                      placeholder='2025'
                    />
                  </div>
                  <div>
                    <label className='mb-2 block text-sm font-medium text-slate-300'>
                      Tech Stack (comma-separated)
                    </label>
                    <input
                      type='text'
                      value={project.tech?.join(', ') || ''}
                      onChange={(e) => updateTech(index, e.target.value)}
                      className='w-full rounded-lg border border-blue-500/20 bg-slate-800/50 px-4 py-2 text-sm text-white outline-none focus:border-blue-500/50'
                      placeholder='Next.js, TypeScript, Tailwind'
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
                      {project.title || 'Untitled Project'}
                    </h3>
                    {project.link && (
                      <a
                        href={project.link}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-blue-400 hover:text-blue-300'
                      >
                        <ExternalLink className='h-4 w-4' />
                      </a>
                    )}
                  </div>
                  <p className='mt-2 text-sm text-slate-400'>{project.description}</p>
                  <div className='mt-3 flex flex-wrap items-center gap-4'>
                    {project.year && (
                      <span className='text-xs text-slate-500'>{project.year}</span>
                    )}
                    {project.tech && project.tech.length > 0 && (
                      <div className='flex flex-wrap gap-2'>
                        {project.tech.map((tech, i) => (
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

        {projects.length === 0 && (
          <div className='rounded-xl border border-blue-500/20 bg-slate-900/50 p-12 text-center backdrop-blur-xl'>
            <p className='text-slate-400'>No projects yet. Add your first project!</p>
          </div>
        )}
      </div>
    </div>
  )
}
