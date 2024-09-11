import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userActions } from '../store/userSlice';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import img1 from '../assets/image-2.png'
import img2 from '../assets/image-3.png'

export const UserDashboard = () => {
    let user = useSelector(store => store.user);
    let dispatch = useDispatch()
    let navigate = useNavigate()



    const viewCourse = (courseDetails) => {
        navigate("/course", { state: { courseDetails } })
    }

    const handleCompleted = async (courseId) => {
        try {

            let res = await axios.put("/user/completed-courses", { courseId })

            if (res.status == 200) {
                toast.success("Course completed", { id: "course" })
                dispatch(userActions.updateCompletedCourses(res.data.course))
            }
        }
        catch (error) {
            toast.error(error.message, { id: "course" })
        }
    }

    let percentage = (user.completedCourses.length / user.enrolledCourses.length) * 100;
    // console.log(percentage)
    if (user.completedCourses.length == 0) {
        percentage = 0;
    }


    return (
        <div>
            <div className='mt-40 mb-10'>
                <div className='text-4xl text-white text-center mb-10'>User Dashboard</div>
                <div>
                    <div class="w-[33%] bg-gray-200 rounded-full dark:bg-gray-700 mb-5 ml-[33%]">
                        <div class="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style={{ width: `${percentage}%` }}> {percentage}%</div>
                    </div>
                </div>

                <div class="relative overflow-x-auto shadow-md sm:rounded-lg student-list">
                    <table class=" w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-white uppercase bg-gray-700 ">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    Course Name
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Instructor's name
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Duedate
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Details
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Mark As Completed
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Thumbnail
                                </th>
                            </tr>
                        </thead>
                        <tbody className=''>
                            {user.enrolledCourses.map((course, idx) => {
                                return <tr>
                                    <th scope="row" class="px-6 py-4 font-medium  whitespace-nowrap dark:text-white">
                                        {course.name}
                                    </th>
                                    <td class="px-6 py-4">
                                        {course.instructor}
                                    </td>
                                    <td class="px-6 py-4">
                                        {course.dueDate.substring(0, 10)}
                                    </td>
                                    <td class="px-6 py-4 text-blue-600">
                                        <button onClick={() => viewCourse(course)}>Course Details</button>
                                    </td>
                                    <td class="px-6 py-4">
                                        <button onClick={() => handleCompleted(course._id)}>Mark As Complete</button>
                                    </td>
                                    <td>
                                        <div className='mb-4'>
                                            {idx % 2 == 0 ?
                                                <img src={img1} className='h-16' alt="" /> :
                                                <img src={img2} className='h-16' alt="" />}

                                        </div>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
            </div>


            {user.completedCourses.length > 0 &&
                <div>
                    <div className='text-white text-center  mt-40 text-2xl mb-4'>Completed Courses</div>
                    <div className=' mb-10'>
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
                                    </tr>
                                </thead>
                                <tbody className=''>
                                    {user.completedCourses.map((course) => {
                                        return <tr>
                                            <th scope="row" class="px-6 py-4 font-medium whitespace-nowrap dark:text-white">
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
                    </div>
                </div>}

        </div>
    )
}
