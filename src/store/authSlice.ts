import { createSlice } from "@reduxjs/toolkit";

type UserData = {
  $id: string;
  name?: string;
  email?: string;
};

type AuthInitialState = {
  status: boolean;
  userData: UserData | null;
  userId: string;
};

const initialState: AuthInitialState = {
  status: false,
  userData: null,
  userId: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload.userData;
      state.userId = action.payload.userData.$id;
    },
    logout: (state) => {
      state.status = false;
      state.userData = null;
      state.userId = "";
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
