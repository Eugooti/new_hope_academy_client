import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import initialState from "../state.js";
import {makeRequest} from "../../utils/Requests/Requests.js";
import {setLocalStorage} from "../../utils/LocalStorage/localStorage.jsx";

export const login=createAsyncThunk(
    "auth/login",
    async (loginData,{rejectWithValue})=>{
        try {
            const [status,response]=await makeRequest({
                url:`/auth/login`,
                method:'POST',
                data:loginData
            })

            if (status === 200) {
                return response;
            } else {
                return rejectWithValue(response);
            }

        }catch (error) {
            return rejectWithValue(error);
        }
    }
)


export const recoveryCode=createAsyncThunk(
    "auth/recovery",
    async (id,{rejectWithValue})=>{
        try {
            const [status,response]=makeRequest({
                url:`/auth/recovery/${id}`,
                method:"GET",
                use_jwt: false,
            })

            if (status === 200) return response.data
            else return rejectWithValue(response.data)


        }catch (error) {
            return rejectWithValue(error.response.data.message)
        }
    }
)

export const checkCode=createAsyncThunk(
    "auth/checkCode",
    async ({id,code},{rejectWithValue})=>{
        try {
            const [status,response]=makeRequest({
                url:`/auth/checkCode/${id}`,
                method:"POST",
                data:code
            })

            if (status === 200)return response
            else return rejectWithValue(response.data)

        }catch (error) {
            return rejectWithValue(error.response.data.message)
        }
    }
)

export const updatePassword=createAsyncThunk(
    "auth/updatePassword",
    async ({data, id},{rejectWithValue})=>{
        try {
            const [status,result] =await makeRequest({
                url:`auth/updatePassword/${id}`,
                method:"PUT",
                data: data
            })

            if (status === 200)return  result
            else return rejectWithValue(result)

        }catch (error) {
            console.log(error)
            return rejectWithValue(error)
        }
    }
)

const authSlice=createSlice({
    name:"auth",
    initialState:initialState.auth,
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(login.pending,(state)=>{
                state.loading=true
                state.error=null
                state.user=null
                state.isLoggedIn=false;
            })
            .addCase(login.rejected,(state,action)=>{
                state.loading=false;
                state.user=null;
                state.isLoggedIn=false;
                state.error=action.payload;
            })
            .addCase(login.fulfilled,(state,action)=>{
                state.loading=false;
                state.isLoggedIn=true;
                state.user=action.payload
                state.error=null;
                setLocalStorage("token",action.payload.token)
                setLocalStorage("user",action.payload.user)
            })
            .addCase(recoveryCode.pending,(state)=>{
                state.loading=true;
            })
            .addCase(recoveryCode.rejected,(state,action)=>{
                state.loading=false;
                state.error=action.payload
            })
            .addCase(checkCode.pending,(state)=>{
                state.loading=true;
            })
            .addCase(checkCode.rejected,(state,action)=>{
                state.loading=false;
                state.error=action.payload
            })
            .addCase(checkCode.fulfilled,(state,action)=>{
                state.loading=false;
                state.check_code_data=action.payload;
            })
            .addCase(updatePassword.pending,(state)=>{
                state.loading=true;
            })
    }
})

export default authSlice.reducer
