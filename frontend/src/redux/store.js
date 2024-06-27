import { configureStore } from "@reduxjs/toolkit";
import messageReducer from './messageSlice';
import userReducer from './userSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        message: messageReducer
    }
})
export default store;