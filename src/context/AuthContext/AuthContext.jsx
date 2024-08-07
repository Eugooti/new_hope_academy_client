import {createContext, useContext, useState} from "react";
import axios from "axios";
const AuthContext=createContext(undefined);

// eslint-disable-next-line react/prop-types
export const AuthProvider=({children})=>{

    const [user, setUser] = useState(null);


    const [AuthToken, setAuthToken] = useState(null);
    const SignIn = async (username,password) => {
        try {
            const response = await axios.post("http://localhost:4500/nha/auth/login", {username,password})


            if (response.data.success){
                const User=response.data.user
                setAuthToken(response.data.token)
                setUser(User)
                return response.data

            }

        }catch (error) {
            if (error.response){
                return error.response.data
            }else {
                return {success: false, message: error.message}
            }
        }
    }

    const Logout=()=>{

    }

    return(
        <AuthContext.Provider value={{user,SignIn,Logout,AuthToken}}>
            {children}
        </AuthContext.Provider>
    )

};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth=()=>useContext(AuthContext)