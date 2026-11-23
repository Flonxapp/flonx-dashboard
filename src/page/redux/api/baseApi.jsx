import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout } from "../features/auth/authSlice"; // path adjust

// set VITE_API_URL in .env, e.g. https://api.flonxapp.com
const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:3500").replace(/\/+$/, "");

const baseQuery = fetchBaseQuery({
  baseUrl: `${API_URL}/api/v1`,

  prepareHeaders: (headers, { getState }) => {
    const token = getState().logInUser.token;
    if (token) {
      headers.set("authorization", ` ${token}`);
    }
    return headers;
  },
});

// 🔥 AUTO LOGOUT WRAPPER
// const baseQueryWithAuth = async (args, api, extraOptions) => {
//   const result = await baseQuery(args, api, extraOptions);

//   // ❌ TOKEN EXPIRED / UNAUTHORIZED
//   if (result?.error?.status === 401) {
//     api.dispatch(logout()); // clear redux state
//     localStorage.removeItem("persist:quiz-app"); // optional clean persist

//     window.location.href = "/login"; // force redirect
//   }

//   return result;
// };

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQuery,
  tagTypes: ["overview", "host"],
  endpoints: () => ({}),
});
export const imageUrl = API_URL;