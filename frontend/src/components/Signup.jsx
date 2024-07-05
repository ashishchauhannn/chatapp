import axios from "axios";
import React, { useState } from 'react';
import toast from "react-hot-toast";
import { Link, useNavigate } from 'react-router-dom';
const Signup = () => {
    const [user, setUser] = useState
        ({
            fullname: "",
            username: "",
            password: "",
            confirmpassword: "",
            gender: "",
        });
    const navigate = useNavigate();
    const handleCheckbox = (gender) => {
        setUser({ ...user, gender })
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`http://localhost:8080/api/v1/user/register`, user, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res.data.success) {
                navigate("/login")
                toast.success(res.data.message)
            }
            console.log(res)
        } catch (error) {
            toast.error(error.response.data.message)
            console.log(error)
        }
        setUser({
            fullname: "",
            username: "",
            password: "",
            confirmpassword: "",
            gender: "",
        })
    }
    return (
        <div className="min-w-96 mx-auto">

            <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100'>
                <h1 className='text-3xl font-bold text-center text-slate-200'>Signup</h1>
                <form onSubmit={onSubmitHandler} action="">
                    <div>
                        <label className='label p-2'>
                            <span className='text-base font-bold text-gray-300 label-text'>Name</span>
                        </label>
                        <input
                            onChange={(e) => setUser({ ...user, fullname: e.target.value })}
                            value={user.fullname}
                            className='w-full input input-bordered h-10'
                            type="text"
                            placeholder='Enter name' />
                    </div>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base font-bold text-gray-300 label-text'>Username</span>
                        </label>
                        <input
                            onChange={(e) => setUser({ ...user, username: e.target.value })}
                            value={user.username}
                            className='w-full input input-bordered h-10'
                            type="text"
                            placeholder='Enter username' />
                    </div>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base font-bold text-gray-300 label-text'>Password</span>
                        </label>
                        <input
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                            value={user.password}
                            className='w-full input input-bordered h-10'
                            type="password"
                            placeholder='Enter password' />
                    </div>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base font-bold text-gray-300 label-text'>Confirm Password</span>
                        </label>
                        <input
                            onChange={(e) => setUser({ ...user, confirmpassword: e.target.value })}
                            value={user.confirmpassword}
                            className='w-full input input-bordered h-10'
                            type="password"
                            placeholder='confirm password' />
                    </div>
                    <div className='flex font-semibold text-gray-300 items-center my-4'>
                        <div className='flex items-center'>
                            <p>Male</p>
                            <input
                                type="checkbox"
                                checked={user.gender === "male"}
                                onChange={() => handleCheckbox("male")}
                                defaultChecked className="checkbox mx-2" />
                        </div>
                        <div className='flex items-center'>
                            <p>Female</p>
                            <input
                                checked={user.gender === "female"}
                                type="checkbox"
                                onChange={() => handleCheckbox("female")}
                                defaultChecked className="checkbox mx-2" />
                        </div>
                    </div>

                    <p className='text-center my-2 font-semibold text-gray-300 '>Already have an account? <Link className="font-semibold" to="/login"> login </Link></p>
                    <div>
                        <button type='submit' className='btn btn-block btn-md mt-2 border  bg-black  border-slate-700 font-bold'>Singup</button>
                    </div>


                </form>
            </div>

        </div>
    )
}

export default Signup
