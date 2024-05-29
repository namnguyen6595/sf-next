import {cookies} from "next/headers";
import Cookies from "js-cookie";
import {NextRequest, NextResponse} from "next/server";

const GET = async () => {
    cookies().delete("access-token")
    Cookies.remove("access-token")
  return NextResponse.json({
      success: true
  });
}

const POST = async (request: NextRequest) => {
    const accessToken = cookies().get("access-token")?.value || "";
    return NextResponse.json({message: "Hello, World!"});
}


const PUT = async (request: NextRequest) => {
    const accessToken = cookies().get("access-token")?.value || "";
    return NextResponse.json({message: "Hello, World!"});
}

const DELETE = async (request: NextRequest) => {
    const accessToken = cookies().get("access-token")?.value || "";
    return NextResponse.json({message: "Hello, World!"});
}
export {GET, POST, PUT, DELETE}