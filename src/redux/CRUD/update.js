import {makeRequest} from "../../utils/Requests/Requests.js";

export const update = async (data,url,{rejectWithValue}) => {
    try {
        const [status,result]=await makeRequest({
            url:url,
            method:'PUT',
            data:data,
            use_jwt:true
        })

        if (status===200)return result;
        else return rejectWithValue(result)

    }catch (error) {
        return rejectWithValue(error)
    }
}