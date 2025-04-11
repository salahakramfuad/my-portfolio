import About from '@/components/About'
import Contact from '@/components/Contact'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import Projects from '@/components/Projects'
import MyReads from '@/components/MyReads'
import Resume from '@/components/Resume'

export default function Home() {
  return (
    <div
      style={{ backgroundImage: 'url(/images/bg.svg)' }}
      className='font-[Inter]'
    >
      <Header />

      <Hero />
      <Projects />
      <About />
      <Resume />
      <MyReads />
      <Contact />
    </div>
  )
}
