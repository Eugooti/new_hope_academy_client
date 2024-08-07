import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import initialState from "../../state.js";
import makeRequest from "../../../utils/Requests/Requests.js";

export const createSchedule = createAsyncThunk(
    "schedule/create",
    async (data,{rejectWithValue})=>{
        try {
            const [status,result] = await makeRequest({
                url:'/schedule/create',
                method:"POST",
                data:data,
                use_jwt:true
            })

            if (status === 200)return result;
            else return rejectWithValue(result)

        }catch (error) {
            return rejectWithValue(error)
        }
    }
)


export const readUserSchedule = createAsyncThunk(
    "readUser/schedule",
    async (uID,{rejectWithValue})=>{
        try {
            const [status,result] = await makeRequest({
                url:`/schedule/read/${uID}`,
                method:"GET",
                use_jwt:true
            })
            if (status === 200)return  result;
            else return rejectWithValue(result);

        }catch (error) {
            return rejectWithValue(error)
        }
    }
)

const scheduleSlice = createSlice({
    name:"schedule",
    initialState: initialState.schedule,
    reducers:{},
    extraReducers:builder => {
        builder
            .addCase(createSchedule.pending,state => {
                state.loading = true;
                state.error = null;
                state.createdSchedule = null
            })
            .addCase(createSchedule.rejected,(state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.createdSchedule = null
            })
            .addCase(createSchedule.fulfilled,(state, action) => {
                state.loading = false;
                state.error = null;
                state.createdSchedule = action.payload
            })
            .addCase(readUserSchedule.pending,state => {
                state.loading = true;
                state.error = null;
                state.userSchedules = null;
            })
            .addCase(readUserSchedule.rejected,(state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.userSchedules = null;
            })
            .addCase(readUserSchedule.fulfilled,(state, action) => {
                state.loading = false;
                state.error = null;
                state.userSchedules = action.payload;
            })
    }
})

export default scheduleSlice.reducer;
