import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import initialState from "../../state.js";
import makeRequest from "../../../utils/Requests/Requests.js";

export const addEvent=createAsyncThunk(
    "events/add",
    async (event,{rejectWithValue}) => {
        try {
            const [status, result] = await makeRequest({
                url:`/events/create`,
                method:"POST",
                data:event,
            })

            if (status === 200 || status === 304) {
                return result
            }else {
                return rejectWithValue(result.message);
            }

        }catch (error) {
            return rejectWithValue(error.result.data.message);
        }
    }
)

export const getEvents=createAsyncThunk(
    "events/get",
    async (_,{rejectWithValue})=>{
        try {
            const [status,result]=await makeRequest({
                url:"/events/read",
                method:"GET",
                use_jwt: false,
            })
            if (status===200 || status === 304){
                return result
            }else {
                return rejectWithValue(result.message)
            }

        }catch (error) {
            return rejectWithValue(error?.result.data.message);

        }
    }
)


export const getEventsByUser=createAsyncThunk(
    "events/byUser",
    async (user,{rejectWithValue})=>{
        try {
            const [status,result]=await makeRequest({
                url:`/events/read/${user}`,
                method:"GET",
                use_jwt: false,
            })

            if (status === 200 || status === 304) return result
            else return rejectWithValue(result.message)

        }catch (error) {
            return rejectWithValue(error.result.data.message)
        }
    }
)

export const getEventsById=createAsyncThunk(
    "events/id",
    async (id,{rejectWithValue})=>{
        try {
            const [status,result]=await makeRequest({
                url:`/events/read/${id}`,
                method:"GET",
                use_jwt: false,
            })

            if (status === 200 || status === 304) return result
            else return rejectWithValue(result.message)

        }catch (error) {
            return rejectWithValue(error.result.data.message)
        }
    }
)

export const updateEvent=createAsyncThunk(
    "events/update",
    async ({id,eventData},{rejectWithValue})=>{
        try {
            const [status,result]=await makeRequest({
                url:`/events/update/${id}`,
                method:"PUT",
                data:eventData,
                use_jwt:false
            })

            if (status===200)return result;
            else return rejectWithValue(result.message)
        }catch (error) {
            return rejectWithValue(error.result.data.message)
        }
    }
)


export const deleteEvent=createAsyncThunk(
    "events/delete",
    async (id,{rejectWithValue})=>{
        try {
            const [status,result]=await makeRequest({
                url:`/events/delete/${id}`,
                method:"DELETE",
                use_jwt:false
            })

            if (status === 200)return result;
            else return rejectWithValue(result.message)

        }catch (error) {
            return rejectWithValue(error.result.data.message)
        }
    }
)

const eventsSlice=createSlice({
    name:"events",
    initialState:initialState.events,
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(addEvent.pending,(state)=>{
                state.loading = true;
                state.error = null;
            })
            .addCase(addEvent.rejected,(state,action)=>{
                state.loading=false;
                state.error = action.payload;
            })
            .addCase(addEvent.fulfilled,(state,action)=>{
                state.loading=false;
                state.events_data=action.payload;
            })
            .addCase(getEvents.pending,(state)=>{
                state.loading=true;
            })
            .addCase(getEvents.rejected,(state,action)=>{
                state.loading=false;
                state.error=action.payload;
            })
            .addCase(getEvents.fulfilled,(state,action)=>{
                state.loading=false;
                state.events=action.payload;
            })
            .addCase(getEventsByUser.pending,(state)=>{
                state.loading=true
            })
            .addCase(getEventsByUser.rejected,(state,action)=>{
                state.loading=false;
                state.error=action.payload;
            })
            .addCase(getEventsByUser.fulfilled,(state,action)=>{
                state.loading=false;
                state.events=action.payload;
            })
            .addCase(getEventsById.pending,(state)=>{
                state.loading=true
            })
            .addCase(getEventsById.rejected,(state,action)=>{
                state.loading=false;
                state.error=action.payload;
            })
            .addCase(getEventsById.fulfilled,(state,action)=>{
                state.loading=false;
                state.events_data=action.payload;
            })
            .addCase(updateEvent.pending,(state)=>{
                state.loading=true;
            })
            .addCase(updateEvent.rejected,(state,action)=>{
                state.loading=false;
                state.error=action.payload
            })
            .addCase(updateEvent.fulfilled,(state,action)=>{
                state.loading=false;
                state.events_data=action.payload;
            })
            .addCase(deleteEvent.pending,state => {
                state.loading=true;
                state.error=null;
                state.events_data=null
            })
            .addCase(deleteEvent.rejected,(state, action) => {
                state.loading=true;
                state.error=action.payload;
                state.events_data=null
            })
            .addCase(deleteEvent.fulfilled,(state, action) => {
                state.loading=true;
                state.error=null;
                state.events_data=action.payload;
            })
    }
})


export default eventsSlice.reducer;
