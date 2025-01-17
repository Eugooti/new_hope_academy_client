import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import initialState from "../../state.js";
import {CRUDMethods} from "../../CRUD/index.js";

export const createInterview = createAsyncThunk(
    'interview/create',
    async (data, {rejectWithValue}) => {
        return await CRUDMethods.create(data,'/hr/interviews/create',{rejectWithValue})
    }
)

export const readInterviews = createAsyncThunk(
    'interview/read',
    async (_, {rejectWithValue}) => {
        return await CRUDMethods.read('/hr/interviews/read',{rejectWithValue})
    }
)

export const updateInterview = createAsyncThunk(
    'interview/update',
    async ({id,data}, {rejectWithValue}) => {
        return await CRUDMethods.update(data,`/hr/interviews/update/${id}`,{rejectWithValue})
    }
)

export const deleteInterview = createAsyncThunk(
    'interview/delete',
    async (id, {rejectWithValue}) => {
        return await CRUDMethods.remove(`/hr/interviews/delete/${id}`,{rejectWithValue})
    }
)

const interviewsSlice = createSlice({
    name: "interviews",
    initialState: initialState.human_resource,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(createInterview.pending,state => {
                state.loading = true;
                state.error = null;
                state.interview = null;
            })
            .addCase(createInterview.rejected,(state, action)=>{
                state.loading = false;
                state.error = action.payload;
                state.interview = null;
            })
            .addCase(createInterview.fulfilled,(state, action)=>{
                state.loading = false;
                state.error = null;
                state.interview = action.payload;
            })
            .addCase(readInterviews.pending,state => {
                state.loading = true;
                state.error = null;
                state.interviewList = null;
            })
            .addCase(readInterviews.rejected,(state, action)=>{
                state.loading = false;
                state.error = action.payload;
                state.interviewList = null;
            })
            .addCase(readInterviews.fulfilled,(state, action)=>{
                state.loading = false;
                state.error = null;
                state.interviewList = action.payload;
            })
            .addCase(updateInterview.pending,state => {
                state.loading = true;
                state.error = null;
                state.interview = null;
            })
            .addCase(updateInterview.rejected,(state, action)=>{
                state.loading = false;
                state.error = action.payload;
                state.interview = null;
            })
            .addCase(updateInterview.fulfilled,(state, action)=>{
                state.loading = false;
                state.error = null;
                state.interview = action.payload;
            })
            .addCase(deleteInterview.pending,state => {
                state.loading = true;
                state.error = null;
                state.interview = null;
            })
            .addCase(deleteInterview.rejected,(state, action)=>{
                state.loading = false;
                state.error = action.payload;
                state.interview = null;
            })
            .addCase(deleteInterview.fulfilled,(state, action)=>{
                state.loading = false;
                state.error = null;
                state.interview = action.payload;
            })
    }
})

export  default interviewsSlice.reducer