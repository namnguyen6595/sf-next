"use server";
import { cookies } from "next/headers";
import axios from "@/lib/axios";
import { store } from "@/lib/store";
import {
  updateUserInfo
} from './userSlice'
export async function handleSignIn(data: any): Promise<any> {
  const body = {
    email: data.email,
    password: data.password,
  };
  const response = await axios.post("/api/user/sign-in", body);
  //@ts-ignore  
  if (!!response.data?.error) {
    return {
      success: false,
      //@ts-ignore
      data: response.error,
    };
  }
  if (!response.data?.id) return {
    success: false,
    data: { ...response.data },
  }
  store.dispatch(updateUserInfo({
    value: {
      ...response.data
    }
  }))
  const token = await generateAccessToken({
    user_id: response.data.id,
  });
  cookies().set("access-token", token, {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  });
  axios.defaults.headers.common["X-Access-Token"] = token;
  return {
    success: true,
    data: {
      first_name: response.data.first_name,
      last_name: response.data.last_name,
      id: response.data.id,
      access_token: token,
      phone_number: response.data.phone_number,
    },
  };
}

export async function generateAccessToken(data: {
  user_id: number;
}): Promise<string> {
  const response = await axios.post("/api/user/grant-access", {
    id: data.user_id,
  });
  if (response.status === 200) {
    return response.data.access_token;
  }
  return "";
}
