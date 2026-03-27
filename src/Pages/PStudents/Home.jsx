import React from 'react'
import Hero from '../../Components/Students/Hero'
import Companies from '../../Components/Students/Companies'
import CoursesSection from '../../Components/Students/CoursesSection'
import TestiMonialSection from '../../Components/Students/TestiMonialSection'
import CallToAction from '../../Components/Students/CallToAction'
import Footer from '../../Components/Students/Footer'

const Home = () => {
  return (
    <div className='flex flex-col items-center space-y-7
    text-center'>
      <Hero/>
      <Companies/>
      <CoursesSection/>
      <TestiMonialSection/>
      <CallToAction/>
      <Footer/>

    </div>
  )
}

export default Home
