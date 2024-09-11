import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';




export const CourseDetails = () => {

    const location = useLocation();
    const course = location.state.courseDetails;
    const [expand, setExpand] = useState(false);


    const handleExpand = () => {
        setExpand(true);
    }

    const handleClose = () => {
        setExpand(false);
    }




    return (
        <>
            <div className='mt-40'>
                <div className='flex justify-around'>
                    <div className='text-white mx-[5%] md:w-[70%] bg-black'>
                        <div className='text-white text-center mb-10   text-3xl md:text-5xl'>{course.name}</div>
                        <div className='text-lg md:text-xl flex'>
                            <div className=' md:w-[30%]'>
                                <div>Instructor</div>
                                <div className='mb-8'>Description</div>
                                <div>Enrollment status</div>
                                <div>Course duration</div>
                                <div>Schedule</div>
                                <div>Location</div>
                                <div>Pre-requisites</div>
                            </div>
                            <div className='ml-[5%] md:ml-40 mb-10'>
                                <div className=''>{course.instructor}</div>
                                <div className=''>{course.description}</div>
                                <div className=''>{course.enrollmentStatus}</div>
                                <div className=''>{course.duration}</div>
                                <div className=''>{course.schedule}</div>
                                <div className=''>{course.location}</div>
                                <div className='mb-5'>
                                    {course.prerequisites.map((str, idx) => {
                                        return <div>*&nbsp;{str}</div>
                                    })}
                                </div>
                                {!expand ?
                                    <button onClick={handleExpand} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Syllabus</button>
                                    : <div>
                                        <div>{course.syllabus.map((obj) => {
                                            return <div className='mb-5'>
                                                <div>week &nbsp;{obj.week}</div>
                                                <div>{obj.topic}</div>
                                                <div>{obj.content}</div>
                                            </div>
                                        })}</div>
                                        <button onClick={handleClose} type="button" class="text-white bg-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-red-600 dark:hover:bg-red-600 dark:focus:ring-blue-800 mb-10">Close Syllabus</button>
                                    </div>}

                            </div>



                        </div>


                    </div>
                </div>
            </div >
        </>
    );
}

