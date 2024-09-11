import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { courseActions } from '../store/courseSlice';

export const CourseListing = () => {
    let dispatch = useDispatch();
    let allCourses = useSelector(store => store.course)
    let [filteredCourses, setFilteredCourses] = useState([])
    let search = useRef(null)

    let navigate = useNavigate();

    useEffect(() => {
        const getAllCourses = async () => {
            try {
                toast.loading("fetching data", { id: "fetch" });
                let res = await axios.get("/course/all-courses");


                if (res.status == 200) {
                    dispatch(courseActions.setCourses(res.data.allCourses));

                    toast.success("data fetched", { id: "fetch" });
                }

            } catch (err) {
                toast.error(err.message, { id: "fetch" });
            }

        }

        getAllCourses();
    }, [])



    const viewCourse = async (courseDetails) => {
        navigate("/course", { state: { courseDetails } })
    }

    const likeCourse = async (courseDetails) => {
        try {
            let courseId = courseDetails._id;
            let res = await axios.put("/course/like-course", { courseId });

            if (res.status == 200) {
                toast.success("course liked", { id: "like" })
                dispatch(courseActions.setCourses(res.data.allCourses))
            }
        } catch (error) {
            console.log(error)
            toast.error(error, { id: "like" })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let value = search.current.value;
        //  console.log(value)
        filteredCourses = allCourses.filter((course) => ((course.name == value) || (course.instructor == value)))

        setFilteredCourses(filteredCourses)


    }


    return (
        <div className='mb-10 mt-40'>
            <div className='m-2 mb-10'>
                <form class="max-w-md mx-auto" onSubmit={(e) => handleSubmit(e)}>
                    <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div class="relative">
                        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input type="search" id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Coursename, Instructor..." required ref={search} />
                        <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                    </div>
                </form>
            </div>
            <div>
                {filteredCourses.length > 0 &&
                    <div className='mb-36'>
                        <div className='text-white text-2xl text-center mb-4'>Search Result</div>
                        <div className=' overflow-x-auto shadow-md sm:rounded-lg student-list mb-20'>
                            <table class=" w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead class="text-xs text-white uppercase bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" class="px-6 py-3">
                                            Course Name
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Instructor's name
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Details
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className=''>
                                    {filteredCourses.map((course) => {
                                        return <tr>
                                            <th scope="row" class="px-6 py-4 font-mediu whitespace-nowrap dark:text-white">
                                                {course.name}
                                            </th>
                                            <td class="px-6 py-4">
                                                {course.instructor}
                                            </td>
                                            <td class="px-6 py-4 text-blue-600">
                                                <button onClick={() => viewCourse(course)}>Course Details</button>
                                            </td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>}
            </div>

            <div class="relative overflow-x-auto shadow-md sm:rounded-lg student-list">
                <table class=" w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-white uppercase bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Course Name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Instructor's name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Details
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Course Likes
                            </th>
                        </tr>
                    </thead>
                    <tbody className=''>
                        {allCourses.map((course) => {
                            return <tr>
                                <th scope="row" class="px-6 py-4 font-mediu whitespace-nowrap dark:text-white">
                                    {course.name}
                                </th>
                                <td class="px-6 py-4">
                                    {course.instructor}
                                </td>
                                <td class="px-6 py-4 text-blue-600">
                                    <button onClick={() => viewCourse(course)}>Course Details</button>
                                </td>
                                <td class="px-6 py-4 text-blue-600 flex">
                                    <div className='text-red-600'>{course.likes}</div>
                                    <button onClick={() => likeCourse(course)} className='ml-3'>Like This Course</button>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
