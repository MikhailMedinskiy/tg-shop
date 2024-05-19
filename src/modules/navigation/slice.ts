import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../core/store.ts';

const initialState = {
  count: 0,
};

const slice = createSlice({
  name: 'cartCount',
  initialState,
  reducers: {
    setCardCount(state, { payload }: PayloadAction<number>) {
      state.count = payload;
    },
  },
});

export const cartCountReducer = slice.reducer;
export const { setCardCount } = slice.actions;
export const getCartCount = (state: RootState) => state.cartCount.count;
