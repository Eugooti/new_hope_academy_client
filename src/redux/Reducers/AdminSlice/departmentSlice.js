import {createAsyncThunk,createSlice} from "@reduxjs/toolkit";
import initialState from "../../state.js";
import {CRUDMethods} from "../../CRUD/index.js";

export const createDepartment = createAsyncThunk(
    "department/create",
    async (deptData,{rejectWithValue})=>{
        return await CRUDMethods.create(deptData,'department/create',{rejectWithValue})

    }
)

export const fetchDepartments = createAsyncThunk(
    "department/read",
    async (_,{rejectWithValue})=>{
        return await CRUDMethods.read('department/read',{rejectWithValue})
    }
)
export const updateDepartment = createAsyncThunk(
    "department/update",
    async ({id,deptData},{rejectWithValue})=>{
        return await CRUDMethods.update(deptData,`department/update/${id}`,{rejectWithValue})
    }
)
export const deleteDepartment = createAsyncThunk(
    "department/delete",
    async (id,{rejectWithValue})=>{
        return await CRUDMethods.remove(`department/delete/${id}`,{rejectWithValue})
    }
)

const departmentSlice=createSlice({
    name:"Department",
    initialState:initialState.department,
    reducers:{},
    extraReducers:builder => {
        builder
            .addCase(createDepartment.pending,state => {
                state.loading=true;
                state.error=null;
                state.departmentData=null
            })
            .addCase(createDepartment.rejected,(state, action) => {
                state.loading=false;
                state.error=action.payload;
                state.departmentData=null
            })
            .addCase(createDepartment.fulfilled,(state, action) => {
                state.loading=false;
                state.error=null;
                state.departmentData=action.payload
            })
            .addCase(fetchDepartments.pending,state => {
                state.loading=true;
                state.error=null;
                state.departments=null
            })
            .addCase(fetchDepartments.rejected,(state, action) => {
                state.loading=false;
                state.error=action.payload;
                state.departments=null
            })
            .addCase(fetchDepartments.fulfilled,(state, action) => {
                state.loading=false;
                state.error=null;
                state.departments=action.payload;
            })
            .addCase(updateDepartment.pending,state => {
                state.loading=true;
                state.error=null;
                state.departmentData=null
            })
            .addCase(updateDepartment.rejected,(state, action) => {
                state.loading=false;
                state.error=action.payload;
                state.departmentData=null
            })
            .addCase(updateDepartment.fulfilled,(state, action) => {
                state.loading=false;
                state.error=null;
                state.departmentData=action.payload
            })
            .addCase(deleteDepartment.pending,state => {
                state.loading=true;
                state.error=null;
                state.departmentData=null
            })
            .addCase(deleteDepartment.rejected,(state, action) => {
                state.loading=false;
                state.error=action.payload;
                state.departmentData=null
            })
            .addCase(deleteDepartment.fulfilled,(state, action) => {
                state.loading=false;
                state.error=null;
                state.departmentData=action.payload
            })
    }
})

export default departmentSlice.reducer
