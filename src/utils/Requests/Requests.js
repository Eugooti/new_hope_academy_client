import axios from "axios";
import {getFromSessionStorage, removeSessionItem, setSessionStorage} from "../LocalStorage/sessionStorage.jsx";

// Base URL for API
export const BASE_URL = 'http://localhost:4600/nha';

// Create an axios instance with base URL and default headers
export const instance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,  // Ensure cookies are sent with requests
    headers: {
        "accept": "/",
    },
});

// Utility function to remove user data from local storage and navigate to login
const navigateToLogin = async () => {
    await removeSessionItem('user');
    window.location.href = "/login";
};

// Function to set a flag indicating user update should be skipped
const setSkipUserUpdateFlag = () => {
    localStorage.setItem('skipUserUpdate', 'true');
};

// Function to check if user update should be skipped
const shouldSkipUserUpdate = () => {
    return localStorage.getItem('skipUserUpdate') === 'true';
};

// Function to refresh access token
const refreshAccessToken = async () => {
    try {
        return await instance.post('/auth/refresh-token');
    } catch (error) {
        console.error('Error refreshing access token:', error);
        return null;
    }
};

// Axios interceptor to handle responses and errors
instance.interceptors.response.use(
    async response => {
        const status = response?.data?.status;
        if (status === 401) {
            setSkipUserUpdateFlag();
            if (window.location.pathname !== "/login") {
                await navigateToLogin();
            }
        }
        return response;
    },
    async error => {
        const status = error.response?.status;
        if (status === 401) {
            const newAccessToken = await refreshAccessToken();
            if (newAccessToken.status===200){
                const originalRequest = error.config;
                return instance(originalRequest);
            }else {
                await navigateToLogin()
            }
        }else if (status === 403) {
            await navigateToLogin()
        }
        return Promise.reject(error);
    }
);

// Function to make HTTP request
const makeRequest = async ({ url, method, data = null, use_jwt = false }) => {
    const token = getFromSessionStorage('token');
    const user = getFromSessionStorage('user');

    const headers = {
        "content-type": "application/json",
        referrerPolicy: "no-referrer",
        redirect: 'follow',
        mode: 'cors',
        cache: 'no-cache',
        ...(use_jwt && token ? { Authorization: `Bearer ${token}` } : {}),
    };

    try {
        const response = await instance(
            method !== "DELETE"
                ? { url, data, headers, method }
                : { url, headers, method }
        );

        const result = response.data;
        const status = response.status;
        return [status, result];
    } catch (error) {
        if (error.response) {
            const status = error.response.status;
            const result = error.response.data;
            return [status, result];
        } else {
            const status = error.status || 500;
            const result = { message: error.message };
            return [status, result];
        }
    } finally {
        if (!shouldSkipUserUpdate()) {
            setSessionStorage('user', user);
        } else {
            removeSessionItem('skipUserUpdate');
        }
    }
};


// Function to make batch request

// New function to make batch request
const makeBatchRequest = async (requests) => {
    const token = getFromSessionStorage('token');
    const user = getFromSessionStorage('user');

    const headers = {
        "content-type": "application/json",
        referrerPolicy: "no-referrer",
        redirect: 'follow',
        mode: 'cors',
        cache: 'no-cache',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    try {
        const batchRequests = requests.map(req => ({
            method: req.method,
            url: req.url,
            data: req.data,
            headers: {
                ...headers,
                ...(req.headers || {}),  // Include any additional headers from the request
            },
        }));

        // Send the batch request to the server
        const response = await instance.post('/batch', { requests: batchRequests }, { headers });

        const result = response.data;
        const status = response.status;
        return [status, result];
    } catch (error) {
        if (error.response) {
            const status = error.response.status;
            const result = error.response.data;
            return [status, result];
        } else {
            const status = error.status || 500;
            const result = { message: error.message };
            return [status, result];
        }
    } finally {
        if (!shouldSkipUserUpdate()) {
            setSessionStorage('user', user);
        } else {
            removeSessionItem('skipUserUpdate');
        }
    }
};


export {makeRequest,makeBatchRequest};
