import { configureStore } from '@reduxjs/toolkit'
import   userReducer  from '../slicecomponet/Slice'
export const store=configureStore ({
    reducer:{
       users: userReducer,
    }
})