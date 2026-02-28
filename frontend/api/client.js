import axios from 'axios';
import { API_URL } from '../constants/api';

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

let getToken = null;

export const setGetToken = (fn) => {
    getToken = fn;
};

apiClient.interceptors.request.use(async (config) => {
    if (getToken) {
        try {
            const token = await getToken();
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        } catch (error) {
            console.error('Error getting auth token:', error);
        }
    }
    return config;
});

export default apiClient;
