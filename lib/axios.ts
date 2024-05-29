"use server"
import { logger } from "@/logger";
import axios, {
    AxiosInstance,
    AxiosResponse,
    InternalAxiosRequestConfig,
} from "axios";
import { cookies } from "next/headers";

interface ResponseApi extends AxiosResponse {
}

// Create an Axios instance
const api: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Add request interceptor
api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // Modify the request config here (e.g., add headers, authentication token, etc.)
        const token = cookies().get("access-token")?.value || "";
        config.headers["X-Access-Token"] = token;
        return config;
    },
    (error: any) => {
        // Handle request error here
        console.log({ error })
        return Promise.reject(error);
    }
);

// Add response interceptor
api.interceptors.response.use(
    (response: any): Promise<ResponseApi> => {
        if (!response) {
            return Promise.resolve(response)
        }
        // Modify the response data here (e.g., transform, filter, etc.)
        if (response.headers["x-access-token"]) {
            api.defaults.headers.common["X-Access-Token"] = response.headers["x-access-token"];
        }
        if (response.status && response.status > 200 && response.status < 300) {
            return Promise.resolve({
                ...response,
                success: true,
            });
        }
        if (response.status && response.status >= 400) {
            return Promise.resolve({
                ...response,
                success: false,
                data: { ...response.data }
            });
        }
        return Promise.resolve({
            ...response,
            success: true,
            data: { ...response.data }
        });
    },
    (error: ResponseApi): Promise<ResponseApi> => {
        switch (error.status) {
            case 401:
                error.data = {
                    success: false,
                    data: {
                        message: "Unauthorized",
                    },
                }
                return Promise.resolve({
                    ...error,
                    data: {}
                })
            case 404:
                return Promise.resolve({
                    ...error,
                    success: false,
                    data: {
                        message: "Not Found",
                    },
                })                
            default:
                console.log("axios error", { error })
                return Promise.resolve({ ...error })
        }
    }
);
export default api;
