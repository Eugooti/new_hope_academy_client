import {createAsyncThunk,createSlice} from "@reduxjs/toolkit";
import initialState from "../../state.js";
import makeRequest from "../../../utils/Requests/Requests.js";

export const createDepartment = createAsyncThunk(
    "department/create",
    async (deptData,{rejectWithValue})=>{
        try {
            const [status,result] = await makeRequest({
                url:"department/create",
                method:"POST",
                data:deptData,
                use_jwt:true
            })
            if (status===200)return result;
            else return rejectWithValue(result)

        }catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const fetchDepartments = createAsyncThunk(
    "department/read",
    async (_,{rejectWithValue})=>{
        try {
            const [status,result] = await makeRequest({
                url:'department/read',
                method:"GET",
                use_jwt:true
            })

            if (status===200)return result;
            else return rejectWithValue(result)

        }catch (error) {
            return rejectWithValue(error)
        }
    }
)
export const updateDepartment = createAsyncThunk(
    "department/update",
    async ({id,deptData},{rejectWithValue})=>{
        try {

            const [status,result]=await makeRequest({
                url:`department/update/${id}`,
                method:'PUT',
                data:deptData,
                use_jwt:true
            })

            if (status===200)return result;
            else return rejectWithValue(result)

        }catch (error) {
            return rejectWithValue(error)
        }
    }
)
export const deleteDepartment = createAsyncThunk(
    "department/delete",
    async (id,{rejectWithValue})=>{
        try {

            const [status,result]=await makeRequest({
                url:`department/update/${id}`,
                method:'DELETE',
                use_jwt:true
            })

            if (status===200)return result;
            else return rejectWithValue(result)

        }catch (error) {
            return rejectWithValue(error)
        }
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
