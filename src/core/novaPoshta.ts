import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const API_URL = 'https://api.novaposhta.ua/v2.0/json/';

export const novaPoshApi = createApi({
  reducerPath: 'novaPoshApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  endpoints: () => ({}),
  tagTypes: [],
});
