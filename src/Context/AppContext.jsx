import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import humanizeDuration from 'humanize-duration'



export const AppContext = createContext()

export const AppContextProvider = (props) => {

    const currency = import.meta.env.VITE_CURRENCY


    // ye hai logo click karne par home par aaa jaye

    const navigate = useNavigate()

    const [allCourses, setallCourses] = useState([])

    const [isEducator, setIsEducator] = useState(true)

        const [enrolledCourses, setenrolledCourses] = useState([])


    // fetch All courses

    const fetchAllCourses = async () => {
        setallCourses(dummyCourses)
    }



    // function to calculate average rating of course

    const calculateRating = (course) => {
        if (course.courseRatings.length == 0) {
            return 0;
        }
        let totalRating = 0
        course.courseRatings.forEach(rating => {
            totalRating += rating.rating
        })
        return totalRating / course.courseRatings.length
    }



    // Function to calculte course chapter time

    const calculteChapterTime = (chapter)=>{
        let time =0
        chapter.chapterContent.map((lecture)=> time += lecture.lectureDuration)
        return humanizeDuration(time*60*1000, {units:["h","m"]})
    }


    // function to calculte course duration

    const calculteCourseDuration = (course)=>{
let time=0
course.courseContent.map((chapter)=> chapter.chapterContent.map((lecture) => time+=lecture.lectureDuration))
 return humanizeDuration(time*60*1000, {units:["h","m"]})
    }

// total calculate to no. of lecture in the course 

const calculteNoOfLectures= (course)=>{
    let totalLectures =0;
    course.courseContent.forEach(chapter => {
        if(Array.isArray(chapter.chapterContent)){
            totalLectures +=chapter.chapterContent.length
        }
    })
    return totalLectures;
}

// Fetch User Enrolled Courses
const fetchUserEnrolledCourses = async ()=>{
    setenrolledCourses(dummyCourses)
}


    useEffect(() => {
        fetchAllCourses()
        fetchUserEnrolledCourses()


    }, [])

    const value = {
        currency, allCourses, navigate, calculateRating, isEducator, setIsEducator,calculteCourseDuration,  calculteNoOfLectures,calculteChapterTime, enrolledCourses, fetchUserEnrolledCourses
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

}