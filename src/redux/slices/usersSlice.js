import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: undefined,
  userControllers: undefined,
  error: undefined,
  isLoading: undefined,
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setUser: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.user = action.payload
    },
    setUserControllers: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.userControllers = action.payload
    },
    logout: () => initialState,
    // Save the user's info
    getUser: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.user = action.payload;
    },
  },
});

export const {
  logout, userInfo, setUser, setUserControllers,
} = authSlice.actions;
