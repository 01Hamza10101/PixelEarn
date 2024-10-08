import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios";

export const RegisterUser = createAsyncThunk("user/register",async (data) => {
    try {
        const res = await axios.post('http://localhost:3000/Register',data);
        res.data.msg ? alert(res.data?.msg) : "";
        return res.data;
    } catch (error) {
        return error
    }
});

export const LoginUser = createAsyncThunk("user/Login",async (data) => {
  try {
    const res = await axios.post('http://localhost:30100/login',data);
      // res.data.msg ? alert(res.data?.msg) : "";
      localStorage.setItem('token', res.data.token);
      return res.data;
  } catch (error) {
      return error
  }
});


const cartSlice = createSlice({
    name:"User",
    initialState:{
        User:null,
    },
    reducers:{
    },
    extraReducers: (builder) => {
        builder
          .addCase(RegisterUser.fulfilled, (state, action) => {
            state.User = action.payload;
            state.Error = null;
          })
          .addCase(RegisterUser.rejected, (state, action) => {
            console.log("Registration failed:", action);
            state.Error = action.error.message;
            state.User = null;
          });

          builder.addCase(LoginUser.fulfilled,(state,action)=>{
            state.Msg = action.payload.msg;
          });
      },

});


export const {RemoveMsg} = cartSlice.actions;
export default cartSlice.reducer;