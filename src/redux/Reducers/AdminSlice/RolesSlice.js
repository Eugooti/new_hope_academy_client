import {createAsyncThunk,createSlice} from "@reduxjs/toolkit";
import initialState from "../../state.js";
import {CRUDMethods} from "../../CRUD/index.js";

const createRole=createAsyncThunk(
    "roles/create",
    async (roleData,{rejectWithValue})=>{
        return await CRUDMethods.create(roleData,`roles/create`,{rejectWithValue})
    }
)

const readRoles=createAsyncThunk(
    "role/read",
    async (_,{rejectWithValue})=>{
        return await CRUDMethods.read(`roles/read`,{rejectWithValue})
    }
)
const updateRole=createAsyncThunk(
    "roles/update",
    async ({id,data},{rejectWithValue})=>{
        return await CRUDMethods.update(data,`roles/update/${id}`,{rejectWithValue})
    }
)
const deleteRole=createAsyncThunk(
    "roles/delete",
    async (id,{rejectWithValue})=>{
        return await CRUDMethods.remove(`roles/delete/${id}`,{rejectWithValue})
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
