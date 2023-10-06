import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  models: undefined,
};

export const controllersSlice = createSlice({
  name: 'controllersSlice',
  initialState,
  reducers: {
    setControllers: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.models = action.payload
    },
  },
});

export const { setControllers } = controllersSlice.actions;
