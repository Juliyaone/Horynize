import { configureStore } from '@reduxjs/toolkit';
import { usersApi } from './usersApi';
import { authSlice } from './slices/usersSlice';
import { contactsSlice } from './slices/contactsSlice';
import { controllersSlice } from './slices/controllersSlice';
import { currentControllerSlice } from './slices/currentControllerSlice';
import { timersDaySlice } from './slices/timersDaySlice';
import { daysTimerSlice } from './slices/daysTimerSlice';

export const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
    auth: authSlice.reducer,
    contacts: contactsSlice.reducer,
    contollers: controllersSlice.reducer,
    currentContoller: currentControllerSlice.reducer,
    timersDay: timersDaySlice.reducer,
    daysTimer: daysTimerSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(usersApi.middleware),
  devTools: true,
});
