import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import initialState from "../../state.js";
import {CRUDMethods} from '../../CRUD/index.js'


export const addStaff=createAsyncThunk(
    "staff/create",
    async (staffData,{rejectWithValue})=>{
        return await CRUDMethods.create(staffData,'/staff/create',{rejectWithValue})

    }
)

export const getUserById = createAsyncThunk(
    "staff/getById",
    async (id,{rejectWithValue})=>{
        return CRUDMethods.read(`/staff/read/${id}`,{rejectWithValue})

    }
)

export const readStaff=createAsyncThunk(
    "staff/read",
    async (_,{rejectWithValue})=>{
        return CRUDMethods.read('/staff/read',{rejectWithValue})
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
