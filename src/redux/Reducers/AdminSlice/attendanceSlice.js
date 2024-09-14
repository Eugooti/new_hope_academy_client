import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import initialState from "../../state.js";
import {CRUDMethods} from "../../CRUD/index.js";

export const createLearnerAttendanceRecord=createAsyncThunk(
    "create/attendance",
    async (data,{rejectWithValue})=>{
        return await CRUDMethods.create(data,"/attendance/create",{rejectWithValue})
    }
)


export const markAttendance=createAsyncThunk(
    "mark/attendance",
    async ({id,data},{rejectWithValue})=>{
        return await CRUDMethods.update(data,`/attendance/mark/${id}`,{rejectWithValue})
    }
)


const attendanceSlice=createSlice({
    name:"Attendance",
    initialState:initialState.attendance,
    reducers:{},
    extraReducers:builder => {
        builder
            .addCase(createLearnerAttendanceRecord.pending,state => {
                state.loading=true;
                state.error=null;
                state.learner_data=null;
            })
            .addCase(createLearnerAttendanceRecord.rejected,(state, action) => {
                state.loading=false;
                state.error=action.payload;
                state.learner_data=null;
            })
            .addCase(createLearnerAttendanceRecord.fulfilled,(state, action) => {
                state.loading=false;
                state.error=null;
                state.learner_data=action.payload;
            })
            .addCase(markAttendance.pending,state => {
                state.loading=true;
                state.error=null;
                state.learner_data=null;
            })
            .addCase(markAttendance.rejected,(state, action) => {
                state.loading=false;
                state.error=action.payload;
                state.learner_data=null;
            })
            .addCase(markAttendance.fulfilled,(state, action) => {
                state.loading=false;
                state.error=null;
                state.learner_data=action.payload;
            })
    }
})


export default attendanceSlice.reducer;
