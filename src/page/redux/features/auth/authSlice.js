import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },

    logout: (state) => {
      state.token = null;
      state.user = null;
    },
  },
});

export const { setToken, logout } = authSlice.actions;
export default authSlice.reducer;