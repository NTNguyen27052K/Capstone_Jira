import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { projectCategoryServ } from "../../Services/projectCategoryServices";

export const getProjectCategory = createAsyncThunk(
  "projectCategory/getProjectCategory",
  async () => {
    const res = await projectCategoryServ.getProjectCategory();
    return res.data.content;
  }
);
const initialState = {
  projectCategory: [],
};
export const projectCategorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  // fulfilled: Thành công
  // pending: Dang chạy
  // rejected: error
  extraReducers: (buider) => {
    buider.addCase(getProjectCategory.fulfilled, (state, action) => {
      state.projectCategory = action.payload;
    });
  },
});
// export const { extraReducers } = projectCategorySlice.actions;

export default projectCategorySlice.reducer;
