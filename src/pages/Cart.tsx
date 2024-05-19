import { VStack } from '@chakra-ui/react';
import { TotalInfo } from '../modules/totalInfo';
import { useGetCartItemsQuery } from '../service.ts';
import { Spinner } from '../components/Spinner/Spinner.tsx';
import {
  EmptyCart,
  ToOrderButton,
  CartProducts,
  PromoCode,
} from '../modules/cart';
import { AppError } from '../modules/appError';
import { PageTitle } from '../components/pageTitle/PageTitle.tsx';

export const Cart = () => {
  const { data, isError, isLoading } = useGetCartItemsQuery();

  const variants = data?.line_items || [];

  if (isLoading) {
    return <Spinner isFullHeight />;
  }

  if (isError) {
    return <AppError />;
  }

  if (!variants.length) {
    return <EmptyCart />;
  }

  return (
    <VStack alignItems={'start'} width={'full'}>
      <PageTitle title={'Кошик'} />
      <CartProducts variants={variants} />
      <PromoCode />
      <TotalInfo variants={variants} />
      <ToOrderButton />
    </VStack>
  );
};
