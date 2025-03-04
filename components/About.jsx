'use client'
import { FaUser, FaGraduationCap, FaBriefcase, FaCode } from 'react-icons/fa'

const AboutPage = () => {
  return (
    <section className='min-h-screen py-16 px-6 sm:px-10 lg:px-20' id='about '>
      <div className='max-w-4xl mx-auto bg-transparent rounded-xl shadow-lg p-10'>
        {/* Profile Section */}
        <div className='text-center mb-12'>
          <div className='w-36 h-36 mx-auto mb-6 rounded-full overflow-hidden border-4 border-indigo-500 shadow-lg'>
            <img
              src='/images/Fuad.png' // Replace with your actual profile link
              alt='Profile'
              className='w-full h-full object-cover'
            />
          </div>
          <h1 className='text-4xl font-bold text-gray-200'>
            Mohammad Salah Akram Fuad
          </h1>
          <p className='text-lg text-gray-400'>Full stack Developer</p>
        </div>

        {/* About Me */}
        <div className='mb-10'>
          <h2 className='text-2xl font-bold text-gray-200 mb-4 flex items-center'>
            <FaUser className='mr-3 text-indigo-500' /> About Me
          </h2>
          <p className='text-gray-300 leading-relaxed'>
            I'm a passionate frontend developer with 2 years of experience in
            building sleek, modern web applications. I specialize in Next Js,
            JavaScript, and Tailwind CSS, with a keen eye for UI/UX design. When
            I'm not coding, I love exploring new technologies and contributing
            to open-source projects.
          </p>
        </div>

        {/* Education */}
        <div className='mb-10'>
          <h2 className='text-2xl font-bold text-gray-200 mb-4 flex items-center'>
            <FaGraduationCap className='mr-3 text-indigo-500' /> Education
          </h2>
          <div className='space-y-4'>
            {[
              {
                degree: "Bachelor's in Computer Science and Engineering",
                school: 'BRAC University | 2021 - 2025'
              }
            ].map(({ degree, school }) => (
              <div
                key={degree}
                className='p-4 bg-slate-700 rounded-lg shadow-sm'
              >
                <h3 className='font-semibold text-gray-200'>{degree}</h3>
                <p className='text-gray-400'>{school}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Experience */}
        <div className='mb-10'>
          <h2 className='text-2xl font-bold text-gray-200 mb-4 flex items-center'>
            <FaBriefcase className='mr-3 text-indigo-500' /> Experience
          </h2>
          <div className='space-y-4'>
            {[
              {
                title: 'Frontend Developer',
                company: 'International Hope Company LTD | 2024-2025'
              }
            ].map(({ title, company }) => (
              <div
                key={title}
                className='p-4 bg-slate-700 rounded-lg shadow-sm'
              >
                <h3 className='font-semibold text-gray-200'>{title}</h3>
                <p className='text-gray-400'>{company}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div>
          <h2 className='text-2xl font-bold text-gray-200 mb-4 flex items-center'>
            <FaCode className='mr-3 text-indigo-500' /> Skills
          </h2>
          <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
            {[
              'React',
              'TypeScript',
              'JavaScript',
              'Tailwind CSS',
              'Next.js',
              'MySQL',

              'Drizzle',
              'Shadcn',
              'PostgressSQL',
              'GitHub'
            ].map((skill) => (
              <div
                key={skill}
                className='p-3 text-center bg-slate-700 text-gray-200 font-medium rounded-lg shadow-md'
              >
                {skill}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutPage
