import {createAsyncThunk,createSlice} from "@reduxjs/toolkit";
import initialState from "../../state.js";
import makeRequest from "../../../utils/Requests/Requests.js";

export const createClass=createAsyncThunk(
    "class/create",
    async (classData,{rejectWithValue})=>{
        try {
            const [status,result] = await makeRequest({
                url:'class/create',
                method:"POST",
                data: {...classData,students:[]},
                use_jwt:true
            })

            if (status === 200) return result;
            else rejectWithValue(result)

        }catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const readClasses=createAsyncThunk(
    "class/read",
    async (_,{rejectWithValue})=>{
        try {
            const [status,result] = await makeRequest({
                url:'class/read',
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

export const updateClass=createAsyncThunk(
    "class/update",
    async ({id,classData},{rejectWithValue})=>{
        try {

            const [status,result] = await makeRequest({
                url:`class/update/${id}`,
                method:"PUT",
                data:classData,
                use_jwt:true
            })

                if (status === 200) return result
                else return rejectWithValue(result)
        }catch (error) {
        return rejectWithValue(error)
}
    }
)

export const deleteClass=createAsyncThunk(
    "class/delete",
    async (id,{rejectWithValue})=>{
        try {
            const [status,result] = await makeRequest({
                url:`class/delete/${id}`,
                method:'DELETE',
                use_jwt:true
            })

            if (status === 200)return result
            else return rejectWithValue(result)

        }catch (error){
            return rejectWithValue(error)
        }
    }
)


export const addLearnerToClass=createAsyncThunk(
    "class/addLearner",
    async ({grade,learnerData},{rejectWithValue})=>{
        try {
            const [status,result] = await makeRequest({
                url:`/class/addToClass/${grade}`,
                method:"PUT",
                data: learnerData,
                use_jwt:true
            })

            if (status===200)return result
            else return rejectWithValue(result)

        }catch (error) {
            return rejectWithValue(error)
        }
    }
)

const classSlice=createSlice({
    name:"Classes",
    initialState:initialState.grades,
    reducers:{},
    extraReducers:builder => {
        builder
            .addCase(createClass.pending,(state)=>{
                state.loading=true;
                state.error=null;
                state.classes_data=null;
            })
            .addCase(createClass.rejected,(state, action) => {
                state.loading=false;
                state.error=action.payload;
                state.classes_data=null;
            })
            .addCase(createClass.fulfilled,(state, action)=>{
                state.loading=false;
                state.error=null;
                state.classes_data=action.payload;
            })
            .addCase(readClasses.pending,state => {
                state.loading=true;
                state.error=null;
                state.classList=null;
            })
            .addCase(readClasses.rejected,(state, action) => {
                state.loading=true;
                state.error=action.payload;
                state.classList=null;
            })
            .addCase(readClasses.fulfilled,(state, action) => {
                state.loading=true;
                state.error=null;
                state.classList=action.payload;
            })
            .addCase(updateClass.pending,(state)=>{
                state.loading=true;
                state.error=null;
                state.classes_data=null;
            })
            .addCase(updateClass.rejected,(state, action) => {
                state.loading=false;
                state.error=action.payload;
                state.classes_data=null;
            })
            .addCase(updateClass.fulfilled,(state, action)=>{
                state.loading=false;
                state.error=null;
                state.classes_data=action.payload;
            })
            .addCase(deleteClass.pending,(state)=>{
                state.loading=true;
                state.error=null;
                state.classes_data=null;
            })
            .addCase(deleteClass.rejected,(state, action) => {
                state.loading=false;
                state.error=action.payload;
                state.classes_data=null;
            })
            .addCase(deleteClass.fulfilled,(state, action)=>{
                state.loading=false;
                state.error=null;
                state.classes_data=action.payload;
            })
    }
})


export default classSlice.reducer
