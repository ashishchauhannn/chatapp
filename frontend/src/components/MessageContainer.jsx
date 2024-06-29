import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setselectedUser } from '../redux/userSlice'
import Messages from './Messages'
import Sendinput from './Sendinput'
const MessageContainer = () => {

    const { selectedUser, authUser } = useSelector(store => store.user);
    const dispatch = useDispatch();
    useEffect(() => {
        return () => dispatch(setselectedUser(null));
    }, []);
    return (
        <>
            {
                selectedUser !== null ? (
                    <div className='md:min-w-[550px] flex flex-col'>
                        <div className="flex gap-2 items-center bg-slate-700  text-slate-300 font-semibold px-4 py-2 mb-2">
                            <div className='avatar online '>
                                <div className='w-12 rounded-full'>
                                    <img src={selectedUser?.profilephoto} alt="userprofile" srcset="" />
                                </div>
                            </div>
                            <div className='flex flex-col flex-1 '>
                                <div className='flex justify-between gap-2 '>
                                    <p>{selectedUser?.fullname}</p>
                                </div>
                            </div>
                        </div>

                        <Messages />
                        <Sendinput />
                    </div>
                ) : (
                    <div className='md:min-w-[550px] flex flex-col justify-center items-center '>
                        <h1 className='text-2xl font-semibold text-blue-100'> Hey,</h1>
                        <h1 className='text-2xl font-semibold text-blue-100'> it's {authUser?.fullname}</h1>
                        <h1 className='font-normal  text-blue-100'> Let's talk?</h1>
                    </div>
                )
            }
        </>

    )
}

export default MessageContainer
