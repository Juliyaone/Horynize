import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  models: undefined,
  userModelsParams: undefined,
  userModels: undefined,
};

export const controllersSlice = createSlice({
  name: 'controllersSlice',
  initialState,
  reducers: {
    setControllers: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.models = action.payload
    },
    setUserControllersParams: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.userModelsParams = { ...state.userModels, ...action.payload }
    },
    setUserContollers: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.userModels = action.payload
    },
  },
});

export const { setControllers, setUserControllersParams, setUserContollers } = controllersSlice.actions;
