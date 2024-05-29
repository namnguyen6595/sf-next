import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import api from "@/lib/axios";

const GET = async (request: NextRequest) => {
  const response = await api.get("/themes/post?trending=true&page=1&limit=5")
  return NextResponse.json(response.data);
};

const POST = async (request: NextRequest) => {        
    const body = await request.json()
    const response = await api.post("/api/post/new", body)
    return NextResponse.json({ message: "Hello, World!"})
}


const PUT = async (request: NextRequest) => {
    const accessToken = cookies().get("access-token")?.value || "";
    return NextResponse.json({message: "Hello, World!"});
}

const DELETE = async (request: NextRequest) => {
    const accessToken = cookies().get("access-token")?.value || "";
    return NextResponse.json({message: "Hello, World!"});
}
export {GET, POST, PUT, DELETE};
