import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import initialState from "../../state.js";
import {CRUDMethods} from "../../CRUD/index.js";

// Admit learner
export const admitLearner = createAsyncThunk(
    "admit-learner",
    async (learnerData, { rejectWithValue }) => {
        return await CRUDMethods.create(learnerData,"/learner/create",{rejectWithValue})
    }
);

// Read one learner
export const readOneLearner = createAsyncThunk(
    "read/one/learner",
    async (id, { rejectWithValue }) => {
        return await CRUDMethods.read(`/learners/readOne/${id}`,{rejectWithValue})
    }
);

// Read all learners
export const readLearners = createAsyncThunk(
    "learners/getAll",
    async (_, { rejectWithValue }) => {
        return await CRUDMethods.read("/student/read",{rejectWithValue})
    }
);

// Transfer learner to another class
export const transferLearnerToAnotherClass = createAsyncThunk(
    "transfer/learner",
    async ({ learnerData, grade }, { rejectWithValue }) => {
        return await CRUDMethods.update(learnerData,`library/update/${grade}`,{rejectWithValue})
    }
);

// Transfer learner to another school
export const transferLearnerToAnotherSchool = createAsyncThunk(
    "transfer/to/another/School",
    async ({ id, grade }, { rejectWithValue }) => {
        return await CRUDMethods.update(grade,`/students/delete/${id}`,{rejectWithValue})

    }
);

// Update learner
export const updateLearner = createAsyncThunk(
    "learner/update",
    async ({ id, newData }, { rejectWithValue }) => {
        return await CRUDMethods.update(newData,`students/update/${id}`,{rejectWithValue})
    }
);

const learnerSlice = createSlice({
    name: "Learners",
    initialState: initialState.learner,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(admitLearner.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(admitLearner.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.learner_data = action.payload;
            })
            .addCase(admitLearner.rejected, (state, action) => {
                state.loading = false;
                state.learner_data = null;
                state.error = action.payload;
            })
            .addCase(readOneLearner.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(readOneLearner.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.learner_data = action.payload;
            })
            .addCase(readOneLearner.rejected, (state, action) => {
                state.loading = false;
                state.learner_data = null;
                state.error = action.payload;
            })
            .addCase(readLearners.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.learners_list = null;
            })
            .addCase(readLearners.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.learners_list = action.payload;
            })
            .addCase(readLearners.rejected, (state, action) => {
                state.loading = false;
                state.learners_list = null;
                state.error = action.payload;
            })
            .addCase(transferLearnerToAnotherClass.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(transferLearnerToAnotherClass.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.learner_data = action.payload;
            })
            .addCase(transferLearnerToAnotherClass.rejected, (state, action) => {
                state.loading = false;
                state.learner_data = null;
                state.error = action.payload;
            })
            .addCase(transferLearnerToAnotherSchool.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(transferLearnerToAnotherSchool.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.learner_data = action.payload;
            })
            .addCase(transferLearnerToAnotherSchool.rejected, (state, action) => {
                state.loading = false;
                state.learner_data = null;
                state.error = action.payload;
            })
            .addCase(updateLearner.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateLearner.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.learner_data = action.payload;
            })
            .addCase(updateLearner.rejected, (state, action) => {
                state.loading = false;
                state.learner_data = null;
                state.error = action.payload;
            });
    },
});

export default learnerSlice.reducer;
