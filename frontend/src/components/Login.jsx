import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setAuthUser } from '../redux/userSlice';
const Login = () => {
    const [user, setUser] = useState
        ({

            username: "",
            password: "",

        });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`http://localhost:8080/api/v1/user/login`, user, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });

            navigate("/")
            toast.success(res.data.message)

            dispatch(setAuthUser(res.data))
        } catch (error) {
            toast.error(error.response.data.message)
            console.log(error)
        }
        console.log(user)

        setUser({

            username: "",
            password: "",

        })
    }
    return (
        <div className="min-w-96 mx-auto">
            <div className='w-full p-6 rounded-lg shadow-md bg-gray-200 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-5 border border-gray-100'>
                <h1 className='text-3xl font-bold  text-gray-300 text-center'>Login</h1>
                <form onSubmit={onSubmitHandler} action="">

                    <div>
                        <label className='label p-2'>
                            <span className='text-base font-bold label-text text-gray-300'>Username</span>
                        </label>
                        <input
                            onChange={(e) => setUser({ ...user, username: e.target.value })}
                            value={user.username}
                            className='w-full input input-bordered h-10 bg-slate-300 text-gray-800 font-semibold'
                            type="text"
                            placeholder='Enter username' />
                    </div>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base font-bold label-text  text-gray-300'>Password</span>
                        </label>
                        <input
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                            value={user.password}
                            className='w-full input input-bordered h-10  bg-slate-300 font-semibold text-gray-800'
                            type="password"
                            placeholder='Enter password' />
                    </div>


                    <p className='text-center my-2   text-gray-300 '>Don't have an account? <Link className="font-semibold" to="/signup"> Signup </Link></p>

                    <div>
                        <button type='submit' className='btn btn-block btn-md mt-2 border  text-gray-300 bg-slate-500 border-slate-700  font-sans font-bold'>Login</button>
                    </div>


                </form>
            </div>

        </div>
    )
}

export default Login
