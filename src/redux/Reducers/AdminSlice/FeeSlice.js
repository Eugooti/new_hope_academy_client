import {createAsyncThunk,createSlice} from "@reduxjs/toolkit";
import initialState from "../../state.js";
import makeRequest from "../../../utils/Requests/Requests.js";

export const newFeeItem=createAsyncThunk(
    "new/feeItem",
    async (feeItem,{rejectWithValue})=>{
        try {
            const [status,result]=await makeRequest({
                url:"/fee/create",
                method:'POST',
                data:feeItem,
                use_jwt:true
            })

            if (status === 200)return result
            else return rejectWithValue(result)

        }catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const getFeeItems=createAsyncThunk(
    "read/feeItems",
    async (_,{rejectWithValue})=>{
        try {
            const [status,result] = await makeRequest({
                url:'/fee/read',
                method:"GET",
                use_jwt:true,
            })

            if (status === 200)return result;
            else return rejectWithValue(result)

        }catch (error) {
            return rejectWithValue(error)
        }
    }
)


export const updateFeeItem=createAsyncThunk(
    "update/feeItem",
    async ({id, formData},{rejectWithValue})=>{
        try {
            const [status,result] = await makeRequest({
                url:`/fee/update/${id}`,
                method:"PUT",
                data: formData,
                use_jwt:true
            })
            if (status === 200) return result;
            else return rejectWithValue(result)

        }catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const deleteFeeItem = createAsyncThunk(
    "feeItem/remove",
    async (id, { rejectWithValue }) => {
        try {
            const [status,result] = await makeRequest({
                url:`/fee/delete/${id}`,
                method:"DELETE",
                use_jwt:true
            })
            if (status===200)return result;
            else return rejectWithValue(result);

        } catch (error) {
            return rejectWithValue(error);
        }
    }
);


const feeSlice=createSlice({
    name:"fee",
    initialState:initialState.fee,
    reducers:{},
    extraReducers:(builder=>{
        builder
            .addCase(newFeeItem.pending,state => {
                state.loading=true;
                state.error=null;
                state.feeItem=null;
            })
            .addCase(newFeeItem.rejected,(state, action) => {
                state.loading=false;
                state.error=action.payload;
                state.feeItem=null
            })
            .addCase(newFeeItem.fulfilled,(state, action) => {
                state.loading=false;
                state.error=null;
                state.feeItem=action.payload
            })
            .addCase(getFeeItems.pending,state => {
                state.feeItems=null;
                state.loading=true;
                state.error=null;
            })
            .addCase(getFeeItems.rejected,(state, action) => {
                state.feeItems=null;
                state.loading=false;
                state.error=action.payload;
            })
            .addCase(getFeeItems.fulfilled,(state, action) => {
                state.feeItems=action.payload;
                state.loading=false;
                state.error=null;
            })
            .addCase(updateFeeItem.pending,state => {
                state.loading=true;
                state.error=null;
                state.feeItem=null;
            })
            .addCase(updateFeeItem.rejected,(state, action) => {
                state.loading=false;
                state.error=action.payload;
                state.feeItem=null;
            })
            .addCase(updateFeeItem.fulfilled,(state, action) => {
                state.loading=false;
                state.error=null;
                state.feeItem=action.payload;
            })
            .addCase(deleteFeeItem.pending,state => {
                state.loading=true;
                state.error=null;
                state.feeItem=null;
            })
            .addCase(deleteFeeItem.rejected,(state, action) => {
                state.loading=false;
                state.error=action.payload;
                state.feeItem=null;
            })
            .addCase(deleteFeeItem.fulfilled,(state, action) => {
                state.loading=false;
                state.error=null;
                state.feeItem=action.payload;
            })
    })
})

export default feeSlice.reducer;
