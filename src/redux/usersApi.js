import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import * as urls from './urls';

import {
  getTokenFromStorage, saveTokenToStorage, deleteTokenFromStorage, getRefreshTokenFromStorage, saveRefreshTokenToStorage, getUserIdFromStorage,
} from '../components/providers/tokenStorage';

import { setUser } from './slices/usersSlice';
import { setContacts } from './slices/contactsSlice';
import { setTimersDay } from './slices/timersDaySlice';
import { setDaysTimer } from './slices/daysTimerSlice';
import { setTimersAllDays } from './slices/timersAllDaysSlice';


import { setControllers, setUserContollers } from './slices/controllersSlice';
import { setCurrentParams, setCurrentId } from './slices/currentControllerSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: urls.BASE_URL,
  prepareHeaders: async (headers) => {
    const token = await getTokenFromStorage();

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error && (result?.error.data === 'Token not found in request'
  || result?.error.data === 'Token timestamp error')) {
    await deleteTokenFromStorage();

    const refreshToken = await getRefreshTokenFromStorage('userRefreshToken');

    const userId = await getUserIdFromStorage();

    if (refreshToken) {
      try {
        // Запрос на обновление access token с использованием refresh token
        const refreshResult = await baseQuery({
          url: urls.REFRESH_TOKEN,
          method: 'POST',
          body: {
            "refreshToken": refreshToken,
            "userId": userId,
          },
        }, api, extraOptions);

        if (refreshResult.data?.refreshToken) {
          // Если обновление прошло успешно, сохраняем новый access token  и refresh_token далее повторяем исходный запрос
          await saveTokenToStorage(refreshResult.data.jwt);
          await saveRefreshTokenToStorage(refreshResult.data.refreshToken);

          // Повторение исходного запроса с новым access token
          result = await baseQuery(args, api, extraOptions);
        }
      } catch (error) {
        console.error('Ошибка при обновлении какого токена', error);
        // Обработка ошибок обновления токена, например, переадресация на страницу логина
      }
    }
  }
  return result;
}

export const usersApi = createApi({

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
    getUnitsUser: builder.mutation({
      query: (body) => ({
        url: urls.GET_UNITS_USER,
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
          dispatch(setUser(result.data));
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
    deleteUser: builder.mutation({
      query: (body) => ({
        url: urls.DELETE_USER,
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
          controllerId: String(body.controllerId),
        },
      }),
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
    getUserTokens: builder.query({
      query: (body) => ({
        url: urls.GET_USER_TOKENS,
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
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          dispatch(setDaysTimer(result.data));
        } catch (error) {
          dispatch(setDaysTimer({
            timers: ['Не загрузились данные'],
            'vent-unit': ['Не загрузились данные'],
          }));
        }
      },
    }),
    getTimersUnit: builder.query({
      query: (body) => ({
        url: urls.UNITS_TIMERS,
        method: 'POST',
        body: {
          ...body,
        },
      }),
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          dispatch(setTimersDay(result.data));
        } catch (error) {
          dispatch(setTimersDay({
            timers: ['Не загрузились данные'],
          }));
        }
      },
    }),

    getTimersUnitAll: builder.mutation({
      query: (body) => ({
        url: urls.UNITS_TIMERS,
        method: 'POST',
        body: {
          ...body,
        },
      }),
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          dispatch(setTimersAllDays(result.data));
        } catch (error) {
          dispatch(setTimersAllDays({
            timersAllDays: ['Не загрузились данные'],
          }));
        }
      },
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
    // getModelsOfUser: builder.mutation({
    //   query: (body) => ({
    //     url: urls.UNITS_ALL,
    //     method: 'POST',
    //     body: {
    //       ...body,
    //     },
    //   }),
    // }),
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

    fetchAuthConfig: builder.query({
      query: () => ({
        url: urls.URL_API_ENDPOINT,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetUnitsAllQuery,
  useGetUnitsUserMutation,

  useGetContactsQuery,

  useLoginUserMutation,
  useRegisterUserMutation,

  useGetUserTokensQuery,

  useSendParamsMutation,
  useGetParamsQuery,

  useBindMutation,
  useUnitsGetDayTimersQuery,
  useGetTimersUnitQuery,

  useGetTimersUnitAllMutation, // получать таймеры по очереди на все дни на которые установлен таймер

  useSendDayTimersMutation,
  useSendTimersMutation,

  useChangePasswordMutation,
  // new api
  // useGetModelsOfUserMutation,
  useGetParamsModelsOfUserMutation,
  // useGetModelsQuery,
  useFetchAuthConfigQuery,
  useDeleteUserMutation,
} = usersApi;
