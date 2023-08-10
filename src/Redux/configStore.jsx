import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import projectCategorySlice from "./slices/projectCategorySlice";

export const store = configureStore({
  reducer: {
    users: userSlice,
    projectCategory: projectCategorySlice,
  },
});
