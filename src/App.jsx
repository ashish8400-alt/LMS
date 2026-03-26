import React from 'react'
import './index.css';
import { Route, Routes, useMatch } from 'react-router-dom';
import Home from './Pages/PStudents/Home';
import CoursesList from './Pages/PStudents/CoursesList';
import CourseDetails from './Pages/PStudents/CourseDetails';
import MyEnrollments from './Pages/PStudents/MyEnrollments';
import Player from './Pages/PStudents/Player';
import Loading from './Components/Students/Loading';
import Educator from './Pages/PEducator/Educator'
import Dashboard from './Pages/PEducator/Dashboard'
import AddCourse from './Pages/PEducator/AddCourse'
import MyCourses from './Pages/PEducator/MyCourses'
import StudentEnrolled from './Pages/PEducator/StudentEnrolled'
import Navebar from './Components/Students/Navebar';


const App = () => {

const isEducatorRoute = useMatch('/educator/*')

  return (
    <div className='text-default min-h-screen bg-white'>
      {!isEducatorRoute && <Navebar/>} 

       {/* ye use kar rhe hai kyu ki ham chahte hai mere educator me  navbar nhi dikhe */}
      
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/course-list' element={<CoursesList />} />
        <Route path='/course-list/:input' element={<CoursesList />} />
        <Route path='/course/:id' element={<CourseDetails />} />
        <Route path='/my-enrollments' element={<MyEnrollments />} />
        <Route path='/player/:courseId' element={<Player />} />
        <Route path='/loading/:path' element={<Loading />} />
     

        {/* for educator */}

        <Route path='/educator' element={<Educator />}>
          <Route path='educator' element={<Dashboard />} />
          <Route path='add-course' element={<AddCourse />} />
          <Route path='my-courses' element={<MyCourses />} />
          <Route path='student-enrolled' element={<StudentEnrolled />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
