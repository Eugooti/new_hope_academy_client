import axios from 'axios';
export const checkCode = async (code) => {

    try {
        const id=67765119;
        const check = await axios.post(`http://localhost:4500/nha/auth/checkCode/${id}`, {code});
        if (check.data.success){
            console.log(check);
            return check.data;
        }

    }catch (error) {
        if (error.response){
            console.log(error)
            return error.response.data
        }else {
            return {success: false, message: error.message}
        }
    }

}


export const ChangePassword = async (password) => {
    try {
        const id=67765119;
        const response=await axios.post(`http://localhost:4500/nha/auth/changePassword/${id}`,{password})

        console.log(response)

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
