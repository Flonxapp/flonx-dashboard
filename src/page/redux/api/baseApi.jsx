import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout, setToken } from "../features/auth/authSlice";

// Backend base URL (without /api/v1); set VITE_API_URL at build time
const API_URL = (
  import.meta.env.VITE_API_URL || "https://api.flonxapp.com"
).replace(/\/+$/, "");

const baseQuery = fetchBaseQuery({
  baseUrl: `${API_URL}/api/v1`,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().logInUser.token;
    if (token) headers.set("authorization", token);
    return headers;
  },
});

// One refresh at a time, shared by all requests that got a 401
let refreshInFlight = null;
const refreshAccessToken = (api, extraOptions) => {
  if (!refreshInFlight) {
    refreshInFlight = (async () => {
      const refreshToken = api.getState().logInUser.refreshToken;
      if (!refreshToken) return false;
      const res = await baseQuery(
        { url: "/auth/refresh-token", method: "POST", body: { refreshToken } },
        api,
        extraOptions,
      );
      const accessToken = res.data?.data?.accessToken;
      if (!accessToken) return false;
      api.dispatch(setToken({ accessToken }));
      return true;
    })().finally(() => {
      refreshInFlight = null;
    });
  }
  return refreshInFlight;
};

// On 401: refresh the access token once and retry; if that fails, log out.
const baseQueryWithAuth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  const hadToken = !!api.getState().logInUser.token;
  if (result?.error?.status === 401 && hadToken) {
    if (await refreshAccessToken(api, extraOptions)) {
      result = await baseQuery(args, api, extraOptions);
    }
    if (result?.error?.status === 401) {
      api.dispatch(logout());
      if (window.location.pathname !== "/login") {
        window.location.assign("/login");
      }
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithAuth,
  tagTypes: [
    "updateProfile",
    "host",
    "newHost",
    "terms",
    "product",
    "shift",
    "bartender",
    "support",
    "venue",
    "wallet",
    "withdrawRequest",
    "notification",
  ],
  endpoints: () => ({}),
});
export const imageUrl = API_URL;
