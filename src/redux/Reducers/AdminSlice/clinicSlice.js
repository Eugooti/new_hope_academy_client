import {createAsyncThunk,createSlice} from "@reduxjs/toolkit";
import initialState from "../../state.js";
import {CRUDMethods} from "../../CRUD/index.js";


export const createLearnerClinicRecord=createAsyncThunk(
    "clinic/create-learner",
    async (data,{rejectWithValue})=>{
        return await CRUDMethods.create(data,'/clinic/create',{rejectWithValue})

    }
)


const examineLearner=createAsyncThunk(
    "clinic/treat",
    async ({id,patientData},{rejectWithValue})=>{
        return await CRUDMethods.update( patientData,`clinic/create/${id}`,{rejectWithValue})
    }
)

const learnerRecord=createAsyncThunk(
    "clinic/read_one_learner",
    async (id,{rejectWithValue})=>{
        return await CRUDMethods.read(`clinic/read/${id}`,{rejectWithValue})
    }
)

const learnersRecords=createAsyncThunk(
    "clinic/learners_record",
    async (_,{rejectWithValue})=>{
        return await CRUDMethods.read("clinic/read",{rejectWithValue})
    }
)


const clinicSlice=createSlice({
    name:"Clinic",
    initialState:initialState.clinic,
    reducers:{},
    extraReducers:builder => {
        builder
            .addCase(createLearnerClinicRecord.pending,state => {
                state.loading=true;
                state.error=null;
                state.learner_data=null
            })
            .addCase(createLearnerClinicRecord.rejected,(state, action) => {
                state.loading=false;
                state.error=action.payload;
                state.learner_data=null
            })
            .addCase(createLearnerClinicRecord.fulfilled,(state, action) => {
                state.loading=false;
                state.error=null;
                state.learner_data=action.payload
            })

            .addCase(examineLearner.pending,state => {
                state.loading=true;
                state.error=null;
                state.learner_data=null
            })
            .addCase(examineLearner.rejected,(state, action) => {
                state.loading=false;
                state.error=action.payload;
                state.learner_data=null
            })
            .addCase(examineLearner.fulfilled,(state, action) => {
                state.loading=false;
                state.error=null;
                state.learner_data=action.payload
            })
            .addCase(learnerRecord.pending,state => {
                state.loading=true;
                state.error=null;
                state.learner_data=null
            })
            .addCase(learnerRecord.rejected,(state, action) => {
                state.loading=false;
                state.error=action.payload;
                state.learner_data=null
            })
            .addCase(learnerRecord.fulfilled,(state, action) => {
                state.loading=false;
                state.error=null;
                state.learner_data=action.payload
            })
            .addCase(learnersRecords.pending,state => {
                state.loading=true;
                state.error=null;
                state.learnersRecord=null
            })
            .addCase(learnersRecords.rejected,(state, action) => {
                state.loading=false;
                state.error=action.payload;
                state.learnersRecord=null
            })
            .addCase(learnersRecords.fulfilled,(state, action) => {
                state.loading=false;
                state.error=null;
                state.learnersRecord=action.payload
            })
    }
})

export default clinicSlice.reducer;
