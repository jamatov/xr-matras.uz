import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../redux/authSlice";
import mattressSlice from "../redux/mattressSlice";
import mattressSizeSlice from "../redux/mattressSizeSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    mattress: mattressSlice,
    mattressSize: mattressSizeSlice,
  },
});
