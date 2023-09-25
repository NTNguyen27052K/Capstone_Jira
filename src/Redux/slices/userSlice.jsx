import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDataLocal } from "../../Utils/localStore";
import { projectCategoryServ } from "../../Services/projectCategoryServices";
import { userSer } from "../../Services/userServices";

export const getListUser = createAsyncThunk(
  "users/listUser/getListUser",
  async (data) => {
    const res = await userSer.getUser(data);
    return res.data.content;
  }
);
export const getListUserAssigners = createAsyncThunk(
  "users/listUserAssigners/getListUserAssigners",
  async (data) => {
    const res = await userSer.getUserByProjectId(data);
    return res.data.content;
  }
);
const initialState = {
  name: getDataLocal("userLocal"),
  listUser: [],
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setDataName: (state, action) => {
      // console.log(state);
      if (state.name == null) {
        state.name = action.payload;
      }
    },
  },
  extraReducers: (buider) => {
    buider.addCase(getListUser.fulfilled, (state, action) => {
      // console.log(action);
      state.listUser = action.payload;
    });
    buider.addCase(getListUser.rejected, (error) => {
      console.log(error);
    });
    buider.addCase(getListUserAssigners.fulfilled, (state, action) => {
      // console.log(action);
      state.listUserAssigners = action.payload;
    });
    buider.addCase(getListUserAssigners.rejected, (error) => {
      console.log(error);
    });
  },
});
export const { setDataName } = userSlice.actions;

export default userSlice.reducer;
