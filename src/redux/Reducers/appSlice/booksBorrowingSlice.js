import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import initialState from "../../state.js";
import makeRequest from "../../../utils/Requests/Requests.js";


// Async thunk for creating Learner record
export const createLearnerLibraryRecord = createAsyncThunk(
    "library/create-record",
    async (learnerData, { rejectWithValue }) => {
        try {
            const [status, result] = await makeRequest({
                url: "/borrowing/create",
                method: "POST",
                data: learnerData,
                use_jwt: true, // Assuming authentication is required
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
);


export const findLearnerRecord=createAsyncThunk(
    "bookBorrowing/find-learner",
    async (id,{rejectWithValue})=>{
        try {
            const [status,response]=await makeRequest({
                url:`/borrowing/read/${id}`,
                method:'GET',
                use_jwt: false,
            })

            if (status === 200 || status === 304) {
                return response;
            } else {
                return rejectWithValue(response?.message);
            }
        }catch (error){
            return rejectWithValue(error?.response?.data?.message);
        }

    }
)

export const findBorrowingRecord=createAsyncThunk(
    "bookBorrowing/record",
    async (_,{rejectWithValue})=>{
        try {
            const [status, response] = await makeRequest({
                url: "/borrowing/read",
                method: "GET",
                use_jwt: false,
            });

            if (status === 200 || status === 304) {
                return response;
            } else {
                return rejectWithValue(response?.message);
            }
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message);
        }
    }
)
export const findUnreturnedBooks=createAsyncThunk(
    "bookBorrowing/unreturned",
    async (_,{rejectWithValue})=>{
        try {
            const [status, response] = await makeRequest({
                url: "/borrowing/unreturned",
                method: "GET",
                use_jwt: false,
            });

            if (status === 200 || status === 304) {
                return response;
            } else {
                return rejectWithValue(response?.message);
            }
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message);
        }
    }
)
export const bookBorrowing=createAsyncThunk(
    "bookBorrowing/borrow",
    async ({id,data},{rejectWithValue})=>{
        try {
            const [status, response] = await makeRequest({
                url: `/borrowing/borrow/${id}`,
                method: "POST",
                data: data,
                use_jwt: true, // Assuming authentication is required
            });

            if (status === 200) {
                return response;
            } else {
                return rejectWithValue(response);
            }
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)
export const returnBook=createAsyncThunk(
    "bookBorrowing/return",
    async ({id,bookId},{rejectWithValue})=>{
        try {
            const [status, response] = await makeRequest({
                url: `/borrowing/return/${id}`,
                method: "PUT",
                data: bookId,
                use_jwt: true, // Assuming authentication is required
            });

            if (status === 200) {
                return response;
            } else {
                return rejectWithValue(response);
            }
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)


const borrowingSlice=createSlice({
    name:'book_borrowing',
    initialState:initialState.bookBorrowing,
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(createLearnerLibraryRecord.pending,(state)=>{
                state.loading=true;
                state.error=null;
                state.learnerRecord=null
            })
            .addCase(createLearnerLibraryRecord.rejected,(state, action)=>{
                state.loading=false;
                state.error=action.payload;
                state.learnerRecord=null
            })
            .addCase(createLearnerLibraryRecord.fulfilled,(state, action) => {
                state.loading=false;
                state.error=null;
                state.learnerRecord=action.payload
            })

            .addCase(findLearnerRecord.pending,(state)=>{
                state.loading=true;
                state.error=null;
                state.learnerRecord=null
            })
            .addCase(findLearnerRecord.rejected,(state, action)=>{
                state.loading=false;
                state.error=action.payload;
                state.learnerRecord=null
            })
            .addCase(findLearnerRecord.fulfilled,(state, action) => {
                state.loading=false;
                state.error=null;
                state.learnerRecord=action.payload
            })
            .addCase(findBorrowingRecord.pending,(state)=>{
                state.loading=true;
                state.error=null;
                state.borrowingRecord=null
            })
            .addCase(findBorrowingRecord.rejected,(state, action) => {
                state.loading=false;
                state.error=action.payload;
                state.borrowingRecord=null
            })
            .addCase(findBorrowingRecord.fulfilled,(state, action) => {
                state.loading=false;
                state.error=null;
                state.borrowingRecord=action.payload
            })
            .addCase(findUnreturnedBooks.pending,(state)=>{
                state.loading=true;
                state.error=null;
                state.unreturnedBooks=null;
            })
            .addCase(findUnreturnedBooks.rejected,(state, action) => {
                state.loading=false;
                state.error=action.payload;
                state.unreturnedBooks=null;
            })
            .addCase(findUnreturnedBooks.fulfilled,(state, action) => {
                state.loading=false;
                state.error=null;
                state.unreturnedBooks=action.payload;
            })
            .addCase(bookBorrowing.pending,(state)=>{
                state.loading=true;
                state.error=null;
                state.borrowing_response=null;
            })
            .addCase(bookBorrowing.rejected,(state, action) => {
                state.loading=false;
                state.error=action.payload;
                state.borrowing_response=null;
            })
            .addCase(bookBorrowing.fulfilled,(state, action) => {
                state.loading=false;
                state.error=null;
                state.borrowing_response=action.payload;
            })
            .addCase(returnBook.pending,(state)=>{
                state.loading=true;
                state.error=null;
                state.return_response=null;
            })
            .addCase(returnBook.rejected,(state, action) => {
                state.loading=false;
                state.error=action.payload;
                state.return_response=null;
            })
            .addCase(returnBook.fulfilled,(state, action) => {
                state.loading=false;
                state.error=null;
                state.return_response=action.payload;
            })
    }
})

export default borrowingSlice.reducer
