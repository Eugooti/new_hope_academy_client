import {createAsyncThunk,createSlice} from "@reduxjs/toolkit";
import initialState from "../../state.js";
import {makeRequest} from "../../../utils/Requests/Requests.js";

const addItem=createAsyncThunk(
    "create_procurement",
    async (itemData,{rejectWithValue})=>{
        try {
            const [status,result] = makeRequest({
                url:'procurement/create',
                method:'POST',
                data:itemData,
                use_jwt:true
            })

            if (status === 200)return result
            else return  rejectWithValue(result)

        }catch (error) {
            return rejectWithValue(error)
        }
    }
)
const readItems=createAsyncThunk(
    "read_procurements",
    async (_,{rejectWithValue})=>{
        try {
            const [status,result] = makeRequest({
                url:'procurement/create',
                method:'POST',
                use_jwt:true
            })
            if (status === 200)return result
            else return  rejectWithValue(result)

        }catch (error) {
            return rejectWithValue(error)
        }
    }
)
const updateItem=createAsyncThunk(
    "update_procurement",
    async ({id,itemData},{rejectWithValue})=>{
        try {
            const [status,result] = makeRequest({
                url:`procurement/update/${id}`,
                method:'POST',
                data:itemData,
                use_jwt:true
            })
            if (status === 200)return result
            else return  rejectWithValue(result)

        }catch (error) {
            return rejectWithValue(error)
        }
    }
)
const deleteItem=createAsyncThunk(
    "delete_procurement",
    async (id,{rejectWithValue})=>{
        try {
            const [status,result] = makeRequest({
                url:`procurement/delete/${id}`,
                method:'POST',
                use_jwt:true
            })
            if (status === 200)return result
            else return  rejectWithValue(result)

        }catch (error) {
            return rejectWithValue(error)
        }
    }
)

const procurementSlice=createSlice({
    name:"Procurements",
    initialState:initialState.procurement,
    reducers:{},
    extraReducers:builder => {
        builder
            .addCase(addItem.pending,state => {
                state.loading=true;
                state.error=null;
                state.procurement_data=null
            })
            .addCase(addItem.rejected,(state, action) => {
                state.loading=false;
                state.error=action.payload;
                state.procurement_data=null
            })
            .addCase(addItem.fulfilled,(state, action) => {
                state.loading=false;
                state.error=null;
                state.procurement_data=action.payload;
            })
            .addCase(readItems.pending,state => {
                state.loading=true;
                state.error=null;
                state.procurements=null
            })
            .addCase(readItems.rejected,(state, action) => {
                state.loading=false;
                state.error=action.payload;
                state.procurements=null
            })
            .addCase(readItems.fulfilled,(state, action) => {
                state.loading=false;
                state.error=null;
                state.procurements=action.payload;
            })
            .addCase(updateItem.pending,state => {
                state.loading=true;
                state.error=null;
                state.procurement_data=null
            })
            .addCase(updateItem.rejected,(state, action) => {
                state.loading=false;
                state.error=action.payload;
                state.procurement_data=null
            })
            .addCase(updateItem.fulfilled,(state, action) => {
                state.loading=false;
                state.error=null;
                state.procurement_data=action.payload;
            })
            .addCase(deleteItem.pending,state => {
                state.loading=true;
                state.error=null;
                state.procurement_data=null
            })
            .addCase(deleteItem.rejected,(state, action) => {
                state.loading=false;
                state.error=action.payload;
                state.procurement_data=null
            })
            .addCase(deleteItem.fulfilled,(state, action) => {
                state.loading=false;
                state.error=null;
                state.procurement_data=action.payload;
            })

    }
})

export default procurementSlice.reducer
