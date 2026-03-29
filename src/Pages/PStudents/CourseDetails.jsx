import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../../Context/AppContext'
import Loading from '../../Components/Students/Loading'
import { assets } from '../../assets/assets'

const CourseDetails = () => {

  const { id } = useParams()
  const [courseData, setcourseData] = useState(null)
  const { allCourses,calculateRating } = useContext(AppContext)

  // course find function
  const fetCourseData = () => {
    const findCourse = allCourses.find(
      course => course._id.toString() === id
    )
    setcourseData(findCourse)
  }

  // jab courses load ho tab run karo
  useEffect(() => {
    if (allCourses && allCourses.length > 0) {
      fetCourseData()
    }
  }, [allCourses, id])

  return courseData ? (
    <div className='flex md:flex-row flex-col-reverse gap-10 relative 
    items-start justify-between md:px-36 px-8 md:pt-24 pt-20 text-left'>

      {/* background */}
      <div className='absolute top-0 left-0 w-full h-screen z-0 bg-gradient-to-b from-cyan-100 to-white'></div>

      {/* left column */}
      <div className='max-w-xl z-10 text-gray-500'>
        <h1 className="text-2xl   md:text-course-deatails-heading-large text-course-deatails-heading-small font-semibold text-gray-800">{courseData.courseTitle}</h1>

        {/* ✅ HTML render here */}
        <div
          className="mt-2 pt-4 md:text-base text-sm"
          dangerouslySetInnerHTML={{ __html: courseData.courseDescription }}
        ></div>

{/* review and ratings */}
<div className='flex items-center space-x-2 pt-3 pb-1 text-sm'>
          <p>{calculateRating(courseData)}</p>
          <div className='flex'>

 {/* isko padhana hai */}

            {[...Array(5)].map((_, i)=>(<img className='w-3.5 h-3.5' 
            key={i} src={i< Math.floor(calculateRating(courseData)) ? assets.star : assets.star_blank} alt='' />) )}
          </div>
          <p className='text-blue-600'>({courseData.courseRatings.length}
             {courseData.courseRatings.length > 1 ? 'ratings' : 'rating'})</p>

             <p>{courseData.courseRatings.length} {courseData.courseRatings.length > 1 ?  'students' : 'student'}</p>
        </div>
<p className='text-sm'>Course by <span className='text-blue-600 underline'>Ashish Tiwari</span></p>


      </div>

      {/* right column */}
      <div className='relative z-10'>
        {/* future content */}
      </div>

    </div>
  ) : <Loading />
}

export default CourseDetails