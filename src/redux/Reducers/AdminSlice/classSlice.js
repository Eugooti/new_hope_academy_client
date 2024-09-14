import {createAsyncThunk,createSlice} from "@reduxjs/toolkit";
import initialState from "../../state.js";
import {CRUDMethods} from '../../CRUD/index.js'

export const createClass=createAsyncThunk(
    "classroom/create",
    async (classData,{rejectWithValue})=>{
        return await CRUDMethods.create(classData,'classroom/create',{rejectWithValue})
    }
)

export const readClasses=createAsyncThunk(
    "class/read",
    async (_,{rejectWithValue})=>{
        return await CRUDMethods.read('/classroom/read',{rejectWithValue})
    }
)

export const updateClass=createAsyncThunk(
    "class/update",
    async ({id,classData},{rejectWithValue})=>{
        return await CRUDMethods.update(classData,`classroom/update/${id}`,{rejectWithValue})
    }
)

export const deleteClass=createAsyncThunk(
    "class/delete",
    async (id,{rejectWithValue})=>{
        return await CRUDMethods.remove(`classroom/delete/${id}`,{rejectWithValue})
    }
)


export const addLearnerToClass=createAsyncThunk(
    "class/addLearner",
    async ({grade,learnerData},{rejectWithValue})=>{
        return await CRUDMethods.update(learnerData,`classroom/addLearner/${grade}`,{rejectWithValue})
    }
)

const classSlice=createSlice({
    name:"Classes",
    initialState:initialState.classrooms,
    reducers:{},
    extraReducers:builder => {
        builder
            .addCase(createClass.pending,(state)=>{
                state.loading=true;
                state.error=null;
                state.classroom_data=null;
            })
            .addCase(createClass.rejected,(state, action) => {
                state.loading=false;
                state.error=action.payload;
                state.classroom_data=null;
            })
            .addCase(createClass.fulfilled,(state, action)=>{
                state.loading=false;
                state.error=null;
                state.classroom_data=action.payload;
            })
            .addCase(readClasses.pending,state => {
                state.loading=true;
                state.error=null;
                state.classroomList=null;
            })
            .addCase(readClasses.rejected,(state, action) => {
                state.loading=true;
                state.error=action.payload;
                state.classroomList=null;
            })
            .addCase(readClasses.fulfilled,(state, action) => {
                state.loading=true;
                state.error=null;
                state.classroomList=action.payload;
            })
            .addCase(updateClass.pending,(state)=>{
                state.loading=true;
                state.error=null;
                state.classes_data=null;
            })
            .addCase(updateClass.rejected,(state, action) => {
                state.loading=false;
                state.error=action.payload;
                state.classroom_data=null;
            })
            .addCase(updateClass.fulfilled,(state, action)=>{
                state.loading=false;
                state.error=null;
                state.classes_data=action.payload;
            })
            .addCase(deleteClass.pending,(state)=>{
                state.loading=true;
                state.error=null;
                state.classroom_data=null;
            })
            .addCase(deleteClass.rejected,(state, action) => {
                state.loading=false;
                state.error=action.payload;
                state.classes_data=null;
            })
            .addCase(deleteClass.fulfilled,(state, action)=>{
                state.loading=false;
                state.error=null;
                state.classroom_data=action.payload;
            })
    }
})


export default classSlice.reducer
