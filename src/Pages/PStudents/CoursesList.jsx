import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../Context/AppContext'
import SearchBar from '../../Components/Students/SearchBar'
import { useParams } from 'react-router-dom'
import CourseCard from '../../Components/Students/CourseCard'
import { assets } from '../../assets/assets'
import Footer from '../../Components/Students/Footer'

const CoursesList = () => {



  const { navigate, allCourses } = useContext(AppContext)

  // ye padhna hai

  const { input } = useParams()

  // ye bana rhe hai kisi chij ko search karne keliye

  const [filteredCourse, setfilteredCourse] = useState([])

  useEffect(() => {
    if (allCourses && allCourses.length > 0) {
      const tempCourses = allCourses.slice()

      input ?
        setfilteredCourse(
          tempCourses.filter(
            item => item.courseTitle.toLowerCase().includes(input.toLocaleLowerCase())
          )
        )
        : setfilteredCourse(tempCourses)
    }
  }, [allCourses, input])




  return (
    <>
      <div className='mt-20 realative md:px-36 px-8 pt-20 text-left'>
        <div className='flex md:flex-row flex-col gap-6 items-start justify-between w-full'>
          <div>
            <h1 className='text-4xl font-semibold text-gray-800'>Course List</h1>
            <p className='text-gray-500 '>
              <span className='text-blue-600 cursor-pointer'
                onClick={() => navigate('/')}
              >Home</span> / Course List</p>
          </div>
          <SearchBar data={input} />
        </div>


{/* ye hai ki aap kya search kiya hai  */}

        {input && <div className='inline-flex items-center gap-4 px-4 py-2 border mt-8 -mb-8 text-gray-600'>
          <p>{input}</p>
          <img src={assets.cross_icon} alt="" className='cursor-pointer' onClick={() =>
            navigate('/course-list')
          } />
        </div>
        }

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-16 gap-3 px-2 md:p-0' >


          {/* for display the course */}


          {filteredCourse.map((course, index) => <CourseCard key={index} course={course} />)}

        </div>

      </div>
      <Footer/>
    </>
  )
}

export default CoursesList
