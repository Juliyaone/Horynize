import { configureStore } from '@reduxjs/toolkit';
import { usersApi } from './usersApi';
import usersReducer from './slices/usersSlice';
// import someOtherReducer from './slices/someOtherSlice';

const store = configureStore({
  reducer: {
    // Добавьте users: usersReducer в объект reducer
    users: usersReducer,
    // Добавьте сюда все остальные reducers, которые у вас есть
    // someOther: someOtherReducer
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(usersApi.middleware),
});

export default store;
