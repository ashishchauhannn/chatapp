import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMessages } from '../redux/messageSlice';

const useGetMessages = () => {
    const { selectedUser } = useSelector(store => store.user);
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchMessages = async () => {
            axios.defaults.withCredentials = true;
            try {
                const res = await axios.get(`http://localhost:8080/api/v1/message/${selectedUser?._id}`);
                console.log(res)
                dispatch(setMessages(res.data))
            } catch (error) {
                console.log(error)
            }
        }
        fetchMessages();
    }, [selectedUser])

}

export default useGetMessages
