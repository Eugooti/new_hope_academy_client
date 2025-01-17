import {makeRequest} from "../../utils/Requests/Requests.js";

export const create = async (data,url,{rejectWithValue}) => {
  try {
      const [status,result] = await makeRequest({
          method: "POST",
          url,
          use_jwt:true,
          data
      })

      if (status >= 200 && status < 300) return result; // Handle 200-299 status codes
      return rejectWithValue(result);

  }catch(err) {
      return rejectWithValue(err)
  }
}
