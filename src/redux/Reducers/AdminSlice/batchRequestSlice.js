import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import initialState from "../../state.js";
import {makeBatchRequest} from "../../../utils/Requests/Requests.js";


export const BatchRequest = createAsyncThunk(
    "batchRequest",
    async (requests,{rejectWithValue})=>{
        try {
            const [status, results] = await makeBatchRequest(requests);
            if (status === 200) return results;
            else return rejectWithValue(requests);
        }catch(error){
            return rejectWithValue(error);
        }
    }
)


const batchRequestSlice = createSlice({
    name: "batchRequest",
    initialState: initialState.batch_requests,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(BatchRequest.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.response = null
            })
            .addCase(BatchRequest.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.response = null
            })
            .addCase(BatchRequest.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.response = action.payload;
            })
    }
})

export default batchRequestSlice.reducer;