// create a function convert object to string query
import { format } from "date-fns";
export function buildQueryString(params: any): string {
  if (!params) return "";
  let queryString = "?";

  queryString += Object.keys(params)
    .map((key) => {
      return `${key}=${params[key]}`;
    })
    .join("&");

  return queryString;
}

export function formatDateByFormat(
  date: string,
  type = "MMM, dd yyyy"
): string {
  return format(new Date(date), type);
}