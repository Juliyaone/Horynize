import { configureStore } from '@reduxjs/toolkit';
import { usersApi } from './usersApi';
import { authSlice } from './slices/usersSlice';
import { contactsSlice } from './slices/contactsSlice';
import { controllersSlice } from './slices/controllersSlice';
import { currentControllerSlice } from './slices/currentControllerSlice';

export const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
    auth: authSlice.reducer,
    contacts: contactsSlice.reducer,
    contollers: controllersSlice.reducer,
    currentContoller: currentControllerSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(usersApi.middleware),
  devTools: true,
});
