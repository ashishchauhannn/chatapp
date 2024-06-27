import React from 'react'
import { useSelector } from 'react-redux'
import Messages from './Messages'
import Sendinput from './sendinput'
const MessageContainer = () => {
    const { selectedUser } = useSelector(store => store.user);
    return (
        <div className='md:min-w-[550px] flex flex-col'>
            <div className="flex gap-2 items-center bg-slate-700  text-slate-300 font-semibold px-4 py-2 mb-2">
                <div className='avatar online '>
                    <div className='w-12 rounded-full'>
                        <img src={selectedUser?.profilephoto} alt="userprofile" srcset="" />
                    </div>
                </div>
                <div className='flex flex-col flex-1 '>
                    <div className='flex justify-between items-center gap-2 '>
                        <p>{selectedUser?.fullname}</p>
                    </div>
                </div>
            </div>


            <Messages />
            <Sendinput />
        </div>


    )
}

export default MessageContainer
