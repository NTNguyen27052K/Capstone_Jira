import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import projectCategorySlice from "./slices/projectCategorySlice";
import projectSlice from "./slices/projectSliece";
import statusSlice from "./slices/statusSliece";
import prioritySlice from "./slices/prioritySliece";

export const store = configureStore({
  reducer: {
    users: userSlice,
    projectCategory: projectCategorySlice,
    project: projectSlice,
    status: statusSlice,
    priority: prioritySlice,
  },
});
