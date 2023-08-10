import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDataLocal } from "../../Utils/localStore";
import { projectCategoryServ } from "../../Services/projectCategoryServices";

// export const getProjectCategory = createAsyncThunk(
//   "projectCategory/getProjectCategory",
//   async () => {
//     const res = await projectCategoryServ.getProjectCategory();
//     return res.data.content;
//   }
// );

const initialState = {
  name: getDataLocal("userLocal"),
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setDataName: (state, action) => {
      console.log(state);
      if (state.name == null) {
        state.name = action.payload;
      }
    },
  },
});
export const { setDataName } = userSlice.actions;

export default userSlice.reducer;
