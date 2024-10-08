import React from 'react'
import { useSelector } from 'react-redux'
import Messages from './Messages'
import Sendinput from './Sendinput'
const MessageContainer = () => {

    const { selectedUser, authUser, onlineUsers } = useSelector(store => store.user);

    const isOnline = onlineUsers?.includes(selectedUser?._id)
    // useEffect(() => {
    //     return () => dispatch(setselectedUser(null));
    // }, []);
    return (
        <>
            {
                selectedUser !== null ? (
                    <div className='md:min-w-[550px] flex flex-col'>
                        <div className="flex gap-3 items-center bg-slate-700  text-slate-300 font-semibold px-4 py-2 mb-2">
                            <div className={`avatar ${isOnline ? 'online' : ''}`}>
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
                        <h1 className='text-2xl font-semibold text-blue-100'> Hey!</h1>
                        <h1 className='text-2xl font-semibold text-blue-100'>  {authUser?.fullname}</h1>
                        <h1 className='font-normal  text-blue-100'> Let's start gossips 💬.</h1>
                    </div>
                )
            }
        </>

    )
}

export default MessageContainer
