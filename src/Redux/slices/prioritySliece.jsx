import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { statusSer } from "../../Services/statusServices";
import { prioritySer } from "../../Services/priorityServices";

export const getAllPriority = createAsyncThunk(
  "priority/getAllStatus",
  async (data) => {
    const res = await prioritySer.getStatus(data);

    return res.data?.content;
  }
);

const initialState = {
  priority: [],
};

export const prioritySlice = createSlice({
  name: "priority",
  initialState,
  reducers: {},
  // fulfilled: Thành công
  // pending: Dang chạy
  // rejected: error
  extraReducers: (buider) => {
    buider.addCase(getAllPriority.fulfilled, (state, action) => {
      state.priority = action.payload;
    });
    buider.addCase(getAllPriority.rejected, (error) => {
      console.log(error);
    });
  },
});

export default prioritySlice.reducer;
