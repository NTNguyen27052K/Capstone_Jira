import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const login = createAsyncThunk("user/login", async () => {});

export const userSlice = createSlice({
  name: "user",
});
