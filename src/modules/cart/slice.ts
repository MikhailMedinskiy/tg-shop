import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../core/store.ts';
import { Discount } from '../../types.ts';

type PromoState = {
  code: string | null;
  id: number | null;
  discount: number | null;
};

const initialState: PromoState = {
  code: null,
  id: null,
  discount: null,
};

const slice = createSlice({
  name: 'promo',
  initialState,
  reducers: {
    setPromo(state, { payload }: PayloadAction<Discount>) {
      state.code = payload.code;
      state.id = payload.id;
      state.discount = Number(payload.percentage_discount);
    },
    resetPromo() {
      return initialState;
    },
  },
});

export const promoReducer = slice.reducer;
export const { setPromo, resetPromo } = slice.actions;

export const getDiscount = (state: RootState) => state.promo.discount;
export const getPromoCode = (state: RootState) => state.promo.code;
export const getPromo = (state: RootState) => state.promo;
