import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import Projects from '@/components/Projects'

export default function Home() {
  return (
    <div
      style={{ backgroundImage: 'url(/images/bg.svg)' }}
      className='font-[Inter]'
    >
      <Header />
      <Hero />
      <Projects />
    </div>
  )
}
