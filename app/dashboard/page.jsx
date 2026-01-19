'use client'

import { useEffect, useState } from 'react'
import { Plus, Edit2, Trash2, ExternalLink, Save, X, Upload, Image as ImageIcon, Star } from 'lucide-react'
import Image from 'next/image'

export default function ProjectsPage() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [editingIndex, setEditingIndex] = useState(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [uploadingImages, setUploadingImages] = useState({})

  useEffect(() => {
    loadProjects()
  }, [])

  const loadProjects = async () => {
    try {
      const res = await fetch('/api/projects')
      const data = await res.json()
      // Ensure we always set an array - handle all edge cases
      let projectsData = []
      if (data && Array.isArray(data.projects)) {
        projectsData = data.projects
      } else if (data && data.projects && typeof data.projects === 'object') {
        // If API returns object instead of array, use empty array
        console.warn('API returned object instead of array for projects')
        projectsData = []
      }
      setProjects(projectsData)
    } catch (err) {
      console.error('Load projects error:', err)
      setError('Failed to load projects')
      // Ensure projects is always an array even on error
      setProjects([])
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (index) => {
    const currentProjects = Array.isArray(projects) ? projects : []
    
    if (index < 0 || index >= currentProjects.length) {
      setError('Invalid project index')
      return
    }

    const project = currentProjects[index]
    
    setSaving(true)
    setMessage('')
    setError('')
    
    try {
      // Sanitize project data
      const sanitizedProject = {
        title: String(project.title || ''),
        description: String(project.description || ''),
        image: String(project.image || ''),
        link: String(project.link || ''),
        year: String(project.year || ''),
        tech: Array.isArray(project.tech) ? project.tech.map(t => String(t)) : [],
        featured: Boolean(project.featured || false)
      }

      let res
      if (project.id) {
        // Update existing project
        res = await fetch('/api/projects', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: project.id, ...sanitizedProject })
        })
      } else {
        // Create new project
        res = await fetch('/api/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(sanitizedProject)
        })
      }

      const data = await res.json()
      if (res.ok) {
        setMessage('Project saved successfully!')
        setEditingIndex(null)
        setShowAddForm(false)
        
        // Update the project in local state with the returned ID
        const updatedProjects = [...currentProjects]
        if (!project.id && data.project && data.project.id) {
          // New project - update with returned ID
          updatedProjects[index] = { ...updatedProjects[index], id: data.project.id }
          setProjects(updatedProjects)
        }
        
        // Reload projects to ensure sync
        await loadProjects()
        setTimeout(() => setMessage(''), 3000)
      } else {
        setError(data.error || 'Failed to save project')
      }
    } catch (err) {
      console.error('Save error:', err)
      setError('Failed to save project')
    } finally {
      setSaving(false)
    }
  }

  const handleAdd = () => {
    // Ensure projects is always an array before adding
    const currentProjects = Array.isArray(projects) ? projects : []
    
    const newProject = {
      id: null, // Will be set after saving
      title: '',
      description: '',
      image: '',
      link: '',
      year: new Date().getFullYear().toString(),
      tech: [],
      featured: false
    }
    setProjects([newProject, ...currentProjects])
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

  const handleToggleFeatured = async (index) => {
    const currentProjects = Array.isArray(projects) ? projects : []
    const project = currentProjects[index]
    
    if (!project) {
      setError('Project not found')
      return
    }

    // If project is being featured, unfeature all others first
    if (!project.featured) {
      const updated = currentProjects.map((p, i) => ({
        ...p,
        featured: i === index ? true : false
      }))
      setProjects(updated)
      
      // Save all projects with updated featured status
      try {
        for (const [i, p] of updated.entries()) {
          if (p.id) {
            await fetch('/api/projects', {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ 
                id: p.id, 
                title: String(p.title || ''),
                description: String(p.description || ''),
                image: String(p.image || ''),
                link: String(p.link || ''),
                year: String(p.year || ''),
                tech: Array.isArray(p.tech) ? p.tech.map(t => String(t)) : [],
                featured: i === index
              })
            })
          }
        }
        
        // Reload to ensure sync
        await loadProjects()
        setMessage('Featured project updated!')
        setTimeout(() => setMessage(''), 3000)
      } catch (err) {
        console.error('Update featured error:', err)
        setError('Failed to update featured project')
      }
    } else {
      // Unfeature the project
      const updated = currentProjects.map((p, i) => ({
        ...p,
        featured: i === index ? false : p.featured
      }))
      setProjects(updated)
      
      // Save the update
      if (project.id) {
        try {
          await fetch('/api/projects', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              id: project.id, 
              title: String(project.title || ''),
              description: String(project.description || ''),
              image: String(project.image || ''),
              link: String(project.link || ''),
              year: String(project.year || ''),
              tech: Array.isArray(project.tech) ? project.tech.map(t => String(t)) : [],
              featured: false
            })
          })
          
          // Reload to ensure sync
          await loadProjects()
          setMessage('Featured status removed!')
          setTimeout(() => setMessage(''), 3000)
        } catch (err) {
          console.error('Update featured error:', err)
          setError('Failed to update featured status')
        }
      }
    }
  }

  const handleDelete = async (index) => {
    if (confirm('Are you sure you want to delete this project?')) {
      const currentProjects = Array.isArray(projects) ? projects : []
      const project = currentProjects[index]
      
      if (!project) {
        setError('Project not found')
        return
      }

      // If project has an ID, delete from database
      if (project.id) {
        try {
          const res = await fetch(`/api/projects?id=${project.id}`, {
            method: 'DELETE'
          })
          
          if (res.ok) {
            // Remove from local state
            const updated = currentProjects.filter((_, i) => i !== index)
            setProjects(updated)
            setMessage('Project deleted successfully!')
            setTimeout(() => setMessage(''), 3000)
          } else {
            setError('Failed to delete project')
          }
        } catch (err) {
          console.error('Delete error:', err)
          setError('Failed to delete project')
        }
      } else {
        // If no ID (new unsaved project), just remove from local state
        const updated = currentProjects.filter((_, i) => i !== index)
        setProjects(updated)
      }
    }
  }

  const updateProject = (index, field, value) => {
    // Ensure projects is always an array before updating
    const currentProjects = Array.isArray(projects) ? projects : []
    const updated = [...currentProjects]
    
    // Ensure we only store serializable values
    let sanitizedValue = value
    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
      sanitizedValue = value
    } else if (Array.isArray(value)) {
      sanitizedValue = value.map(item => String(item))
    } else {
      sanitizedValue = String(value || '')
    }
    
    // Only update if index is valid
    if (index >= 0 && index < updated.length) {
      updated[index] = { ...updated[index], [field]: sanitizedValue }
      setProjects(updated)
    }
  }

  const updateTech = (index, techString) => {
    const tech = techString.split(',').map((t) => t.trim()).filter(Boolean)
    updateProject(index, 'tech', tech)
  }

  // Convert image to WebP format for better optimization
  // Reduced size for faster uploads and better performance
  const convertToWebP = (file, quality = 0.80, maxWidth = 1200, maxHeight = 1200) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      
      reader.onload = (e) => {
        const img = new window.Image()
        
        img.onload = () => {
          // Calculate new dimensions while maintaining aspect ratio
          let width = img.width
          let height = img.height
          
          if (width > maxWidth || height > maxHeight) {
            const ratio = Math.min(maxWidth / width, maxHeight / height)
            width = Math.round(width * ratio)
            height = Math.round(height * ratio)
          }
          
          // Create canvas and draw image
          const canvas = document.createElement('canvas')
          canvas.width = width
          canvas.height = height
          const ctx = canvas.getContext('2d')
          
          // Use balanced quality rendering for smaller file size
          ctx.imageSmoothingEnabled = true
          ctx.imageSmoothingQuality = 'medium'
          
          ctx.drawImage(img, 0, 0, width, height)
          
          // Convert to WebP
          canvas.toBlob(
            (blob) => {
              if (blob) {
                // Create a File object from the blob
                const webpFile = new File([blob], file.name.replace(/\.[^/.]+$/, '.webp'), {
                  type: 'image/webp',
                  lastModified: Date.now()
                })
                resolve(webpFile)
              } else {
                reject(new Error('Failed to convert image to WebP'))
              }
            },
            'image/webp',
            quality
          )
        }
        
        img.onerror = () => {
          reject(new Error('Failed to load image'))
        }
        
        img.src = e.target.result
      }
      
      reader.onerror = () => {
        reject(new Error('Failed to read file'))
      }
      
      reader.readAsDataURL(file)
    })
  }

  const handleImageUpload = async (index, file) => {
    if (!file) return

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
    if (!allowedTypes.includes(file.type)) {
      setError('Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.')
      return
    }

    // Validate file size (5MB max before conversion)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      setError('File size must be less than 5MB')
      return
    }

    setUploadingImages((prev) => ({ ...prev, [index]: true }))
    setError('')

    try {
      // Convert image to WebP before uploading
      let fileToUpload = file
      
      // Only convert if not already WebP
      if (file.type !== 'image/webp') {
        try {
          // Convert with reduced size: 1200x1200 max, 80% quality for smaller file sizes
          fileToUpload = await convertToWebP(file, 0.80, 1200, 1200)
        } catch (convertError) {
          console.error('Conversion error:', convertError)
          setError('Failed to process image. Please try again.')
          setUploadingImages((prev) => {
            const updated = { ...prev }
            delete updated[index]
            return updated
          })
          return
        }
      }

      const formData = new FormData()
      formData.append('file', fileToUpload)
      formData.append('folder', 'portfolio/projects')

      const res = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData
      })

      const data = await res.json()

      if (res.ok && data.url) {
        updateProject(index, 'image', data.url)
        setMessage('Image uploaded successfully!')
        setTimeout(() => setMessage(''), 3000)
      } else {
        setError(data.error || 'Failed to upload image')
      }
    } catch (err) {
      console.error('Upload error:', err)
      setError('Failed to upload image')
    } finally {
      setUploadingImages((prev) => {
        const updated = { ...prev }
        delete updated[index]
        return updated
      })
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
        {Array.isArray(projects) && projects.length > 0 ? (
          projects.map((project, index) => (
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
                  <div className='flex items-center gap-4'>
                    <label className='flex items-center gap-2 cursor-pointer'>
                      <input
                        type='checkbox'
                        checked={project.featured || false}
                        onChange={(e) => {
                          // When checking featured, unfeature all others first
                          const updated = projects.map((p, i) => ({
                            ...p,
                            featured: i === index ? e.target.checked : false
                          }))
                          setProjects(updated)
                        }}
                        className='rounded border-blue-500/30 bg-slate-800/50 text-blue-500 focus:ring-2 focus:ring-blue-500/50'
                      />
                      <span className='text-sm font-medium text-slate-300'>
                        Featured Project
                      </span>
                    </label>
                  </div>
                  <div>
                    <label className='mb-2 block text-sm font-medium text-slate-300'>
                      Project Image
                    </label>
                  
                  {/* Image Preview */}
                  {project.image && (
                    <div className='mb-3 relative w-full h-48 rounded-lg overflow-hidden border border-blue-500/20 bg-slate-800/50'>
                      <Image
                        src={project.image}
                        alt={project.title || 'Project preview'}
                        fill
                        className='object-cover'
                      />
                      <button
                        type='button'
                        onClick={() => updateProject(index, 'image', '')}
                        className='absolute top-2 right-2 p-1.5 rounded-lg bg-red-500/80 hover:bg-red-500 text-white transition-colors'
                        title='Remove image'
                      >
                        <X className='h-4 w-4' />
                      </button>
                    </div>
                  )}

                  {/* Upload Area */}
                  <div className='relative'>
                    <input
                      type='file'
                      accept='image/jpeg,image/png,image/webp,image/gif'
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          handleImageUpload(index, file)
                        }
                        // Reset input
                        e.target.value = ''
                      }}
                      className='hidden'
                      id={`image-upload-${index}`}
                      disabled={uploadingImages[index]}
                    />
                    <label
                      htmlFor={`image-upload-${index}`}
                      className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                        uploadingImages[index]
                          ? 'border-blue-500/50 bg-blue-500/10'
                          : 'border-blue-500/30 bg-slate-800/30 hover:border-blue-500/50 hover:bg-slate-800/50'
                      }`}
                    >
                      {uploadingImages[index] ? (
                        <>
                          <div className='inline-block h-6 w-6 animate-spin rounded-full border-2 border-solid border-blue-400 border-r-transparent mb-2'></div>
                          <span className='text-sm text-slate-300'>Uploading...</span>
                        </>
                      ) : (
                        <>
                          <Upload className='h-6 w-6 text-blue-400 mb-2' />
                          <span className='text-sm text-slate-300'>
                            {project.image ? 'Change Image' : 'Upload Image'}
                          </span>
                          <span className='text-xs text-slate-500 mt-1'>
                            PNG, JPG, WEBP or GIF (max 5MB)
                          </span>
                        </>
                      )}
                    </label>
                  </div>

                  {/* Manual URL Input (Alternative) */}
                  <div className='mt-3'>
                    <label className='mb-2 block text-xs font-medium text-slate-400'>
                      Or enter image URL manually
                    </label>
                    <input
                      type='text'
                      value={project.image || ''}
                      onChange={(e) => updateProject(index, 'image', e.target.value)}
                      className='w-full rounded-lg border border-blue-500/20 bg-slate-800/50 px-4 py-2 text-sm text-white outline-none focus:border-blue-500/50'
                      placeholder='https://... or /images/project.png'
                    />
                  </div>
                </div>
                <div className='grid grid-cols-2 gap-4'>
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
              <div className='flex items-start justify-between gap-4'>
                {/* Image Preview */}
                {project.image && (
                  <div className='relative w-32 h-32 md:w-40 md:h-40 flex-shrink-0 rounded-lg overflow-hidden border border-blue-500/20 bg-slate-800/50'>
                    <Image
                      src={project.image}
                      alt={project.title || 'Project image'}
                      fill
                      className='object-cover'
                      sizes='(max-width: 768px) 128px, 160px'
                    />
                  </div>
                )}
                
                <div className='flex-1 min-w-0'>
                  <div className='flex items-center gap-3'>
                    <h3 className='text-xl font-semibold text-white'>
                      {project.title || 'Untitled Project'}
                    </h3>
                    {project.link && (
                      <a
                        href={project.link}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-blue-400 hover:text-blue-300 flex-shrink-0'
                      >
                        <ExternalLink className='h-4 w-4' />
                      </a>
                    )}
                  </div>
                  <p className='mt-2 text-sm text-slate-400 line-clamp-2'>{project.description}</p>
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
                    onClick={() => handleToggleFeatured(index)}
                    className={`rounded-lg border p-2 transition-colors ${
                      project.featured
                        ? 'border-yellow-500/50 bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30'
                        : 'border-blue-500/20 bg-slate-800/50 text-slate-300 hover:bg-slate-800'
                    }`}
                    title={project.featured ? 'Remove from featured' : 'Mark as featured'}
                  >
                    <Star className={`h-4 w-4 ${project.featured ? 'fill-current' : ''}`} />
                  </button>
                  <button
                    onClick={() => handleEdit(index)}
                    className='rounded-lg border border-blue-500/20 bg-slate-800/50 p-2 text-slate-300 transition-colors hover:bg-slate-800'
                    title='Edit project'
                  >
                    <Edit2 className='h-4 w-4' />
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className='rounded-lg border border-red-500/20 bg-slate-800/50 p-2 text-red-400 transition-colors hover:bg-slate-800'
                    title='Delete project'
                  >
                    <Trash2 className='h-4 w-4' />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))
        ) : null}

        {(!Array.isArray(projects) || projects.length === 0) && (
          <div className='rounded-xl border border-blue-500/20 bg-slate-900/50 p-12 text-center backdrop-blur-xl'>
            <p className='text-slate-400'>No projects yet. Add your first project!</p>
          </div>
        )}
      </div>
    </div>
  )
}
