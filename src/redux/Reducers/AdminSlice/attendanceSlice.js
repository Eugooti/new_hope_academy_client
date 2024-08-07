import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import initialState from "../../state.js";
import makeRequest from "../../../utils/Requests/Requests.js";

export const createLearnerAttendanceRecord=createAsyncThunk(
    "create/attendance",
    async (data,{rejectWithValue})=>{
        try {
            const [status,result] = await makeRequest({
                url:"/attendance/create",
                method: "POST",
                data:data,
                use_jwt:true
            })
            if (status === 200) return result;
            return rejectWithValue(result);
        }catch (error) {
            return rejectWithValue(error)
        }
    }
)


export const markAttendance=createAsyncThunk(
    "mark/attendance",
    async ({id,data},{rejectWithValue})=>{
        try {
            const [status,result] = await makeRequest({
                url:`/attendance/mark/${id}`,
                method:"PUT",
                data:data,
                use_jwt:true
            })
            if (status === 200) return result;
            return rejectWithValue(result);
        }catch (error) {
            return rejectWithValue(error)
        }
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
