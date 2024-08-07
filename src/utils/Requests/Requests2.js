import axios from "axios";

// Base URL for API
export const BASE_URL = 'http://localhost:4600/nha';

// Create an axios instance with base URL and default headers
const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "accept": "/",
    },
});

const makeRequests = async ({url,method,data=null}) => {
    let result;
    try {

        result=await instance({
            method: method,
            url: url,
            data: data
        })

    }catch (error) {
        console.log(error)
        result=error
    }
  return result
}

export default makeRequests;
