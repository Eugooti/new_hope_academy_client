import initialState from '../../state.js';
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {CRUDMethods} from "../../CRUD/index.js";


export const createVacancy = createAsyncThunk(
    'vacancy/createVacancy',
    async (data,{rejectWithValue}) => {
        return await CRUDMethods.create(data,'/hr/vacancy/create',{rejectWithValue})
    }
)
export const readVacancies = createAsyncThunk(
    '/vacancy/readVacancy',
    async (_,{rejectWithValue}) => {
        return await CRUDMethods.read('/hr/vacancy/readAll',{rejectWithValue})
    }
)

export const readVacancy = createAsyncThunk(
    '/vacancy/readVacancy',
    async (id,{rejectWithValue}) => {
        return await CRUDMethods.read(`/hr/vacancy/readOne/${id}`,{rejectWithValue})
    }
)

export const updateVacancy = createAsyncThunk(
    '/vacancy/updateVacancy',
    async ({id,data},{rejectWithValue}) => {
        return await CRUDMethods.update(data,`/hr/vacancy/update/${id}`,{rejectWithValue})
    }
)

export const deleteVacancy = createAsyncThunk(
    '/vacancy/deleteVacancy',
    async (id,{rejectWithValue}) => {
        return CRUDMethods.remove(`/hr/vacancy/delete/${id}`,{rejectWithValue})
    }
)
const vacanciesSlice = createSlice({
    name: "vacancies",
    initialState: initialState.human_resource,
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(createVacancy.pending,state => {
                state.loading = true;
                state.error = null;
                state.vacancy = null
            })
            .addCase(createVacancy.rejected,(state, action) => {
                state.loading = false;
                state.error = action.payload
                state.vacancy = null
            })
            .addCase(createVacancy.fulfilled,(state, action) => {
                state.loading = false;
                state.error = null
                state.vacancy = action.payload;
            })


    }
})

export default vacanciesSlice.reducer;