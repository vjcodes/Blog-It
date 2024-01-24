import { createSlice } from "@reduxjs/toolkit";

type UserData = {
  name?: string;
  email?: string;
};

type AuthInitialState = {
  status: boolean;
  userData: UserData | null;
};

const initialState: AuthInitialState = {
  status: false,
  userData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload.userData;
    },
    logout: (state) => {
      state.status = false;
      state.userData = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
