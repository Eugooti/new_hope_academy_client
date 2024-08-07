import {createAsyncThunk,createSlice} from "@reduxjs/toolkit";
import initialState from "../../state.js";
import makeRequest from "../../../utils/Requests/Requests.js";


export const createLearnerClinicRecord=createAsyncThunk(
    "clinic/create-learner",
    async (data,{rejectWithValue})=>{
        try {
            const [status, result] = await makeRequest({
                url:"/clinic/create",
                method:"POST",
                data,
                use_jwt:true
            })
            if (status === 200)return result;
            else return rejectWithValue(result)
        }catch (error) {
            return rejectWithValue(error)
        }
    }
)


const examineLearner=createAsyncThunk(
    "clinic/treat",
    async ({id,patientData},{rejectWithValue})=>{
        try {
            const [status,result] = await makeRequest({
                url:`clinic/create/${id}`,
                method:'POST',
                data:patientData,
                use_jwt:true
            })

            if (status === 200)return result;
            else return rejectWithValue(result)

        }catch (error) {
            return rejectWithValue(error)
        }
    }
)

const learnerRecord=createAsyncThunk(
    "clinic/read_one_learner",
    async (id,{rejectWithValue})=>{
        try {
            const [status,result]= await makeRequest({
                url:`clinic/read/${id}`,
                method:"GET",
                use_jwt:true
            })

            if (status === 200)return result;
            else return rejectWithValue(result)

        }catch (error) {
            return rejectWithValue(error)
        }
    }
)

const learnersRecords=createAsyncThunk(
    "clinic/learners_record",
    async (_,{rejectWithValue})=>{
        try {
            const [status,result] = await makeRequest({
                url:"clinic/read",
                method:"GET",
                use_jwt:true
            })
            if (status === 200) return result;
            else return rejectWithValue(result)
        }catch (error) {
            return rejectWithValue(error)
        }
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
