import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { statusSer } from "../../Services/statusServices";

export const getAllStatus = createAsyncThunk(
  "status/getAllStatus",
  async () => {
    const res = await statusSer.getStatus();

    return res.data?.content;
  }
);

const initialState = {
  status: [],
};

export const statusSlice = createSlice({
  name: "status",
  initialState,
  reducers: {},
  // fulfilled: Thành công
  // pending: Dang chạy
  // rejected: error
  extraReducers: (buider) => {
    buider.addCase(getAllStatus.fulfilled, (state, action) => {
      state.status = action.payload;
    });
    buider.addCase(getAllStatus.rejected, (error) => {
      console.log(error);
    });
  },
});

export default statusSlice.reducer;
