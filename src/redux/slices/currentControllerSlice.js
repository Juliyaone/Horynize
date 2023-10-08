import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  params: undefined,
  id: undefined,
}

export const currentControllerSlice = createSlice({
  name: 'currentControllerSlice',
  initialState,
  reducers: {
    setCurrentParams: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.params = action.payload
    },
    setCurrentId: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.id = action.payload
    },
    setTemperature: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.tempTarget = action.payload
    },
  },
});

export const { setCurrentParams, setCurrentId } = currentControllerSlice.actions;