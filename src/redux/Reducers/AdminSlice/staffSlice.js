import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import initialState from "../../state.js";
import makeRequest from "../../../utils/Requests/Requests.js";


export const addStaff=createAsyncThunk(
    "staff/create",
    async (staffData,{rejectWithValue})=>{
        try {
            const [status, response]=await makeRequest({
                url: `/staff/create`,
                method:'POST',
                data:staffData,
                use_jwt: true, // Assuming authentication is required
            })

            if (status === 200) {
                return response;
            } else {
                return rejectWithValue(response);
            }
        }catch (error) {
            return rejectWithValue(error);
        }
    }
)

export const getUserById = createAsyncThunk(
    "getById",
    async (id,{rejectWithValue})=>{
        try {
            const [status,result] = await makeRequest({
                url:`/staff/read/${id}`,
                method:'GET',
                use_jwt:true
            })

            if (status === 200)return result;
            else return rejectWithValue(result)

        }catch (error) {
            return  rejectWithValue(error)

        }
    }
)

export const readStaff=createAsyncThunk(
    "staff/read",
    async (_,{rejectWithValue})=>{
        try {
            const [status,result] = await makeRequest({
                url:'/staff/read',
                method:"GET",
                use_jwt:true
            })

            if (status === 200)return result;
            else return rejectWithValue(result)
        }catch (error) {
            return  rejectWithValue(error)
        }
    }
)

const staffSlice=createSlice({
    name:"Staff",
    initialState:initialState.staff,
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(addStaff.pending,state => {
                state.loading=true;
                state.error=null;
                state.staff_data=null;
            })
            .addCase(addStaff.rejected,(state, action) => {
                state.loading=false;
                state.error=action.payload;
                state.staff_data=null;
            })
            .addCase(addStaff.fulfilled,(state, action) => {
                state.loading=false;
                state.error=null;
                state.staff_data=action.payload;
            })
            .addCase(readStaff.pending,state => {
                state.loading=true;
                state.error=null;
                state.staffList=null;
            })
            .addCase(readStaff.rejected,(state, action) => {
                state.loading=false;
                state.error=action.payload;
                state.staffList=null;
            })
            .addCase(readStaff.fulfilled,(state, action) => {
                state.loading=false;
                state.error=null;
                state.staffList=action.payload;
            })
            .addCase(getUserById.pending,state => {
                state.loading=false;
                state.error=null;
                state.staff_data=null;
            })
            .addCase(getUserById.rejected,(state, action) => {
                state.loading=false;
                state.error=action.payload;
                state.staff_data=null
            })
            .addCase(getUserById.fulfilled,(state, action) => {
                state.loading=false;
                state.error=null;
                state.staff_data=action.payload;
            })
    }
})

export default staffSlice.reducer;
