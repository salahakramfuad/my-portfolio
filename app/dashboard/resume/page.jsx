'use client'

import { useEffect, useState } from 'react'
import { Upload, Download, FileText, Calendar, Eye } from 'lucide-react'

export default function ResumePage() {
  const [resumeData, setResumeData] = useState(null)
  const [downloads, setDownloads] = useState([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [file, setFile] = useState(null)

  useEffect(() => {
    loadResumeData()
  }, [])

  const loadResumeData = async () => {
    try {
      const res = await fetch('/api/resume')
      const data = await res.json()
      setResumeData({
        url: data.url,
        filename: data.filename || 'resume.pdf'
      })
      setDownloads(data.downloads || [])
    } catch (err) {
      console.error('Load resume error:', err)
      setError('Failed to load resume data')
    } finally {
      setLoading(false)
    }
  }

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      if (selectedFile.type !== 'application/pdf') {
        setError('Only PDF files are allowed')
        return
      }
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError('File size must be less than 10MB')
        return
      }
      setFile(selectedFile)
      setError('')
    }
  }

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a PDF file')
      return
    }

    setUploading(true)
    setMessage('')
    setError('')
    try {
      const formData = new FormData()
      formData.append('file', file)

      const res = await fetch('/api/resume', {
        method: 'POST',
        body: formData
      })

      const data = await res.json()
      if (res.ok) {
        setMessage('Resume uploaded successfully!')
        setFile(null)
        loadResumeData()
        setTimeout(() => setMessage(''), 3000)
      } else {
        setError(data.error || 'Failed to upload resume')
      }
    } catch (err) {
      console.error('Upload error:', err)
      setError('Failed to upload resume')
    } finally {
      setUploading(false)
    }
  }

  const formatDate = (date) => {
    if (!date) return 'Unknown'
    const d = date.toDate ? date.toDate() : new Date(date)
    return d.toLocaleString()
  }

  if (loading) {
    return (
      <div className='flex items-center justify-center py-20'>
        <div className='inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-400 border-r-transparent'></div>
      </div>
    )
  }

  return (
    <div className='space-y-8'>
      <div>
        <h1 className='text-3xl font-bold text-white'>Resume</h1>
        <p className='mt-2 text-slate-400'>Upload and manage your resume</p>
      </div>

      {message && (
        <div className='rounded-lg border border-blue-500/40 bg-blue-500/10 p-3 text-sm text-blue-300'>
          {message}
        </div>
      )}

      {error && (
        <div className='rounded-lg border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-300'>
          {error}
        </div>
      )}

      {/* Upload Section */}
      <div className='rounded-xl border border-blue-500/20 bg-slate-900/50 p-6 backdrop-blur-xl'>
        <h2 className='mb-4 text-xl font-semibold text-white'>Upload Resume</h2>
        <div className='space-y-4'>
          <div>
            <label className='mb-2 block text-sm font-medium text-slate-300'>
              Select PDF File (max 10MB)
            </label>
            <input
              type='file'
              accept='application/pdf'
              onChange={handleFileChange}
              className='block w-full text-sm text-slate-400 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white file:hover:bg-blue-700'
            />
            {file && (
              <p className='mt-2 text-sm text-slate-400'>
                Selected: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
              </p>
            )}
          </div>
          <button
            onClick={handleUpload}
            disabled={!file || uploading}
            className='flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-50'
          >
            <Upload className='h-4 w-4' />
            {uploading ? 'Uploading...' : 'Upload Resume'}
          </button>
        </div>
      </div>

      {/* Current Resume */}
      {resumeData?.url && (
        <div className='rounded-xl border border-blue-500/20 bg-slate-900/50 p-6 backdrop-blur-xl'>
          <h2 className='mb-4 text-xl font-semibold text-white'>Current Resume</h2>
          <div className='flex items-center gap-4'>
            <div className='flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/20'>
              <FileText className='h-6 w-6 text-blue-400' />
            </div>
            <div className='flex-1'>
              <p className='font-medium text-white'>{resumeData.filename}</p>
              <p className='text-sm text-slate-400'>{resumeData.url}</p>
            </div>
            <a
              href={resumeData.url}
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center gap-2 rounded-lg border border-blue-500/20 bg-slate-800/50 px-4 py-2 text-sm font-semibold text-slate-300 transition-colors hover:bg-slate-800'
            >
              <Eye className='h-4 w-4' />
              View
            </a>
          </div>
        </div>
      )}

      {/* Download Statistics */}
      <div className='rounded-xl border border-blue-500/20 bg-slate-900/50 p-6 backdrop-blur-xl'>
        <div className='mb-4 flex items-center justify-between'>
          <h2 className='text-xl font-semibold text-white'>
            Download Statistics
          </h2>
          <div className='rounded-full bg-blue-500/20 px-4 py-1 text-sm font-semibold text-blue-300'>
            {downloads.length} Total Downloads
          </div>
        </div>

        {downloads.length > 0 ? (
          <div className='space-y-3'>
            {downloads.slice(0, 20).map((download, index) => (
              <div
                key={download.id || index}
                className='flex items-center justify-between rounded-lg border border-blue-500/10 bg-slate-800/30 p-3'
              >
                <div className='flex items-center gap-3'>
                  <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/20'>
                    <Download className='h-4 w-4 text-blue-400' />
                  </div>
                  <div>
                    <p className='text-sm font-medium text-white'>
                      {download.userAgent || 'Unknown Browser'}
                    </p>
                    <p className='text-xs text-slate-400'>
                      {download.ip || 'Unknown IP'}
                    </p>
                  </div>
                </div>
                <div className='flex items-center gap-2 text-xs text-slate-500'>
                  <Calendar className='h-3 w-3' />
                  {formatDate(download.timestamp)}
                </div>
              </div>
            ))}
            {downloads.length > 20 && (
              <p className='pt-2 text-center text-sm text-slate-400'>
                Showing latest 20 of {downloads.length} downloads
              </p>
            )}
          </div>
        ) : (
          <div className='py-12 text-center'>
            <Download className='mx-auto mb-4 h-12 w-12 text-slate-600' />
            <p className='text-slate-400'>No downloads yet</p>
          </div>
        )}
      </div>
    </div>
  )
}
