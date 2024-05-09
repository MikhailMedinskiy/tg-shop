import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { api } from './api.ts';
import { setupListeners } from '@reduxjs/toolkit/query';

import { novaPoshApi } from './novaPoshta.ts';
import { authReducer } from '../modules/AuthProvider/slice.ts';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};

export const rootReducer = combineReducers({
  auth: authReducer,
  [api.reducerPath]: api.reducer,
  [novaPoshApi.reducerPath]: novaPoshApi.reducer,
});
export const store = configureStore({
  reducer: persistReducer<ReturnType<typeof rootReducer>>(
    persistConfig,
    rootReducer
  ),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([api.middleware, novaPoshApi.middleware]),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
