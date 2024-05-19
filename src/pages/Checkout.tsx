import { useGetCartItemsQuery } from '../service.ts';
import { EmptyCart } from '../modules/cart';
import { Checkout as CheckoutPage } from '../modules/checkout/components/Checkout.tsx';
import { Spinner } from '../components/Spinner/Spinner.tsx';
import { AppError } from '../modules/appError';

export const Checkout = () => {
  const { data, isError, isLoading } = useGetCartItemsQuery();
  const variants = data?.line_items || [];

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <AppError />;
  }

  if (!variants.length) {
    return <EmptyCart />;
  }

  return <CheckoutPage variants={variants} />;
};
