import {createAsyncThunk,createSlice} from "@reduxjs/toolkit";
import initialState from "../../state.js";
import {CRUDMethods} from "../../CRUD/index.js";

export const newFeeItem=createAsyncThunk(
    "new/feeItem",
    async (feeItem,{rejectWithValue})=>{
        return await CRUDMethods.create(feeItem,'/fee/create',{rejectWithValue})
    }
)

export const getFeeItems=createAsyncThunk(
    "read/feeItems",
    async (_,{rejectWithValue})=>{
        return await CRUDMethods.read('/fee/read',{rejectWithValue});
    }
)


export const updateFeeItem=createAsyncThunk(
    "update/feeItem",
    async ({id, formData},{rejectWithValue})=>{
        return await CRUDMethods.update(formData,`/fee/update/${id}`,{rejectWithValue});
    }
)

export const deleteFeeItem = createAsyncThunk(
    "feeItem/remove",
    async (id, { rejectWithValue }) => {
        return await CRUDMethods.remove(`/fee/delete/${id}`,{rejectWithValue});
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
