import {createAsyncThunk,createSlice} from '@reduxjs/toolkit';
import initialState from "../../state.js";
import {CRUDMethods} from "../../CRUD/index.js";


export const createVacancy = createAsyncThunk(
    'vacancy/createVacancy',
    async (data,{rejectWithValue})=>{
        return await CRUDMethods.create(data,"/hr/vacancy/create",{rejectWithValue})
    }
)


export const readVacancies = createAsyncThunk(
    'vacancy/readVacancy',
    async (_,{rejectWithValue}) => {
        return await CRUDMethods.read("/hr/vacancy/readAll",{rejectWithValue})
    }
)

export const updateVacancy = createAsyncThunk(
    'vacancy/update',
    async ({id,data},{rejectWithValue}) => {
        return await CRUDMethods.update(data,`/hr/vacancy/update/${id}`,{rejectWithValue})
    }
)

export const deleteVacancy = createAsyncThunk(
    'vacancy/delete',
    async (id,{rejectWithValue}) => {
        return await CRUDMethods.remove(`/hr/vacancy/delete/${id}`,{rejectWithValue})
    }
)



const vacancySlice = createSlice({
    name: 'humanResource',
    initialState: initialState.human_resource,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(createVacancy.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.vacancy=null;
            })
            .addCase(createVacancy.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
                state.vacancy = null;
            })
            .addCase(createVacancy.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null
                state.vacancy = action.payload;
            })
            .addCase(readVacancies.pending,state => {
                state.loading = true;
                state.error = null
                state.vacanciesList = null;
            })
            .addCase(readVacancies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
                state.vacanciesList = null;
            })
            .addCase(readVacancies.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null
                state.vacanciesList = action.payload;
            })
            .addCase(updateVacancy.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.vacancy=null;
            })
            .addCase(updateVacancy.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
                state.vacancy = null;
            })
            .addCase(updateVacancy.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null
                state.vacancy = action.payload;
            })
            .addCase(deleteVacancy.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.vacancy=null;
            })
            .addCase(deleteVacancy.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
                state.vacancy = null;
            })
            .addCase(deleteVacancy.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null
                state.vacancy = action.payload;
            })
    }
})

export default vacancySlice.reducer