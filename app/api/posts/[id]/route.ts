import {NextRequest, NextResponse} from "next/server";
import {cookies} from "next/headers";
import api from "@/lib/axios";
import { logger } from "@/logger";

const GET = async (request: NextRequest, {params}: {params: {id: string}}) => {    
    const id = params.id
    const response = await api.get(`/themes/post/${id}`)
    return NextResponse.json({
        success: true, data: {...response.data.data}
    });
}

const PUT = async (request: NextRequest) => {
    const id = request.nextUrl.searchParams.get("id") || "3"
    const response = await api.get(`/themes/post/${id}`)
    return NextResponse.json({
        success: true, data: {}
    });;
}
const POST = async (request: NextRequest) => {
    const accessToken = cookies().get("access-token");
    return NextResponse.json({isAuthenicated: !!accessToken?.value.length});
}
const DELETE = async (request: NextRequest) => {
    const accessToken = cookies().get("access-token");
    return NextResponse.json({isAuthenicated: !!accessToken?.value.length});
}

export {GET, PUT, POST, DELETE};