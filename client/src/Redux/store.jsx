import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./Userslice";

const store = configureStore({
    reducer:{
        User:UserReducer
    }
})

export default store;