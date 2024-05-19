import { CartItem } from '../../types.ts';

export type CheckoutFormProps = {
  payMethod: 'afterCash' | 'cash';
  fullName: string;
  phone: string;
  city: { label: string; value: string } | null;
  np: { label: string; value: string } | null;
  comment: string;
};

export type CheckoutProps = {
  variants: CartItem[];
};
