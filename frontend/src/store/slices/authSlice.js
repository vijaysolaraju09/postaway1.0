import { createSlice } from "@reduxjs/toolkit";
import { isAuthenticated } from "../../utils/authUtils";

const initialState = { isAuth: isAuthenticated(), user: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthState(state, action) {
      state.isAuth = action.payload;
    },
    changeAuthState(state) {
      state.isAuth = false;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});

export const { setAuthState, changeAuthState, setUser } = authSlice.actions;
export default authSlice.reducer;
