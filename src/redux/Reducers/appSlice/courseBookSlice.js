import {createAsyncThunk,createSlice} from "@reduxjs/toolkit";
import initialState from "../../state.js";
import {makeRequest} from "../../../utils/Requests/Requests.js";

const addCourseBook=createAsyncThunk(
    "addCoursebook",
    async (data,{rejectWithValue})=>{
        try {
            const [status, result] = await makeRequest({
                url: "/coursebook/create",
                method: "POST",
                data: data,
                use_jwt: true,
            });


            if (status === 200) {
                return result;
            } else {
                return rejectWithValue(result);
            }
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)
const readCourseBook=createAsyncThunk(
    "library/getAllBooks",
    async (_, { rejectWithValue }) => {
        try {
            const [status, result] = await makeRequest({
                url: "/coursebook/read",
                method: "GET",
                use_jwt: true,
                use_refresh_token:true
            });

            if (status === 200 || status === 304) {
                return result;
            } else {
                return rejectWithValue(result?.message);
            }
        } catch (error) {
            return rejectWithValue(error?.result?.data?.message);
        }
    }
)
const updateCourseBook=createAsyncThunk(
    "coursebook/updateBook",
    async ({ bookData, id }, { rejectWithValue }) => {
        try {
            const [status, result] = await makeRequest({
                url: `library/update/${id}`,
                method: "PUT",
                data: bookData,
                use_jwt: true,
            });

            if (status === 200) {
                return result;
            } else {
                return rejectWithValue(result?.message);
            }
        } catch (error) {
            return rejectWithValue(error?.result?.data?.message);
        }
    }
)
const deleteCourseBook=createAsyncThunk(
    "cousebook/delete",
    async (id, { rejectWithValue }) => {
        try {
            const [state, result] = await makeRequest({
                url: `library/delete/${id}`,
                method: "DELETE",
                use_jwt: false,
            });

            if (state === 200) {
                return result;
            } else {
                return rejectWithValue(result?.message);
            }
        } catch (error) {
            return rejectWithValue(error?.result?.data?.message);
        }
    }
)

const courseBookSlice=createSlice({
    name:"coursebook",
    initialState:initialState.coursebook,
    reducers:{},
    extraReducers:builder => {
        builder
            .addCase(addCourseBook.pending,state => {
                state.loading=true;
                state.error=null;
                state.coursebook=null
            })
            .addCase(addCourseBook.rejected,(state, action) => {
                state.loading=false;
                state.error=action.payload;
                state.coursebook=null
            })
            .addCase(addCourseBook.fulfilled,(state, action) => {
                state.loading=false;
                state.error=null;
                state.coursebook=action.payload
            })
            .addCase(readCourseBook.pending,state => {
                state.loading=true;
                state.error=null;
                state.coursebooks=null
            })
            .addCase(readCourseBook.rejected,(state, action) => {
                state.loading=false;
                state.error=action.payload;
                state.coursebooks=null
            })
            .addCase(readCourseBook.fulfilled,(state, action) => {
                state.loading=false;
                state.error=null;
                state.coursebooks=action.payload
            })
            .addCase(updateCourseBook.pending,state => {
                state.loading=true;
                state.error=null;
                state.coursebook=null
            })
            .addCase(updateCourseBook.rejected,(state, action) => {
                state.loading=false;
                state.error=action.payload;
                state.coursebook=null
            })
            .addCase(updateCourseBook.fulfilled,(state, action) => {
                state.loading=false;
                state.error=null;
                state.coursebook=action.payload
            })
            .addCase(deleteCourseBook.pending,state => {
                state.loading=true;
                state.error=null;
                state.coursebook=null
            })
            .addCase(deleteCourseBook.rejected,(state, action) => {
                state.loading=false;
                state.error=action.payload;
                state.coursebook=null
            })
            .addCase(deleteCourseBook.fulfilled,(state, action) => {
                state.loading=false;
                state.error=null;
                state.coursebook=action.payload
            })
    }

})

export default courseBookSlice.reducer
