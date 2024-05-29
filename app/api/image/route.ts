import { logger } from "@/logger";
import api from "@/lib/axios";
import { NextRequest, NextResponse } from "next/server";

const POST = async (request: NextRequest) => {
    const body = await request.formData()
    const response = await api.post("/api/image/upload", body, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
    return NextResponse.json({
        success: true,
        data: {
            url: response.data.data.url
        }
    })
}

export {
    POST
}