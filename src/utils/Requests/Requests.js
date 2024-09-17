import axios from "axios";
import { getFromLocalStorage, removeItem, setLocalStorage } from "../LocalStorage/localStorage.jsx";

// Base URL for API
export const BASE_URL = 'http://localhost:4600/nha';

// Create an axios instance with base URL and default headers
export const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "accept": "/",
    },
});

// Utility function to remove user data from local storage and navigate to login
const navigateToLogin = async () => {
    await removeItem('user');
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
            if (window.location.pathname !== "/login") {
                await navigateToLogin();
            }
        }
        return Promise.reject(error);
    }
);

// Function to make HTTP request
const makeRequest = async ({ url, method, data = null, use_jwt = false }) => {
    const token = getFromLocalStorage('token');
    const user = getFromLocalStorage('user');

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
            setLocalStorage('user', user);
        } else {
            removeItem('skipUserUpdate');
        }
    }
};


// Function to make batch request
const makeBatchRequest = async (requests, use_jwt = true) => {
    const token = getFromLocalStorage('token');

    const headers = {
        "content-type": "application/json",
        referrerPolicy: "no-referrer",
        redirect: 'follow',
        mode: 'cors',
        cache: 'no-cache',
        ...(use_jwt && token ? { Authorization: `Bearer ${token}` } : {}),
    };

    try {
        const response = await instance.post('/batch', { requests }, { headers });

        // Process and return batch responses
        const results = response.data.responses || [];
        const status = response.status
        return [status, results];
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
    }
};


export default makeRequest;
