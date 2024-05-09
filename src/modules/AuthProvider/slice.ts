import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../core/store.ts';

type UserAuthT = {
  userName: string;
  authToken: string;
};
const initialState = {
  username: '',
  authToken: '',
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthData(state, { payload }: PayloadAction<UserAuthT>) {
      state.username = payload.userName;
      state.authToken = payload.authToken;
    },
  },
});

export const authReducer = slice.reducer;
export const { setAuthData } = slice.actions;
export const getUserName = (state: RootState) => state.auth.username;
export const getToken = (state: RootState) => state.auth.authToken;
