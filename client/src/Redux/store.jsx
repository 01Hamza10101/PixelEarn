import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./Userslice";
import WalletReducer from "./Walletslice";

const store = configureStore({
    reducer:{
        User:UserReducer,
        Wallet:WalletReducer
    }
})

export default store;