import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import projectCategorySlice from "./slices/projectCategorySlice";
import projectSlice from "./slices/projectSliece";
import statusSlice from "./slices/statusSliece";
import prioritySlice from "./slices/prioritySliece";
import taskSlice from "./slices/taskSlice";

export const store = configureStore({
  reducer: {
    users: userSlice,
    projectCategory: projectCategorySlice,
    project: projectSlice,
    status: statusSlice,
    priority: prioritySlice,
    task: taskSlice,
  },
});
