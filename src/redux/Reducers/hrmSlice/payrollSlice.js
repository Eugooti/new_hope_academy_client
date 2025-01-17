import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import initialState from "../../state.js";
import {CRUDMethods} from "../../CRUD/index.js";

export const createPayroll = createAsyncThunk(
    'payroll/createPayroll',
    async (data,{rejectWithValue})=>{
        return await CRUDMethods.create(data,'/hr/payroll/create',{rejectWithValue})
    }
)

export const readPayroll = createAsyncThunk(
    'payroll/readPayroll',
    async (_,{rejectWithValue})=>{
        return await CRUDMethods.read('/hr/payroll/read',{rejectWithValue})
    }
)

export const updatePayroll = createAsyncThunk(
    'payroll/updatePayroll',
    async ({id,data},{rejectWithValue})=>{
        return await CRUDMethods.update(data,`/hr/payroll/update/${id}`,{rejectWithValue})
    }
)

export const deletePayroll = createAsyncThunk(
    'payroll/deletePayroll',
    async (id,{rejectWithValue})=>{
        return await CRUDMethods.remove(`/hr/payroll/delete/${id}`,{rejectWithValue})
    }
)

const payrollSlice = createSlice({
    name: "payroll",
    initialState: initialState.human_resource,
    reducers: {},
    extraReducers:builder => {
        builder
            .addCase(createPayroll.pending,state => {
                state.loading = true;
                state.error = null;
                state.payroll =null;
            })
            .addCase(createPayroll.rejected,(state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.payroll =null;
            })
            .addCase(createPayroll.fulfilled,(state, action)=>{
                state.loading = false;
                state.error = null;
                state.payroll =action.payload;
            })
            .addCase(readPayroll.pending,state => {
                state.loading = true;
                state.error = null;
                state.payrollList =null;
            })
            .addCase(readPayroll.rejected,(state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.payrollList =null;
            })
            .addCase(readPayroll.fulfilled,(state, action) => {
                state.loading = false;
                state.error = null;
                state.payrollList =action.payload;
            })
            .addCase(updatePayroll.pending,state => {
                state.loading = true;
                state.error = null;
                state.payroll =null;
            })
            .addCase(updatePayroll.rejected,(state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.payroll =null;
            })
            .addCase(updatePayroll.fulfilled,(state, action)=>{
                state.loading = false;
                state.error = null;
                state.payroll =action.payload;
            })
            .addCase(deletePayroll.pending,state => {
                state.loading = true;
                state.error = null;
                state.payroll =null;
            })
            .addCase(deletePayroll.rejected,(state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.payroll =null;
            })
            .addCase(deletePayroll.fulfilled,(state, action)=>{
                state.loading = false;
                state.error = null;
                state.payroll =action.payload;
            })
    }
})

export default payrollSlice.reducer;