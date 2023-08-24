import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { projectServ } from "../../Services/projectServices";

export const getAllProject = createAsyncThunk(
  "project/listProject/getAllProject",
  async () => {
    const res = await projectServ.getAllProject();
    return res.data?.content;
  }
);

export const getProjectDetail = createAsyncThunk(
  "project/projectDetail/getProjectDetail",
  async (data) => {
    const res = await projectServ.getProjectDetail(data);

    return res.data?.content;
  }
);
export const getTask = createAsyncThunk(
  "project/task/getTask",
  async (data) => {
    const res = await projectServ.getTaskDetail(data);
    // console.log(res);
    return res.data?.content;
  }
);
const initialState = {
  listProject: [],
  projectDetail: [],
  task: [],
};

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    // setProjectDetail: (state, action) => {
    //   console.log(action);
    //   state.project.projectDetail = action.payload;
    // },
  },
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
    // buider.addCase(getProjectDetail.pending, (state, action) => {
    //   // console.log(action);
    //   state.projectDetail = action.payload;
    // });
    buider.addCase(getProjectDetail.fulfilled, (state, action) => {
      state.projectDetail = action.payload;
    });
    buider.addCase(getProjectDetail.rejected, (error) => {
      console.log(error);
    });
    buider.addCase(getTask.fulfilled, (state, action) => {
      state.task = action.payload;
    });
    buider.addCase(getTask.rejected, (error) => {
      console.log(error);
    });
  },
});
// export const { setDataName } = userSlice.actions;
export default projectSlice.reducer;
// export const { setProjectDetail } = projectSlice.actions;

// export default projectSlice.reducer;
