import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import * as urls from './urls';

import { getTokenFromStorage, saveTokenToStorage, deleteTokenFromStorage } from '../components/providers/tokenStorage';

import { getStoredCredentials } from '../components/providers/SecureStore';
import { setUser } from './slices/usersSlice';
import { setContacts } from './slices/contactsSlice';
import { setControllers, setUserContollers } from './slices/controllersSlice';
import { setCurrentParams, setCurrentId } from './slices/currentControllerSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: urls.BASE_URL,
  prepareHeaders: async (headers) => {
    const token = await getTokenFromStorage();

    // console.log('старый token из usersApi', token);
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result?.error && (result?.error.data === 'Token timestamp error'
  || result?.error.data === 'Token not found in request')) {
    await deleteTokenFromStorage();
    const credentials = await getStoredCredentials(); // функция для получения сохраненных логина и пароля

    if (credentials) {
      const { username, password } = credentials;
      try {
        const refreshResult = await baseQuery(
          { url: `${urls.LOGIN}`, method: 'POST', body: { username, password } },
          api,
          extraOptions,
        )
        if (refreshResult.data['0'].jwt) {
          // Если авторизация прошла успешно, сохраните новый токен и продолжите выполнение запроса
          await saveTokenToStorage(refreshResult.data['0'].jwt);
        }
      } catch (error) { /* empty */ }
    }
  }
  return result;
}

export const usersApi = createApi({
  // reducerPath: 'usersApi',
// tagTypes: ['MetaInfo', 'User', 'Units', 'Unit', 'Params'],
  // baseQuery: fetchBaseQuery({
  //   baseUrl: urls.BASE_URL,
  //   prepareHeaders: async (headers) => {
  //     const token = await getTokenFromStorage();

  //     console.log('старый token из usersApi', token);
  //     if (token) {
  //       headers.set('Authorization', `Bearer ${token}`);
  //     }
  //     return headers;
  //   },

  //   async onResponse(response) {
  //     if (response.status === 401 || response.status === 403 || response.status === 'PARSING_ERROR') {
  //       const credentials = await getStoredCredentials(); // функция для получения сохраненных логина и пароля
  //       console.log('credentials', credentials);

  //       if (credentials) {
  //         const { login, password } = credentials;
  //         try {
  //           const result = await api.dispatch(loginUser({ login, password }));
  //           console.log('result', result);
  //         } catch (error) {
  //           console.log('Error during re-authentication:', error);
  //         }
  //         if (result.data !== 'Token timestamp error') {
  //           // Если авторизация прошла успешно, сохраните новый токен и продолжите выполнение запроса
  //           await saveTokenToStorage(result['0'].jwt);
  //         } else {
  //           // Если повторная авторизация не удалась, вывести пользователя из системы
  //         }
  //       }
  //     }
  //   },

  // }),
  // baseQuery,
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({

    getUnitsAll: builder.query({
      query: () => ({
        url: urls.GET_UNITS,
        method: 'POST',
      }),
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          dispatch(setControllers(result.data.models));
        } catch (error) { /* empty */ }
      },
    }),
    getContacts: builder.query({
      query: () => ({
        url: urls.GET_CONTACTS,
        method: 'POST',
      }),
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          dispatch(setContacts(result.data.contacts[0]));
        } catch (error) { /* empty */ }
      },
    }),
    loginUser: builder.mutation({
      query: (body) => ({
        url: urls.LOGIN,
        method: 'POST',
        body,
      }),
      // transformResponse: (result) => result.data,
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          dispatch(setUser(result.data['0']));
        } catch (error) { /* empty */ }
      },
    }),
    registerUser: builder.mutation({
      query: (body) => ({
        url: urls.REGISTRATION,
        method: 'POST',
        body: {
          ...body,
        },
      }),
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          dispatch(setUser(result.data['0']));
        } catch (error) { /* empty */ }
      },
    }),
    changePassword: builder.mutation({
      query: (body) => ({
        url: urls.CHANGE_PASSWORD,
        method: 'PUT',
        body: {
          ...body,
        },
      }),
    }),
    getUnits: builder.mutation({
      query: (body) => ({
        url: urls.UNITS_ALL,
        method: 'POST',
        body: {
          ...body,
        },
      }),
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          dispatch(setUserContollers(result.data['vent-units']));
        } catch (error) { /* empty */ }
      },
    }),
    sendParams: builder.mutation({
      query: (body) => ({
        url: urls.UNITS_SET_PARAMS,
        method: 'POST',
        body: {
          ...body,
        },
      }),
    }),
    getParams: builder.query({
      query: (body) => ({
        url: urls.UNITS_GET_PARAMS,
        method: 'POST',
        body: {
          ...body,
          controllerId: String(body.controllerId),
        },
      }),
      // providesTags: ['Params'],
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          dispatch(setCurrentParams(result.data.data[0]));
          dispatch(setCurrentId(result.data['vent-unit'][0]['id_vent-unit']));
        } catch (error) { /* empty */ }
      },
    }),
    bind: builder.mutation({
      query: (body) => ({
        url: urls.UNITS_BIND,
        method: 'POST',
        body: {
          ...body,
        },
      }),
    }),
    unitsGetDayTimers: builder.query({
      query: (body) => ({
        url: urls.UNITS_DAY_TIMERS,
        method: 'POST',
        body: {
          ...body,
        },
      }),
    }),
    getTimersUnit: builder.query({
      query: (body) => ({
        url: urls.UNITS_TIMERS,
        method: 'POST',
        body: {
          ...body,
        },
      }),
    }),
    sendDayTimers: builder.mutation({
      query: (body) => ({
        url: urls.UNITS_SET_DAY_TIMERS,
        method: 'POST',
        body: {
          ...body,
        },
      }),
    }),
    sendTimers: builder.mutation({
      query: (body) => ({
        url: urls.UNITS_SET_TIMERS,
        method: 'POST',
        body: {
          ...body,
        },
      }),
    }),
    // new api
    getModelsOfUser: builder.mutation({
      query: (body) => ({
        url: urls.UNITS_ALL,
        method: 'POST',
        body: {
          ...body,
        },
      }),
    }),
    getParamsModelsOfUser: builder.mutation({
      query: (body) => ({
        url: urls.UNITS_GET_PARAMS,
        method: 'POST',
        body: {
          ...body,
          controllerId: String(body.controllerId),
        },
      }),
    }),
    getModels: builder.query({
      query: () => ({
        url: urls.GET_UNITS,
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useGetUnitsAllQuery,
  useGetContactsQuery,
  useLoginUserMutation,
  useRegisterUserMutation,
  useGetUnitsMutation,
  useSendParamsMutation,
  useGetParamsQuery,
  useBindMutation,
  useUnitsGetDayTimersQuery,
  useGetTimersUnitQuery,
  useSendDayTimersMutation,
  useSendTimersMutation,
  useChangePasswordMutation,
  // new api
  useGetModelsOfUserMutation,
  useGetParamsModelsOfUserMutation,
  useGetModelsQuery,
} = usersApi;
