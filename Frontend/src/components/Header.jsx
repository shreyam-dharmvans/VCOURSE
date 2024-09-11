import axios from 'axios'
import React from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { userActions } from '../store/userSlice'


export const Header = () => {
    let user = useSelector(store => store.user);
    let navigate = useNavigate()
    let dispatch = useDispatch()


    const handleAllCourses = () => {
        navigate("/");
    }

    const handleLogin = () => {
        navigate("/login")
    }

    const handleSignup = () => {
        navigate("/signup")
    }

    const handleDashboard = () => {
        navigate("/user")
    }



    const handleLogout = async () => {
        navigate("/");

        try {
            toast.loading("Logging out", { id: "logout" });
            let res = await axios.get("/user/logout");
            if (res.status == 200) {
                dispatch(userActions.setCourses(null))
                toast.success("Logged out", { id: "logout" });
            }
        }
        catch (err) {
            toast.error(err.message, { id: "logout" });
        }
    }


    return (
        <nav class="bg-blue-950 dark:bg-gray-900 fixed w-full top-0 start-0 border-b border-gray-200 dark:border-gray-600 header-style z-20">
            <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <div className='flex justify-between max-sm:w-full'>
                    <div className='flex'>
                        <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="Flowbite Logo" />
                        <span class="self-center text-2xl text-white font-semibold whitespace-nowrap dark:text-white ml-3">VCourse</span>
                    </div>
                    <div>
                        <button onClick={handleAllCourses} href="/" class="flex items-center rtl:space-x-reverse sm:mx-10">
                            <span class="self-center text-2xl text-white font-semibold whitespace-nowrap dark:text-white">Home</span>
                        </button>
                    </div>
                </div>


                {user ?
                    <div class="justify-between max-md:mt-3 flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse max-sm:w-full">
                        <button onClick={handleLogout} type="button" class="text-white mr-10 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Logout</button>
                        <button onClick={handleDashboard} type="button" class="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Dashboard</button>
                    </div> :
                    <div class="justify-between max-md:mt-3 flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse max-sm:w-full">
                        <button onClick={handleLogin} type="button" class="text-white mr-10 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
                        <button onClick={handleSignup} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Signup</button>
                    </div>
                }
            </div>
        </nav>
    )
}
