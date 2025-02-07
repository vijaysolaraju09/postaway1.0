import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import loaderReducer from "./slices/loadingSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    loader: loaderReducer,
  },
});
export default store;
