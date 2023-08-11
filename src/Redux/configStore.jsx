import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import projectCategorySlice from "./slices/projectCategorySlice";
import projectSlice from "./slices/projectSliece";

export const store = configureStore({
  reducer: {
    users: userSlice,
    projectCategory: projectCategorySlice,
    project: projectSlice,
    // projectDetail: listProjectSlice,
  },
});
