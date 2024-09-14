import makeRequest from "../../utils/Requests/Requests.js";

export const read = async (url,{rejectWithValue}) => {
  try {
      const [status,result] = await makeRequest({
          method: 'GET',
          url,
          use_jwt:true
      })
      if (status === 200)return result;
      else return rejectWithValue(result)
  }catch(err) {
      return rejectWithValue(err)
  }
}