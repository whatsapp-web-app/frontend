import {
  BaseQueryApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store/index.types";
import { AuthActions } from "../store/slices/auth.slice.ts";

const url = "http://192.168.18.38:8000/api/v1";

const baseQuery = fetchBaseQuery({
  baseUrl: url,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).authSlice.token;
    headers.set("X-Api-Version", "1.0");
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQueryWithReAuth = async (
  args: FetchArgs,
  api: BaseQueryApi,
  extraOptions: any
) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    api.dispatch(AuthActions.logout());
  }

  if (result.error?.status === "FETCH_ERROR") {
    return {
      message: "Server Error",
      error: "FETCH_ERROR",
      statusCode: 500,
    };
  }
  return result;
};
