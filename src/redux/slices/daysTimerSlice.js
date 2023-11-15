import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  timers: [],
  'vent-unit': [],
};

export const daysTimerSlice = createSlice({
  name: 'daysTimerSlice',
  initialState,
  reducers: {
    setDaysTimer: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.timers = action.payload.timers;
      // eslint-disable-next-line no-param-reassign
      state['vent-unit'] = action.payload['vent-unit'];
    },
    changeDaysTimer: (state, action) => {
    // eslint-disable-next-line no-param-reassign
      state.timers[0] = { ...state.timers[0], ...action.payload.timers[0] }
      // eslint-disable-next-line no-param-reassign
      state['vent-unit'] = action.payload['vent-unit'];
    },
  },
});

export const {
  setDaysTimer,
  changeDaysTimer,
} = daysTimerSlice.actions;
