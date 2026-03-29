import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext()

export const AppContextProvider = (props) => {

    const currency = import.meta.env.VITE_CURRENCY


    // ye hai logo click karne par home par aaa jaye

    const navigate = useNavigate()

    const [allCourses, setallCourses] = useState([])

    const [isEducator, setIsEducator] = useState(true)


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


    useEffect(() => {
        fetchAllCourses()
    }, [])

    const value = {
        currency, allCourses, navigate, calculateRating, isEducator, setIsEducator
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

}