"use server"

import api from "@/lib/axios";
import { logger } from "@/logger";

const userRegister = async (data: { post_id: string }) => {
    const response = await api.post(`/api/post/${data.post_id}/register`, data);
    if (response.status === 200) {
        return {
            success: true,
            data: response.data,
        };
    }
    return {
        success: false,
        data: response.data,
    };
}

export {
    userRegister
}