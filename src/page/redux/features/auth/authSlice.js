import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  refreshToken: null,
  role: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // payload: access token string, or { accessToken, refreshToken, role }
    setToken: (state, action) => {
      const p = action.payload;
      if (p && typeof p === "object") {
        state.token = p.accessToken ?? state.token;
        if (p.refreshToken !== undefined) state.refreshToken = p.refreshToken;
        if (p.role !== undefined) state.role = p.role;
      } else {
        state.token = p;
      }
    },

    logout: (state) => {
      state.token = null;
      state.refreshToken = null;
      state.role = null;
      state.user = null;
    },
  },
});

export const { setToken, logout } = authSlice.actions;
export default authSlice.reducer;
