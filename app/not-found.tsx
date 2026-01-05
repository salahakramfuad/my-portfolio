import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-[#22103a] via-[#0e1128] to-[#1b1336] px-4">
      <div className="max-w-xl w-full text-center">
        <div className="mb-6">
          <span className="inline-block rounded-full border px-4 py-1 text-xs font-medium tracking-wider uppercase text-violet-300 bg-white/5 border-white/10 opacity-85 shadow-md">
            404 Error
          </span>
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 tracking-tight drop-shadow-lg">
          Page Not Found
        </h1>
        <p className="text-lg text-slate-400 mb-8">
          Sorry, the page you're looking for doesn&apos;t exist or has been moved.<br />
          Don&apos;t worry, you can always get back on track.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium bg-gradient-to-r from-violet-700 to-indigo-500 text-white shadow-lg hover:scale-105 transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
        >
          ← Back to Home
        </Link>
      </div>
      <div className="absolute bottom-0 left-0 pointer-events-none w-full h-52 opacity-30 z-[-1]" aria-hidden="true">
        <svg width="100%" height="100%" viewBox="0 0 1440 160" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 82L60 72.8C120 63.7 240 45.3 360 50.8C480 56.3 600 85.7 720 99.5C840 113.3 960 111.7 1080 92.7C1200 73.7 1320 37.3 1380 19.2L1440 1V161H1380C1320 161 1200 161 1080 161C960 161 840 161 720 161C600 161 480 161 360 161C240 161 120 161 60 161H0V82Z"
            fill="url(#gradient)" 
          />
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="160" gradientUnits="userSpaceOnUse">
              <stop stopColor="#a78bfa" stopOpacity="0.09" />
              <stop offset="1" stopColor="#8b5cf6" stopOpacity="0.16" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  )
}
