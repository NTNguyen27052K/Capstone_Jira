import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { taskServ } from "../../Services/taskServices";

export const getTaskType = createAsyncThunk("task/getTaskType", async () => {
  const res = await taskServ.getTaskType();

  return res.data?.content;
});

const initialState = {
  taskType: [],
};

export const taskSlice = createSlice({
  name: "taskType",
  initialState,
  reducers: {},
  // fulfilled: Thành công
  // pending: Dang chạy
  // rejected: error
  extraReducers: (buider) => {
    buider.addCase(getTaskType.fulfilled, (state, action) => {
      state.taskType = action.payload;
    });
    buider.addCase(getTaskType.rejected, (error) => {
      console.log(error);
    });
  },
});

export default taskSlice.reducer;
