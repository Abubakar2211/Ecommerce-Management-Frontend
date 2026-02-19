import axios from "axios";

export default function Api() {
    const api = axios.create({
        baseURL: `${import.meta.env.VITE_BASE_URL_API}/api`, 
    });
    
    api.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem("authToken");
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            if (config.data instanceof FormData) {
                config.headers["Content-Type"] = "multipart/form-data";
            }
            return config;
        },
        (error) => Promise.reject(error)
    );
    return api;
}