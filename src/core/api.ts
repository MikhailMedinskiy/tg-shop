import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from './store.ts';
import { getToken } from '../modules/AuthProvider/slice.ts';
import { API_URL } from './constants.ts';

const tagTypes = ['LikedProducts', 'CartList'] as const;

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;

    const accessToken = getToken(state);

    return getHeaders({ headers, accessToken });
  },
});

export function getHeaders({
  headers: initHeaders,
  accessToken,
}: any): Headers {
  const headers = initHeaders || new Headers();
  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`);
  }

  return headers;
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQuery,
  endpoints: () => ({}),
  tagTypes,
});
