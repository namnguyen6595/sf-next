"use server";

import { cookies } from "next/headers";
import * as jwt_decode from 'jwt-decode'
import { buildQueryString } from "@/utils/string";
import api from "@/lib/axios";

async function switchLocale(
  //   router: AppRouterInstance,
  pathname: string | null,
  searchParams?: any | null
): Promise<{
  url: string;
  locale: string;
}> {
  const locale = cookies().get("locale")?.value === "vi" ? "en" : "vi";
  cookies().set("locale", locale);
  const queryString = buildQueryString(searchParams);
  const url = pathname ? pathname.replace(/^\/(vi|en)/, `/${locale}/`) : "/";
  return { url: `${url}${queryString}`, locale };
}

const validateToken = async () => {
  const token = cookies().get("access-token")?.value || ""
  if (!token.length) return

  try {
    const tokenData: any = jwt_decode.jwtDecode(token);
    if (!tokenData["user_id"]) return
    const userId = tokenData["user_id"]
    const url = `/api/user/${userId}`

    const response = await api.get(url)
    if (response.status === 200) {
      return response.data
    }
  } catch (error) {
    console.debug({ error })
  } finally {
    // console.log({ user: store.dispatch(getUserInfo({})) })
  }
}

export { switchLocale, validateToken };
