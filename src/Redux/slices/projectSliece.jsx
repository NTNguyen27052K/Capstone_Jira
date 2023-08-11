import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { projectServ } from "../../Services/projectServices";

export const getAllProject = createAsyncThunk(
  "project/listProject/getAllProject",
  async () => {
    const res = await projectServ.getAllProject();
    return res.data.content;
  }
);
export const getProjectDetail = createAsyncThunk(
  "project/projectDetail/getProjectDetail",
  async (data) => {
    const res = await projectServ.getProjectDetail(data);
    return res.data.content;
  }
);
const initialState = {
  listProject: [],
  projectDetail: [],
};
export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {},
  // fulfilled: Thành công
  // pending: Dang chạy
  // rejected: error
  extraReducers: (buider) => {
    buider.addCase(getAllProject.fulfilled, (state, action) => {
      // console.log(action);
      state.listProject = action.payload;
    });
    buider.addCase(getAllProject.rejected, (error) => {
      console.log(error);
    });
    buider.addCase(getProjectDetail.fulfilled, (state, action) => {
      // console.log(action);
      state.projectDetail = action.payload;
    });
    buider.addCase(getProjectDetail.rejected, (error) => {
      console.log(error);
    });
  },
});

export default projectSlice.reducer;
