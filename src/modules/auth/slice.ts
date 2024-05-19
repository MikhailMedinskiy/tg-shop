import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../core/store.ts';
import { UserAuthProps } from './types.ts';

const initialState = {
  username: '',
  authToken: '',
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthData(state, { payload }: PayloadAction<UserAuthProps>) {
      state.username = payload.userName;
      state.authToken = payload.authToken;
    },
  },
});

export const authReducer = slice.reducer;
export const { setAuthData } = slice.actions;
export const getUserName = (state: RootState) => state.auth.username;
export const getToken = (state: RootState) => state.auth.authToken;
