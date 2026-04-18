import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout } from "../features/auth/authSlice"; // path adjust

const baseQuery = fetchBaseQuery({
  baseUrl: "http://10.10.20.9:3500/api/v1",

  prepareHeaders: (headers, { getState }) => {
    const token = getState().logInUser.token;

    if (token) {
      headers.set("authorization", `${token}`);
    }

    return headers;
  },
});

// 🔥 AUTO LOGOUT WRAPPER
const baseQueryWithAuth = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  // ❌ TOKEN EXPIRED / UNAUTHORIZED
  if (result?.error?.status === 401) {
    api.dispatch(logout()); // clear redux state
    localStorage.removeItem("persist:quiz-app"); // optional clean persist

    window.location.href = "/login"; // force redirect
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["overview", "host"],
  endpoints: () => ({}),
});
export const imageUrl = "http://10.10.20.9:3500";