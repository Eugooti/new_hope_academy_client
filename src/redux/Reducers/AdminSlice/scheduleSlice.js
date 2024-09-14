import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import initialState from "../../state.js";
import {CRUDMethods} from "../../CRUD/index.js";

export const createSchedule = createAsyncThunk(
    "schedule/create",
    async (data,{rejectWithValue})=>{
        return await CRUDMethods.create(data,"/schedule/create",{rejectWithValue})

    }
)


export const readUserSchedule = createAsyncThunk(
    "readUser/schedule",
    async (id,{rejectWithValue})=>{
        return await CRUDMethods.read(`users/read/${id}`,{rejectWithValue})
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
