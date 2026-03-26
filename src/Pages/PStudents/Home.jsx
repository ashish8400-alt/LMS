import React from 'react'
import Hero from '../../Components/Students/Hero'
import Companies from '../../Components/Students/Companies'
import CoursesSection from '../../Components/Students/CoursesSection'
import TestiMonialSection from '../../Components/Students/TestiMonialSection'

const Home = () => {
  return (
    <div className='flex flex-col items-center space-y-7
    text-center'>
      <Hero/>
      <Companies/>
      <CoursesSection/>
      <TestiMonialSection/>

    </div>
  )
}

export default Home
