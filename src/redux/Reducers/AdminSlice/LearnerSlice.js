import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import initialState from "../../state.js";
import makeRequest from "../../../utils/Requests/Requests.js";

// Admit learner
export const admitLearner = createAsyncThunk(
    "admit-learner",
    async (learnerData, { rejectWithValue }) => {
        try {
            const [status, result] = await makeRequest({
                url: "/learner/create",
                method: "POST",
                data: learnerData,
                use_jwt: true,
            });
            if (status === 200) return result;
            return rejectWithValue(result);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

// Read one learner
export const readOneLearner = createAsyncThunk(
    "read/one/learner",
    async (id, { rejectWithValue }) => {
        try {
            const [status, result] = await makeRequest({
                url: `/student/read/${id}`,
                method: "GET",
                use_jwt: true,
            });
            if (status === 200) return result;
            return rejectWithValue(result);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

// Read all learners
export const readLearners = createAsyncThunk(
    "learners/getAll",
    async (_, { rejectWithValue }) => {
        try {
            const [status, result] = await makeRequest({
                url: "/student/read",
                method: "GET",
                use_jwt: true,
                use_refresh_token: true,
            });

            if (status === 200 || status === 304) {
                return result;
            }
            return rejectWithValue(result?.message);
        } catch (error) {
            return rejectWithValue(error?.result?.data?.message);
        }
    }
);

// Transfer learner to another class
export const transferLearnerToAnotherClass = createAsyncThunk(
    "transfer/learner",
    async ({ learnerData, grade }, { rejectWithValue }) => {
        try {
            const [status, result] = await makeRequest({
                url: `library/update/${grade}`,
                method: "PUT",
                data: learnerData,
                use_jwt: false,
            });

            if (status === 200) {
                return result;
            }
            return rejectWithValue(result?.message);
        } catch (error) {
            return rejectWithValue(error?.result?.data?.message);
        }
    }
);

// Transfer learner to another school
export const transferLearnerToAnotherSchool = createAsyncThunk(
    "transfer/to/another/School",
    async ({ id, grade }, { rejectWithValue }) => {
        try {
            const [status, result] = await makeRequest({
                url: `/students/delete/${id}`,
                method: "POST",
                data: grade,
                use_jwt: true,
            });

            if (status === 200) return result;
            return rejectWithValue(result);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

// Update learner
export const updateLearner = createAsyncThunk(
    "learner/update",
    async ({ id, newData }, { rejectWithValue }) => {
        try {
            const [status, result] = await makeRequest({
                url: `students/update/${id}`,
                method: "PUT",
                data: newData,
                use_jwt: true,
            });

            if (status === 200) return result;
            return rejectWithValue(result);
        } catch (error) {
            return rejectWithValue(error);
        }
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
