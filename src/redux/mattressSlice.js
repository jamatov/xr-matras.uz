import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import httpClient from "../shared/axios";
import { toast } from "react-toastify";

const initialState = {
  mattressList: [],
  isLoading: false,
  mattress: null,
  buttonLoading: false,
};

export const mattressSlice = createSlice({
  name: "mattress",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllMattress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllMattress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.mattressList = action.payload;
      })
      .addCase(getAllMattress.rejected, (state) => {
        state.isLoading = false;
        toast.error("Internal error");
      })

      .addCase(getMattress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMattress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.mattress = action.payload;
      })
      .addCase(getMattress.rejected, (state) => {
        state.isLoading = false;
        toast.error("Internal error");
      })

      .addCase(deleteMattress.pending, (state) => {
        state.buttonLoading = true;
      })
      .addCase(deleteMattress.fulfilled, (state) => {
        state.buttonLoading = false;
        toast.success("Размер матраса удален");
      })
      .addCase(deleteMattress.rejected, (state) => {
        state.isLoading = false;
        toast.error("Internal error");
      });
  },
});

export const getAllMattress = createAsyncThunk(
  "mattress/getAllMattresses",
  async () => {
    const { data } = await httpClient.get("/api/v1/public/mattress");
    return data;
  }
);

export const getMattress = createAsyncThunk(
  "mattress/getMattress",
  async (id) => {
    const { data } = await httpClient.get(`/api/v1/public/mattress/${id}`);
    return data;
  }
);

export const deleteMattress = createAsyncThunk(
  "mattress/deleteMattress",
  async (id) => {
    await httpClient.delete(`/api/v1/admin/mattress/${id}`);
  }
);

export default mattressSlice.reducer;
