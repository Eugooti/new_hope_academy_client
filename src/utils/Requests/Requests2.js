import axios from "axios";
import { getFromLocalStorage, removeItem, setLocalStorage } from "../LocalStorage/localStorage.jsx";
import { removeSessionItem } from "../LocalStorage/sessionStorage.jsx";

export const BASE_URL = 'http://localhost:4600/nha';

export const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "accept": "*/*",
        "content-type": "application/json",
    },
    withCredentials: true
});

const navigateToLogin = async () => {
    await removeItem('user');
    window.location.href = "/login";
};

const shouldSkipUserUpdate = () => {
    return sessionStorage.getItem('skipUserUpdate') === 'true';
};

instance.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshResponse = await axios.post(`${BASE_URL}/auth/refresh-token`, {}, { withCredentials: true });
                if (refreshResponse.status === 200) {
                    return instance(originalRequest);
                }
            } catch (refreshError) {
                console.error("Token refresh failed:", refreshError);
            }
            await navigateToLogin();
            return Promise.reject(error);
        }
        return Promise.reject(error);
    }
);

const makeRequest = async ({ url, method, data = null }) => {
    const user = getFromLocalStorage('user');
    try {
        const response = await instance({
            url,
            method,
            data,
            headers: {
                referrerPolicy: "no-referrer",
                redirect: 'follow',
                mode: 'cors',
                cache: 'no-cache',
            }
        });
        return [response.status, response.data];
    } catch (error) {
        console.error("Request failed:", error);
        return [
            error.response?.status || 500,
            error.response?.data || { message: error.message }
        ];
    } finally {
        if (!shouldSkipUserUpdate()) {
            setLocalStorage('user', user);
        } else {
            removeSessionItem('skipUserUpdate');
        }
    }
};

const makeBatchRequest = async (requests) => {
    const user = getFromLocalStorage('user');
    try {
        const batchRequests = requests.map(req => ({
            method: req.method,
            url: req.url,
            data: req.data,
            withCredentials: true,
            headers: {
                referrerPolicy: "no-referrer",
                redirect: 'follow',
                mode: 'cors',
                cache: 'no-cache',
                ...req.headers,
            },
        }));
        const response = await instance.post('/batch', { requests: batchRequests });
        return [response.status, response.data];
    } catch (error) {
        console.error("Batch request failed:", error);
        return [
            error.response?.status || 500,
            error.response?.data || { message: error.message }
        ];
    }
};

export { makeRequest, makeBatchRequest };