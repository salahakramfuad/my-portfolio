import { Geist, Geist_Mono, Inter, Calistoga } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin']
})

const calistoga = Calistoga({
  variable: '--font-calistoga',
  subsets: ['latin'],
  weight: '400'
})

export const metadata = {
  title: 'Mohammad Salah Akram Fuad',
  description: 'A stunning portfolio website showcasing my skills and projects.'
}

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <head>
        <meta charSet='UTF-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${calistoga.variable} bg-slate-950 text-slate-50 antialiased font-sans scroll-smooth`}
        style={{
          background: 'linear-gradient(to bottom, #0e172a 0%, #1e293b 50%, #0e172a 100%)',
        }}
      >
        {children}
      </body>
    </html>
  )
}
