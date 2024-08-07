import axios from 'axios';

export const CodeRecovery = async (id) => {
    try {
        const response = await axios.get(`http://localhost:4500/nha/auth/recovery/${id}`);
        if (response.data.success){
            console.log(response);
            return response.data;
        }
    }catch (error) {
        if (error.response){
            return error.response.data
        }else {
            return {success: false, message: error.message}
        }
    }

}

export const ResetPassword = async (id) => {

}
