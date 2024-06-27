import axios from 'axios'
import React from 'react'
import toast from 'react-hot-toast'
import { BiSearchAlt2 } from "react-icons/bi"
import { useNavigate } from 'react-router-dom'
import OtherUsers from './OtherUsers'
const Sidebar = () => {
    const navigate = useNavigate()
    const logoutHandler = async () => {
        try {

            const res = await axios.get(`http://localhost:8080/api/v1/user/logout`)
            navigate("/login")
            toast.success(res.data.message)
        } catch (error) {

        }
    }
    return (
        <div className='border-r border-slate-500 p-4 flex flex-col'>
            <form action="" className='flex items-center gap-2'>
                <input
                    className='input input-bordered rounded-md  bg-slate-600 text-white'
                    type="text"
                    placeholder='Search...'
                />
                <button type='submit' className='btn bg-slate-500 text-white'>
                    <BiSearchAlt2 size="24px" />
                </button>
            </form>
            <div className='divider px-3'></div>
            <OtherUsers />

            <div className='mt-2'>
                <button onClick={logoutHandler} className='btn btn-sm  bg-slate-700  text-slate-200 '>Logout</button>
            </div>
        </div>
    )
}

export default Sidebar
