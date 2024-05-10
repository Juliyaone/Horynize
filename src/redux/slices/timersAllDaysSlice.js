import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  timersAllDays: {
    0: [{
      fanSpeed: '255', num: 1, tempTarget: '15', time: '00:00',
    }, {
      fanSpeed: '255', num: 2, tempTarget: '15', time: '00:00',
    }, {
      fanSpeed: '255', num: 3, tempTarget: '15', time: '00:00',
    }, {
      fanSpeed: '255', num: 4, tempTarget: '15', time: '00:00',
    }],
    1: [{
      fanSpeed: '255', num: 1, tempTarget: '15', time: '00:00',
    }, {
      fanSpeed: '255', num: 2, tempTarget: '15', time: '00:00',
    }, {
      fanSpeed: '255', num: 3, tempTarget: '15', time: '00:00',
    }, {
      fanSpeed: '255', num: 4, tempTarget: '15', time: '00:00',
    }],
    2: [{
      fanSpeed: '255', num: 1, tempTarget: '15', time: '00:00',
    }, {
      fanSpeed: '255', num: 2, tempTarget: '15', time: '00:00',
    }, {
      fanSpeed: '255', num: 3, tempTarget: '15', time: '00:00',
    }, {
      fanSpeed: '255', num: 4, tempTarget: '15', time: '00:00',
    }],
    3: [{
      fanSpeed: '255', num: 1, tempTarget: '15', time: '00:00',
    }, {
      fanSpeed: '255', num: 2, tempTarget: '15', time: '00:00',
    }, {
      fanSpeed: '255', num: 3, tempTarget: '15', time: '00:00',
    }, {
      fanSpeed: '255', num: 4, tempTarget: '15', time: '00:00',
    }],
    4: [{
      fanSpeed: '255', num: 1, tempTarget: '15', time: '00:00',
    }, {
      fanSpeed: '255', num: 2, tempTarget: '15', time: '00:00',
    }, {
      fanSpeed: '255', num: 3, tempTarget: '15', time: '00:00',
    }, {
      fanSpeed: '255', num: 4, tempTarget: '15', time: '00:00',
    }],
    5: [{
      fanSpeed: '255', num: 1, tempTarget: '15', time: '00:00',
    }, {
      fanSpeed: '255', num: 2, tempTarget: '15', time: '00:00',
    }, {
      fanSpeed: '255', num: 3, tempTarget: '15', time: '00:00',
    }, {
      fanSpeed: '255', num: 4, tempTarget: '15', time: '00:00',
    }],
    6: [{
      fanSpeed: '255', num: 1, tempTarget: '15', time: '00:00',
    }, {
      fanSpeed: '255', num: 2, tempTarget: '15', time: '00:00',
    }, {
      fanSpeed: '255', num: 3, tempTarget: '15', time: '00:00',
    }, {
      fanSpeed: '255', num: 4, tempTarget: '15', time: '00:00',
    }],
  },
};

export const timersAllDaysSlice = createSlice({
  name: 'timersAllDays',
  initialState,
  reducers: {
    setTimersAllDays: (state, action) => {
      // Декструктуризируем payload
      const { ventUnit, timers } = action.payload;


      if (ventUnit && ventUnit.length > 0 && ventUnit[0]) {
        const { day } = ventUnit[0];
        // eslint-disable-next-line no-param-reassign
        state.timersAllDays[day] = timers;
      } else {
        console.warn('No "ventUnit" found in payload or it is empty.', action.payload);
      }
    },
    changeTimersAllDays: (state, action) => {
      // Декструктуризируем payload
      const { ventUnit, timers } = action.payload;


      if (ventUnit && ventUnit.length > 0 && ventUnit[0]) {
        const { day } = ventUnit[0];
        // eslint-disable-next-line no-param-reassign
        state.timersAllDays[day] = timers;
      } else {
        console.warn('КАКАЯ ТО ОШИБКА', action.payload);
      }
    },
  },
});

export const {
  setTimersAllDays,
  changeTimersAllDays,
} = timersAllDaysSlice.actions;
