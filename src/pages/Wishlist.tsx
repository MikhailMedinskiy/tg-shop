import { Box, VStack } from '@chakra-ui/react';
import { useGetLikedProductsQuery } from '../service.ts';
import { Spinner } from '../components/Spinner/Spinner.tsx';
import { AppError } from '../modules/appError';

import { PageTitle } from '../components/pageTitle/PageTitle.tsx';
import { EmptyWishList } from '../modules/wishlist/components/EmptyWishList.tsx';
import { WishlistProducts } from '../modules/wishlist/components/WishlistProducts.tsx';

export const Wishlist = () => {
  const { data, isLoading, isError } = useGetLikedProductsQuery();
  const products = data?.products || [];

  if (isLoading) {
    return <Spinner isFullHeight />;
  }

  if (isError) {
    return <AppError />;
  }

  if (!products.length) {
    return <EmptyWishList />;
  }

  return (
    <Box>
      <PageTitle title={'Вподобайки'} />
      <VStack>
        <WishlistProducts products={products} />
      </VStack>
    </Box>
  );
};
