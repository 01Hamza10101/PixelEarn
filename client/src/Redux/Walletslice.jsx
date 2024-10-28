import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";

export const GetWalletdata = createAsyncThunk("Wallet/GetWalletdata", async (_, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("token");
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const res = await axios.post(`${import.meta.env.VITE_APP_API_URL}/api/Wallet`, { type: "Wallet" }, config);
        return res.data;
    } catch (error) {
        return rejectWithValue({
            message: error.message,
            code: error.code,
            response: error.response?.status
        })
    }
});

export const LevelUPBoosts = createAsyncThunk("Wallet/LevelUPBoosts", async (data, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("token");
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const res = await axios.post(`${import.meta.env.VITE_APP_API_URL}/api/LevelUPBoosts`, data , config);
        console.log(res.data.updatedWallet);
        
        return res.data;
    } catch (error) {
        return rejectWithValue({
            message: error.message,
            code: error.code,
            response: error.response?.status
        })
    }
});

export const PaintPixel = createAsyncThunk("Wallet/PaintPixel", async (data, { rejectWithValue }) => {
    console.log("PaintPixel",data);
    try {
        const token = localStorage.getItem("token");
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const res = await axios.post(`${import.meta.env.VITE_APP_API_URL}/api/PaintPixel`, data , config);
        
        return res.data;
    } catch (error) {
        return rejectWithValue({
            message: error.message,
            code: error.code,
            response: error.response?.status
        })
    }
});

export const ADDTask = createAsyncThunk("Wallet/ADDTask", async (data, { rejectWithValue }) => {
    console.log("PaintPixel",data);
    try {
        const token = localStorage.getItem("token");
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const res = await axios.post(`${import.meta.env.VITE_APP_API_URL}/api/AddTask`, {Task_ID:data} , config);
        
        return res.data;
    } catch (error) {
        return rejectWithValue({
            message: error.message,
            code: error.code,
            response: error.response?.status
        })
    }
});

export const GetTaskBoosts = createAsyncThunk("Wallet/TaskBoosts", async (_, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("token");
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const res = await axios.get(`${import.meta.env.VITE_APP_API_URL}/api/TasksBoosts`, config);
        // if(res){
        //     window.location.reload();
        // }
        // console.log(res)
        return res.data;
    } catch (error) {
        return rejectWithValue({
            message: error.message,
            code: error.code,
            response: error.response?.status
        })
    }
});

export const GetLeaderboarddata = createAsyncThunk("Wallet/Leaderboard", async (_, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("token");
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const res = await axios.get(`${import.meta.env.VITE_APP_API_URL}/api/Leaderboard`);
        return res.data;
    } catch (error) {
        return rejectWithValue({
            message: error.message,
            code: error.code,
            response: error.response?.status
        })
    }
});
const cartSlice = createSlice({
    name: "Wallet",
    initialState: {
        ErrorMsgBackend: {
            display: false,
            success: false,
            msg: "",
            status: ""
        },
        Wallet: "",
        Leaderboard: "",
        TasksBoosts: [],
        CanvasCordinate:[]
    },
    reducers: {
        ErrorHandlerBackendW(state, action) {
            state.ErrorMsgBackend = {
                success: "",
                msg: "",
                status: "500"
            };
            if(action.payload){
                state.ErrorMsgBackend = {
                    display:true,
                    success: false,
                    msg:action.payload,
                    status: "500"
                };
            }
        },
        getToken(state, action) {
            state.Token = localStorage.getItem("token");
        },
        handleCanvasCordinate(state,action){
            state.CanvasCordinate = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(GetWalletdata.fulfilled, (state, action) => {
                state.Wallet = action.payload.newWallet;
            })
            .addCase(GetWalletdata.rejected, (state, action) => {
                console.log(action.payload);
            });
        builder
            .addCase(GetLeaderboarddata.fulfilled, (state, action) => {
                state.Leaderboard = action.payload.data;
                // console.log(action.payload.data);
            })
            .addCase(GetLeaderboarddata.rejected, (state, action) => {
                console.log(action.payload);
            });
        builder
            .addCase(GetTaskBoosts.fulfilled, (state, action) => {
                state.TasksBoosts = action.payload.data;
                console.log(action.payload.data);
            })
            .addCase(GetTaskBoosts.rejected, (state, action) => {
                console.log(action.payload);
            });
        builder
            .addCase(LevelUPBoosts.fulfilled, (state, action) => {
                state.Wallet = action.payload.updatedWallet;
                state.ErrorMsgBackend = action.payload.message.msg;
                console.log(action.payload.message.msg);
            })
            .addCase(LevelUPBoosts.rejected, (state, action) => {
                console.log(action.payload);
            });
            
        builder
        .addCase(PaintPixel.fulfilled, (state, action) => {
            state.Wallet = action.payload.updatedWallet;
            state.ErrorMsgBackend = action.payload.message.msg;
            console.log(action.payload.message.msg);
        })
        .addCase(PaintPixel.rejected, (state, action) => {
            console.log(action.payload);
        });
        builder
        .addCase(ADDTask.fulfilled, (state, action) => {
            state.Wallet = action.payload.newWallet;
            state.ErrorMsgBackend = action.payload.message.msg;
            console.log(action.payload.message.msg);
        })
        .addCase(ADDTask.rejected, (state, action) => {
            console.log(action.payload);
        });    
    }
})

export const { ErrorHandlerBackendW, getToken , handleCanvasCordinate } = cartSlice.actions;
export default cartSlice.reducer;