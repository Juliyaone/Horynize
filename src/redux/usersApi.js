import * as urls from "./urls";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { getTokenFromStorage, saveTokenToStorage } from "../components/providers/tokenStorage";

import { getStoredCredentials } from "../components/providers/SecureStore";

export const usersApi = createApi({
  reducerPath: 'usersApi',

  tagTypes: ['MetaInfo', 'User', 'Units', 'Unit', 'Params'],

  baseQuery: fetchBaseQuery({
    baseUrl: urls.BASE_URL,
    prepareHeaders: async (headers) => {
    const token = await getTokenFromStorage();

    console.log('старый token из usersApi', token);
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },

    async onResponse(response) {
      if (response.status === 401 || response.status === 403 || response.status === "PARSING_ERROR" ) {
        const credentials = await getStoredCredentials(); // функция для получения сохраненных логина и пароля
            console.log('credentials', credentials);

        if (credentials) {
          const { login, password } = credentials;
          try {
            const result = await api.dispatch(loginUser({ login, password }));
            console.log('result', result);
          } catch (error) {
            console.log('Error during re-authentication:', error);
          }
          if (result.data !== "Token timestamp error") {
            // Если авторизация прошла успешно, сохраните новый токен и продолжите выполнение запроса
            await saveTokenToStorage(result["0"].jwt);
            
          } else {
            // Если повторная авторизация не удалась, вывести пользователя из системы
          }
      }
    }
}

  }),

    endpoints: (builder) => ({

    getUnitsAll: builder.query({
      query: () => ({
        url: urls.GET_UNITS,
        method: 'POST',
      }),
    }),
    getContacts: builder.query({
      query: () => ({
        url: urls.GET_CONTACTS,
        method: 'POST',
      }),
    }),
    loginUser: builder.mutation({
      query: (body) => ({
        url: urls.LOGIN,
        method: 'POST',
        body,
      }),
    }),
    registerUser: builder.mutation({
      query: (body) => ({
        url: urls.REGISTRATION,
        method: 'POST',
        body: {
          ...body,
        },
      }),
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
        },
      }),
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
 
  })

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
  useChangePasswordMutation
} = usersApi;