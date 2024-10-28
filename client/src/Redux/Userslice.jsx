import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios";

export const SignupUser = createAsyncThunk("user/Signup",async (data,{rejectWithValue}) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_APP_API_URL}/api/Signup`,data);
        return res.data;
    } catch (error) {
        return rejectWithValue({
          message: error.message,
          code: error.code,
          response: error.response?.status
        })
    }
});

export const LoginUser = createAsyncThunk("user/Login",async (data,{rejectWithValue}) => {
  try {
    const res = await axios.post(`${import.meta.env.VITE_APP_API_URL}/api/Login`,data);
    localStorage.setItem('token',res.data.data.token)
    return res.data;
  } catch (error) {
    return rejectWithValue({
      message: error.response?.data?.message || error.message,
      code: error.code,
      response: error.response?.status
    })
  }
});

export const auth = createAsyncThunk("user/auth",async (data,{rejectWithValue}) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.post(`${import.meta.env.VITE_APP_API_URL}/api/auth`,{type:"auth"},config);
    return res.data;
  } catch (error) {
    return rejectWithValue({
      message: error.response.data.msg,
      code: error.code,
      response: error.response?.status
    })
  }
});

const cartSlice = createSlice({
    name:"User",
    initialState:{
      ErrorMsgBackend:{
        display:false,
        success:false,
        msg:"",
        status:""
      },
      User:"",
      Token:"",
      isAuthorized:""
    },
    reducers:{
      ErrorHandlerBackend (state,action) {
        state.ErrorMsgBackend = {
          success:"",
          msg:"",
          status:"500"
        };
      },
      getToken (state,action){
        state.Token = localStorage.getItem("token");
      }
    },
    extraReducers: (builder) => {
          builder
          .addCase(SignupUser.fulfilled, (state, action) => {
            state.User = action.payload.data;
            state.ErrorMsgBackend = {
              success:action.payload.message.success,
              msg:action.payload.message.msg,
              status:action.payload.status == 200 ? true : false,
              display:true
            };
          })
          .addCase(SignupUser.rejected, (state, action) => {
            state.ErrorMsgBackend = {
              success: action.payload.status == 200 ? true : false ,
              msg: action.payload?.message || "Error during signup",
              status:action.payload.status == 200 ? true : false,
              display:true
            };
          });

          builder
          .addCase(LoginUser.fulfilled, (state, action) => {
            state.User = action.payload.data;
            if(action.payload.message.success){
              state.isAuthorized = true;
            }
            state.ErrorMsgBackend = {
              success:action.payload.message?.success,
              msg:action.payload.message?.msg,
              status:action.payload?.status == 200 ? true : false,
              display:true
            };
          })
          .addCase(LoginUser.rejected, (state, action) => {
            state.ErrorMsgBackend = {
              success: action.payload?.status == 200 ? true : false ,
              msg: action.payload?.message || "Error during Login",
              status:action.payload?.status == 200 ? true : false,
              display:true
            };
          });
          builder.addCase(auth.fulfilled,(state,action)=>{
            state.User = action.payload.user;
            if(action.payload?.message.msg === "Authorized"){
              state.isAuthorized = true;
            }
            // console.log(action.payload?.message.msg)
            // state.ErrorMsgBackend = {
            //   success:action.payload.status == 200 ? true : false,
            //   msg:action.payload.message,
            //   status:action.payload?.status == 200 ? true : false,
            //   display:true
            // }
          })
          .addCase(auth.rejected,(state,action)=>{
            if(action.payload?.message === "Token is not valid"){
              state.isAuthorized = false;
            }
            // console.log(action.payload)
            // state.User = action.payload;
            // state.ErrorMsgBackend = {
            //   success:action.payload.status == 200 ? true : false,
            //   msg:action.payload.message,
            //   status:action.payload?.status == 200 ? true : false,
            //   display:true
            // }
          });
      },

});


export const {ErrorHandlerBackend,getToken} = cartSlice.actions;
export default cartSlice.reducer;