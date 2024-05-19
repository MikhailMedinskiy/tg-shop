import { VStack } from '@chakra-ui/react';
import { TotalInfo } from '../modules/totalInfo';
import { useGetCartItemsQuery } from '../service.ts';
import { Spinner } from '../components/Spinner/Spinner.tsx';
import { EmptyCart, ToOrderButton, CartProducts } from '../modules/cart';
import { AppError } from '../modules/appError';
import { PageTitle } from '../components/pageTitle/PageTitle.tsx';

export const Cart = () => {
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

  return (
    <VStack alignItems={'start'} width={'full'}>
      <PageTitle title={'Кошик'} />
      <CartProducts variants={variants} />
      <TotalInfo variants={variants} />
      <ToOrderButton />
    </VStack>
  );
};
