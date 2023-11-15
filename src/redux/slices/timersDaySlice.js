import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  timers: [],
  'vent-unit': [],
};

export const timersDaySlice = createSlice({
  name: 'timersDaySlice',
  initialState,
  reducers: {
    setTimersDay: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.timers = action.payload.timers;
      // eslint-disable-next-line no-param-reassign
      state['vent-unit'] = action.payload['vent-unit'];
    },
    changeTimersDay: (state, action) => {
    // eslint-disable-next-line no-param-reassign
      state.timers = { ...state.timers, ...action.payload.timers }
    },
  },
});

export const {
  setTimersDay,
  changeTimersDay,
} = timersDaySlice.actions;
