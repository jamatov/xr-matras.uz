import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import httpClient from "../shared/axios";
import { toast } from "react-toastify";
import { MATTRESS_TOKEN } from "../shared/types";

const initialState = {
  isLoading: false,
  token: localStorage.getItem(MATTRESS_TOKEN)
    ? localStorage.getItem(MATTRESS_TOKEN)
    : "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = "";
      localStorage.removeItem(MATTRESS_TOKEN);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.token = "";
        localStorage.removeItem(MATTRESS_TOKEN);
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.access_token;
        localStorage.setItem(MATTRESS_TOKEN, state.token);
        window.location.href = "/admin";
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
        state.token = "";
        localStorage.removeItem(MATTRESS_TOKEN);
        toast.error("Плохой запрос");
      });
  },
});

export const login = createAsyncThunk(
  "auth/login",
  async ({ phoneNumber, password }) => {
    const response = await httpClient.post("/api/v1/auth/authenticate", {
      phoneNumber,
      password,
    });
    return response.data;
  }
);

export const { logout } = authSlice.actions;

export default authSlice.reducer;
