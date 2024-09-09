import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import httpClient from "../shared/axios";
import { toast } from "react-toastify";

const initialState = {
  mattressSizeList: [],
  isLoading: false,
  buttonLoading: false,
};

export const mattressSizeSlice = createSlice({
  name: "mattress-size",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllMattressSize.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllMattressSize.fulfilled, (state, action) => {
        state.isLoading = false;
        state.mattressSizeList = action.payload;
      })
      .addCase(getAllMattressSize.rejected, (state) => {
        state.isLoading = false;
        toast.error("Internal error");
      })

      .addCase(deleteMattressSize.pending, (state) => {
        state.buttonLoading = true;
      })
      .addCase(deleteMattressSize.fulfilled, (state) => {
        state.buttonLoading = false;
        toast.success("Размер матраса удален");
      })
      .addCase(deleteMattressSize.rejected, (state) => {
        state.isLoading = false;
        toast.error("Internal error");
      });
  },
});

export const getAllMattressSize = createAsyncThunk(
  "mattress/getAllMattressesSize",
  async () => {
    const { data } = await httpClient.get("/api/v1/public/mattress-size");
    return data;
  }
);

export const deleteMattressSize = createAsyncThunk(
  "mattress/deleteMattressSize",
  async (id) => {
    await httpClient.delete(`/api/v1/admin/mattress-size/${id}`);
  }
);

export default mattressSizeSlice.reducer;
