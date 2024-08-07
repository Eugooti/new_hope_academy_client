import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import initialState from "../../state.js";
import makeRequest from "../../../utils/Requests/Requests.js";

// Async thunk for adding a book
export const addBook = createAsyncThunk(
    "library/addBook",
    async (bookData, { rejectWithValue }) => {
        try {
            const [status, result] = await makeRequest({
                url: "/library/create",
                method: "POST",
                data: bookData,
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

// Async thunk for getting all books
export const getAllBooks = createAsyncThunk(
    "library/getAllBooks",
    async (_, { rejectWithValue }) => {
        try {
            const [status, result] = await makeRequest({
                url: "/library/read",
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
);

// Async thunk for updating a book
export const updateBook = createAsyncThunk(
    "library/updateBook",
    async ({ bookData, id }, { rejectWithValue }) => {
        try {
            const [status, result] = await makeRequest({
                url: `library/update/${id}`,
                method: "PUT",
                data: bookData,
                use_jwt: false,
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
);

// Async thunk for deleting a book
export const deleteBook = createAsyncThunk(
    "library/delete",
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
);

const librarySlice = createSlice({
    name: "library",
    initialState: initialState.library,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addBook.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addBook.rejected, (state, action) => {
                state.loading = false;
                state.library_data=null;
                state.error = action.payload;
            })
            .addCase(addBook.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.library_data = action.payload; // Update library_data with the returned book data
            })
            .addCase(getAllBooks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllBooks.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.all_books = action.payload; // Update all_books with the list of all books
            })
            .addCase(getAllBooks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateBook.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateBook.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.library_data = action.payload; // Update library_data with the updated book data
            })
            .addCase(deleteBook.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteBook.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.library_data = action.payload; // Update library_data with the result after deleting the book
            });
    },
});

export default librarySlice.reducer;
