import { cookies } from "next/headers";
import { logger } from "@/logger";
import { NextRequest, NextResponse } from "next/server";

const GET = async (request: NextRequest) => {
    const accessToken = cookies().get("access-token")?.value || "";
    return NextResponse.json({ isAuthenicated: !!accessToken.length });
};

const POST = async (request: NextRequest) => {
    const accessToken = cookies().get("access-token")?.value || "";
    return NextResponse.json({ message: "Hello, World!" });
}

const PUT = async (request: NextRequest) => {
    const accessToken = cookies().get("access-token")?.value || "";
    return NextResponse.json({ message: "Hello, World!" });
}

const DELETE = async (request: NextRequest) => {
    const accessToken = cookies().get("access-token")?.value || "";
    return NextResponse.json({ message: "Hello, World!" });
}
export { GET, POST, PUT, DELETE };