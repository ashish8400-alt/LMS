import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../../Context/AppContext'
import Loading from '../../Components/Students/Loading'
import { assets } from '../../assets/assets'
import humanizeDuration from 'humanize-duration'

const CourseDetails = () => {

  const { id } = useParams()
  const [courseData, setcourseData] = useState(null)

  const [openSections, setopenSections] = useState({})





  const { allCourses, calculateRating,calculteCourseDuration,  calculteNoOfLectures,calculteChapterTime, currency } = useContext(AppContext)

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

  const toggleSection = (index)=>{
setopenSections((prev)=>({...prev,[index]: !prev[index]}))
  }

// console.log(courseData);
// console.log(courseData?.courseThumbnail);

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
          dangerouslySetInnerHTML={{ __html: courseData.courseDescription.slice(0,200) }}
        ></div>

        {/* review and ratings */}

        
        <div className='flex items-center space-x-2 pt-3 pb-1 text-sm'>
          <p>{calculateRating(courseData)}</p>
          <div className='flex'>

            {/* isko padhana hai */}

            {[...Array(5)].map((_, i) => (<img className='w-3.5 h-3.5'
              key={i} src={i < Math.floor(calculateRating(courseData)) ? assets.star : assets.star_blank} alt='' />))}
          </div>
          <p className='text-blue-600'>({courseData.courseRatings.length}
            {courseData.courseRatings.length > 1 ? 'ratings' : 'rating'})</p>

          <p>{courseData.courseRatings.length} {courseData.courseRatings.length > 1 ? 'students' : 'student'}</p>
        </div>
        <p className='text-sm'>Course by <span className='text-blue-600 underline'>Ashish Tiwari</span></p>
        <div className='pt-8 text-gray-800'>
          <h2 className='text-xl font-semibold'>Course Structure</h2>


          
 {/* this for video    for course Structure  */}

<div className='pt-5'>
  {courseData.courseContent.map((chapter,index)=>(
    <div key={index} className='border border-gray-300 bg-white mb-2 rounded'>
      <div className='flex items-center justify-between px-4 py-3 cursor-pointer select-none' onClick={()=>toggleSection(index)}>
        <div className='flex items-center gap-2'>
          <img 
          className={`transform transition-transform ${openSections[index] ? 'rotate-180' : ''} `}
          src={assets.down_arrow_icon} alt="arrow icon" />
          <p className='font-medium md:text-base text-sm'>{chapter.chapterTitle}</p>
        </div>
        <p className='text-sm md:text-default'>{chapter.chapterContent.length} lectures - {calculteChapterTime(chapter)}</p>
      </div>



<div className={`overflow-hidden transition-all duration-300 ${openSections[index] ? 'max-h-96' : 'max-h-0'}`}>
  <ul className='list-disc md:pl-10 pl-4 pr-4 py-2 text-gray-600 border-t border-gray-300'>
    {chapter.chapterContent.map((lecture, i)=>(
      <li key={i} className='flex items-start gap-2 py-1'>
        <img src={assets.play_icon} alt="play icon"  className='w-4 h-4 mt-1'/>
        <div className='flex items-center justify-between w-full text-gray-800 text-xs md:text-default'>
          <p>{lecture.lectureTitle}</p>
          <div className='flex gap-2'>
            {lecture.isPreviewFree && <p className='text-blue-500 cursor-pointer'>Preview</p>}
            <p>{humanizeDuration(lecture.lectureDuration*60*1000, {units:['h', 'm']})}</p>
          </div>
        </div>
      </li>
    ))}
  </ul>
</div>

    </div>
  ))}
</div>
        </div>


<div className='md:text-default py-20 text-sm'>
  <h3 className='text-xl font-semibold text-gray-800'>Course Description</h3>
   <div
          className="pt-3 rich-text"
          dangerouslySetInnerHTML={{ __html: courseData.courseDescription }}
        ></div>
</div>

      </div>

      {/* right column */}
<div className='z-10 w-full max-w-[380px] md:max-w-[420px] 
h-auto shadow-lg  overflow-hidden bg-white'>   
  <img 
  
  src={courseData.courseThumbnail}
/>
       
       <div className='p-5 '>
        <div className='flex items-center gap-2'>
          <img className='w-3.5' src={assets.time_left_clock_icon} alt="time left clock icon" />
          <p className='text-red-500'> <span className='font-medium'>5 days</span> left at this price!</p>
        </div>


 {/* ye hai currency keliye  */}

        <div className='flex gap-3 items-center pt-2'>
          <p className='text-gray-800 md:text-4xl text-2xl font-semibold'>{currency}{(courseData.coursePrice - courseData.discount*courseData.coursePrice / 100).toFixed(2)}</p>
          <p className='md:text-lg text-gray-500 line-through'>{currency}{courseData.coursePrice}</p>
          <p className='md:text-lg text-green-500'>{courseData.discount}%off</p>
        </div>


        <div className='flex items-center text-sm md:text-default gap-4 pt-2 md:pt-4 text-gray-500'>


<div className='flex items-center gap-1'>
  <img src={assets.star} alt="star icon" />
   <p>{calculateRating(courseData)}</p>
</div>


<div className='h-4 w-px bg-gray-500/40'></div>


<div className='flex items-center gap-1'>
  <img src={assets.time_clock_icon} alt="clock icon" />
   <p>{calculteCourseDuration(courseData)}</p>
</div>


<div className='h-4 w-px bg-gray-500/40'></div>



<div className='flex items-center gap-1'>
  <img src={assets.lesson_icon} alt="clock icon" />
   <p>{calculteNoOfLectures(courseData)} lessons</p>
</div>

        </div>

       </div>
      </div>

    </div>
  ) : <Loading />
}

export default CourseDetails