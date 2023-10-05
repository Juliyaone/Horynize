import { createSlice } from "@reduxjs/toolkit";
import { usersApi } from "../usersApi";

const usersSlice = createSlice({
  name: "users",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
  
  }
});

export default usersSlice.reducer;
