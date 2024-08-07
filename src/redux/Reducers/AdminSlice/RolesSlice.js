import {createAsyncThunk,createSlice} from "@reduxjs/toolkit";
import initialState from "../../state.js";
import makeRequest from "../../../utils/Requests/Requests.js";

const createRole=createAsyncThunk(
    "roles/create",
    async (roleData,{rejectWithValue})=>{
        try {
            const [status,result]=await makeRequest({
                url:`roles/create`,
                method:'POST',
                data:roleData,
                use_jwt:true
            })
            if (status===200)return result
            else return rejectWithValue(result)
        }catch (error) {
            return rejectWithValue(error)
        }
    }
)

const readRoles=createAsyncThunk(
    "role/read",
    async (_,{rejectWithValue})=>{
        try {
            const [status,result]=await makeRequest({
                url:`roles/read`,
                method:'GET',
                use_jwt:true
            })

            if (status === 200) return result
            else return rejectWithValue(result)

        }catch (error) {
            return rejectWithValue(error)
        }
    }
)
const updateRole=createAsyncThunk(
    "roles/update",
    async ({id,data},{rejectWithValue})=>{
        try {
            const [status,result]=await makeRequest({
                url:`roles/update/${id}`,
                method:'PUT',
                data:data,
                use_jwt:true
            })

            if (status===200)return result;
            else return rejectWithValue(result)

        }catch (error) {
            return rejectWithValue(error)
        }
    }
)
const deleteRole=createAsyncThunk(
    "roles/delete",
    async (id,{rejectWithValue})=>{
        try {
            const [status,result]=await makeRequest({
                url:`roles/delete/${id}`,
                method:"DELETE",
                use_jwt:true
            })

            if (status===200)return result;
            else return rejectWithValue(result)
        }catch (error) {
            return rejectWithValue(error)
        }
    }
)


const rolesSlice=createSlice({
    name:"roles",
    initialState:initialState.role,
    reducers:{},
    extraReducers:builder => {
        builder
            .addCase(createRole.pending,state => {
                state.loading=true
                state.error=null;
                state.role_data=null;
            })
            .addCase(createRole.rejected,(state, action) => {
                state.loading=false;
                state.error=action.payload;
                state.role_data=null;
            })
            .addCase(createRole.fulfilled,(state, action) => {
                state.loading=false;
                state.error=null;
                state.role_data=action.payload;
            })
            .addCase(readRoles.pending,state => {
                state.loading=false;
                state.error=null;
                state.roles=null;
            })
            .addCase(readRoles.rejected,(state, action) => {
                state.loading=false;
                state.error=action.payload;
                state.roles=null;
            })
            .addCase(readRoles.fulfilled,(state, action) => {
                state.loading=false;
                state.error=null;
                state.role_data=action.payload;
            })
            .addCase(updateRole.pending,state => {
                state.loading=true
            })
            .addCase(updateRole.rejected,(state, action) => {
                state.loading=false;
                state.error=action.payload;
                state.role_data=null;
            })
            .addCase(updateRole.fulfilled,(state, action) => {
                state.loading=false;
                state.error=null;
                state.role_data=action.payload;
            })
            .addCase(deleteRole.pending,state => {
                state.loading=true
            })
            .addCase(deleteRole.rejected,(state, action) => {
                state.loading=false;
                state.error=action.payload;
                state.role_data=null;
            })
            .addCase(deleteRole.fulfilled,(state, action) => {
                state.loading=false;
                state.error=null;
                state.role_data=action.payload;
            })
    }
})

export default rolesSlice.reducer
