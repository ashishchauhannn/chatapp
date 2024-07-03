import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setselectedUser } from '../redux/userSlice';

const OtherUser = ({ user }) => {
    const dispatch = useDispatch();
    const { selectedUser, onlineUsers } = useSelector(store => store.user)
    const isOnline = onlineUsers?.includes(user._id)
    const selectedUserHandler = (user) => {
        dispatch(setselectedUser(user))
    }
    return (
        <>
            <div onClick={() => selectedUserHandler(user)} className={`${selectedUser?._id === user?._id ? 'bg-slate-700' : ''} flex gap-2 items-center hover:bg-slate-700 text-slate-300 font-semibold rounded-sm p-2 cursor-pointer`}>
                <div className={`avatar ${isOnline ? 'online' : ''}`}>
                    <div className='w-12 rounded-full'>

                        <img src={user?.profilephoto} alt="user-profile" />
                    </div>
                </div>
                <div className='flex flex-col flex-1'>
                    <div className='flex justify-between gap-2 '>
                        <p>{user?.fullname}</p>
                    </div>
                </div>
            </div>
            <div className='divider my-0 py-0 h-1'> </div>
        </>
    )
}

export default OtherUser
