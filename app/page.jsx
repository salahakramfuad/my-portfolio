import AboutPage from '../components/About'
import ContactFooter from '../components/Contact'
import Header from '../components/Header'
import Hero from '../components/Hero'
import MyReads from '../components/MyReads'
import Projects from '../components/Projects'
import PDFCard from '../components/Resume'

export default function Home() {
  return (
    <div className='font-[Inter]'>
      <Header />

      <Hero />

      <AboutPage />
      <Projects />
      <PDFCard />
      <MyReads />
      <ContactFooter />
    </div>
  )
}
