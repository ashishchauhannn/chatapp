import React from 'react';
import { useSelector } from 'react-redux';
import UseGetOtherUser from '../hooks/useGetOtherUser';
import OtherUser from './OtherUser';
const OtherUsers = () => {
    UseGetOtherUser()
    const { otherUsers } = useSelector(store => store.user)
    if (!otherUsers) return;
    return (
        <div className='overflow-auto flex-1'>
            {
                otherUsers?.map((user) => {
                    return (
                        <OtherUser key={user.id} user={user} />
                    )
                })
            }



        </div>


    )
}

export default OtherUsers
