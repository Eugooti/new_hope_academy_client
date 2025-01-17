import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import initialState from "../../state.js";
import {CRUDMethods} from "../../CRUD/index.js";


export const createAssessment = createAsyncThunk(
    'assessment/create',
    async (data,{rejectWithValue})=>{
        return await CRUDMethods.create(data,'/classroom/assessment/create',{rejectWithValue})
    }
)

export const readAssessments = createAsyncThunk(
    'assessments/read',
    async (_,{rejectWithValue})=>{
        return await CRUDMethods.read('/classroom/assessment/read',{rejectWithValue})
    }
)

export const readOneAssessment = createAsyncThunk(
    'assessment/read',
    async (id,{rejectWithValue})=>{
        return await CRUDMethods.read(`/assessment/read/${id}`,{rejectWithValue})
    }
)

export const captureAssessments= createAsyncThunk(
    'assessment/update',
    async ({id,data},{rejectWithValue})=>{
        console.log(data)
        return await CRUDMethods.update(data,`/classroom/assessment/outcome/${id}`,{rejectWithValue})
    }
)

export const deleteAssessment = createAsyncThunk(
    'assessment/delete',
    async (id,{rejectWithValue})=>{
        return await CRUDMethods.remove(`/assessment/delete/${id}`,{rejectWithValue})
    }
)


const assessmentSlice = createSlice({
    name:'assessments',
    initialState:initialState.assessments,
    reducers:{},
    extraReducers:builder => {
        builder
            .addCase(createAssessment.pending,state => {
                state.loading=true;
                state.error=null;
                state.assessment=null;
            })
            .addCase(createAssessment.rejected,(state,action) => {
                state.loading=false;
                state.error=action.payload;
                state.assessment=null;
            })
            .addCase(createAssessment.fulfilled,(state,action) => {
                state.loading=false;
                state.error=null;
                state.assessment=action.payload;
            })
            .addCase(readAssessments.pending,state => {
                state.loading=true;
                state.error=null;
                state.assessments=null;
            })
            .addCase(readAssessments.rejected,(state, action) => {
                state.loading=false;
                state.error=action.payload;
                state.assessments=null;
            })
            .addCase(readAssessments.fulfilled,(state, action) => {
                state.loading=false;
                state.error=null;
                state.assessments=action.payload;
            })
            .addCase(readOneAssessment.pending,state => {
                state.loading=true;
                state.error=null;
                state.assessment=null;
            })
            .addCase(readOneAssessment.rejected,(state, action) => {
                state.loading=false;
                state.error=action.payload;
                state.assessment=null;
            })
            .addCase(readOneAssessment.fulfilled,(state, action) => {
                state.loading=false;
                state.error=null;
                state.assessment=action.payload;
            })
            .addCase(captureAssessments.pending,state => {
                state.loading=true;
                state.error=null;
                state.assessment=null;
            })
            .addCase(captureAssessments.rejected,(state, action) => {
                state.loading=false;
                state.error=action.payload;
                state.assessment=null;
            })
            .addCase(captureAssessments.fulfilled,(state, action) => {
                state.loading=false;
                state.error=null;
                state.assessment=action.payload;
            })
            .addCase(deleteAssessment.pending,state => {
                state.loading=true;
                state.error=null;
                state.assessment=null;
            })
            .addCase(deleteAssessment.rejected,(state, action) => {
                state.loading=false;
                state.error=action.payload;
                state.assessment=null;
            })
            .addCase(deleteAssessment.fulfilled,(state, action) => {
                state.loading=false;
                state.error=null;
                state.assessment=action.payload;
            })


    }
})

export default assessmentSlice.reducer