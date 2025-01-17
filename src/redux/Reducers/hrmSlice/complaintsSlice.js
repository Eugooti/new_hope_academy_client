import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import initialState from "../../state.js";
import {CRUDMethods} from "../../CRUD/index.js";

export const createComplaint = createAsyncThunk(
    'complaints/create',
    async (data,{rejectWithValue})=>{
        return await CRUDMethods.create(data,'/hr/complaints/create',{rejectWithValue})
    }
)

export const readComplaints = createAsyncThunk(
    'complaints/read',
    async (_,{rejectWithValue})=>{
        return await CRUDMethods.read('/hr/complaints/read',{rejectWithValue})
    }
)

export const updateComplaint = createAsyncThunk(
    'complaints/update',
    async ({data,id},{rejectWithValue})=>{
        return await CRUDMethods.update(data,`/hr/complaints/update/${id}`,{rejectWithValue})
    }
)

export const deleteComplaint = createAsyncThunk(
    'complaints/delete',
    async (id,{rejectWithValue})=>{
        return await CRUDMethods.remove(`/hr/complaints/delete/${id}`,{rejectWithValue})
    }
)

const complaintsSlice = createSlice({
    name: 'complaints',
    initialState:initialState.human_resource,
    reducers: {},
    extraReducers:builder => {
        builder
            .addCase(createComplaint.pending,state => {
                state.loading=true;
                state.error=null;
                state.complaint=null
            })
            .addCase(createComplaint.rejected,(state, action) => {
                state.loading=false;
                state.error=action.payload;
                state.complaint=null
            })
            .addCase(createComplaint.fulfilled,(state, action) => {
                state.loading=false;
                state.error=null;
                state.complaint=action.payload;
            })
            .addCase(readComplaints.pending,state => {
                state.loading=true;
                state.error=null;
                state.complaintsList=null
            })
            .addCase(readComplaints.rejected,(state,action) => {
                state.loading=false;
                state.error=action.payload;
                state.complaintsList=null
            })
            .addCase(readComplaints.fulfilled,(state, action) => {
                state.loading=false;
                state.error=null;
                state.complaintsList=action.payload
            })
            .addCase(updateComplaint.pending,state => {
                state.loading=true;
                state.error=null;
                state.complaint=null
            })
            .addCase(updateComplaint.rejected,(state, action) => {
                state.loading=false;
                state.error=action.payload;
                state.complaint=null
            })
            .addCase(updateComplaint.fulfilled,(state, action) => {
                state.loading=false;
                state.error=null;
                state.complaint=action.payload;
            })
            .addCase(deleteComplaint.pending,state => {
                state.loading=true;
                state.error=null;
                state.complaint=null
            })
            .addCase(deleteComplaint.rejected,(state, action) => {
                state.loading=false;
                state.error=action.payload;
                state.complaint=null
            })
            .addCase(deleteComplaint.fulfilled,(state, action) => {
                state.loading=false;
                state.error=null;
                state.complaint=action.payload;
            })
    }
})

export default complaintsSlice.reducer