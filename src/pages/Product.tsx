import { Text } from '@chakra-ui/react';

import { useProduct } from '../hooks/useProduct.ts';
import { Spinner } from '../components/Spinner/Spinner.tsx';

import { Product as ProductPage } from '../modules/product/components/Product.tsx';
import { AppError } from '../modules/appError';

export const Product = () => {
  const { isLoading, isFetching, isError, product } = useProduct();

  if (isLoading || isFetching) {
    return <Spinner isFullHeight />;
  }

  if (isError) {
    return <AppError />;
  }

  if (!product) {
    return <Text>Product not found</Text>;
  }

  return <ProductPage product={product} />;
};
