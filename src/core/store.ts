import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { api } from './api.ts';
import { setupListeners } from '@reduxjs/toolkit/query';

import { novaPoshApi } from './novaPoshta.ts';
import { authReducer } from '../modules/auth/slice.ts';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { cartCountReducer } from '../modules/navigation/slice.ts';
import { promoReducer } from '../modules/cart/slice.ts'; // defaults to localStorage for web

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'promo'],
};

export const rootReducer = combineReducers({
  auth: authReducer,
  cartCount: cartCountReducer,
  promo: promoReducer,
  [api.reducerPath]: api.reducer,
  [novaPoshApi.reducerPath]: novaPoshApi.reducer,
});
export const store = configureStore({
  reducer: persistReducer<ReturnType<typeof rootReducer>>(
    persistConfig,
    rootReducer
  ),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([api.middleware, novaPoshApi.middleware]),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
