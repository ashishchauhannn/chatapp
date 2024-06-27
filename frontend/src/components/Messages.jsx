import React from 'react';
import { useSelector } from 'react-redux';
import useGetMessages from '../hooks/useGetMessages';
import Message from "./message";

const Messages = () => {
    useGetMessages();
    const { messages } = useSelector(store => store.message);
    if (!messages) return;
    return (
        <div className="px-4 flex-1 overflow-auto">
            {
                messages?.map((message) => {
                    return (
                        <Message key={message._id} message={message} />
                    )
                })
            }



        </div>
    )
}

export default Messages
