import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../../Context/AppContext'

const CourseDetails = () => {

const {id} = useParams()

const [courseData, setcourseData] = useState(null)

const {allCourses}  = useContext(AppContext)

const fetCourseData = async ()=>{
 const findCourse =  allCourses.find(course =>course._id === id)
 setcourseData(findCourse);
}

useEffect(()=>{
  fetCourseData()
},[])

  return (
    <div className='flex md:flex-row flex-col-reverse gap-10 relative items-start justify-between md:px-36 px-8 md:pt-30 pt-20 text-left'>
      
{/* left column */}
<div></div>

{/* right column */}
<div></div>


    </div>
  )
}

export default CourseDetails
