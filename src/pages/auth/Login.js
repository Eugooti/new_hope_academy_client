import axios from "axios";

export const SignIn = async (username,password) => {
    try {
        const response = await axios.post("http://localhost:4500/nha/auth/login", {username,password})

        if (response.data.success){
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


