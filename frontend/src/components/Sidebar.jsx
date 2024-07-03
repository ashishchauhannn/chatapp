import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { BiSearchAlt2 } from "react-icons/bi"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setAuthUser, setOtherUsers } from '../redux/userSlice'
import OtherUsers from './OtherUsers'
const Sidebar = () => {
    const [search, setSearch] = useState("");
    const { otherUsers } = useSelector(store => store.user)
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const logoutHandler = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/api/v1/user/logout`)
            navigate("/login")
            toast.success(res.data.message)
            dispatch(setAuthUser(null))
        } catch (error) {

        }
    }
    const searchSubmitHandler = (e) => {
        e.preventDefault();
        const convoUser = otherUsers?.find((user) => user.fullname.toLowerCase().includes(search.toLowerCase()));
        if (convoUser) {
            dispatch(setOtherUsers([convoUser]))
        } else {
            toast.error("User not found!")
        }
    }
    return (
        <div className='border-r border-slate-500 p-4 flex flex-col'>
            <form onSubmit={searchSubmitHandler} action="" className='flex items-center gap-2'>
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
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
