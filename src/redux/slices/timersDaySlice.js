import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  timersDay: [],
};

export const timersDaySlice = createSlice({
  name: 'timersDaySlice',
  initialState,
  reducers: {
    setTimersDay: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.timersDay = action.payload.timers;
      // eslint-disable-next-line no-param-reassign
    },
    changeTimersDay: (state, action) => {
    // eslint-disable-next-line no-param-reassign
      state.timersDay = [...action.payload];
    },
  },
});

export const {
  setTimersDay,
  changeTimersDay,
} = timersDaySlice.actions;
