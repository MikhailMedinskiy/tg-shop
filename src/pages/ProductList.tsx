import { Box, Grid, GridItem, Heading } from '@chakra-ui/react';
import { ProductCard } from '../modules/productCard';
import { useGetProductsQuery } from '../service.ts';
import { useParams } from 'react-router-dom';
import { NoResults } from '../components/NoResults';
import { Spinner } from '../components/Spinner/Spinner.tsx';

export const ProductList = () => {
  const { slug } = useParams();
  const {
    data: productData,
    originalArgs,
    isLoading,
  } = useGetProductsQuery(slug || null);
  const products = productData?.products || [];

  if (isLoading) {
    return <Spinner isFullHeight />;
  }

  return (
    <Box>
      <Heading as={'h1'} mb={4}>
        Список продуктів
      </Heading>

      {products.length === 0 ? (
        <Box height={'full'}>
          <NoResults />
        </Box>
      ) : (
        <Grid
          gridTemplateColumns={{
            base: '1fr',
            sm: '1fr 1fr',
          }}
          gap={2}
        >
          {products.map((item) => (
            <GridItem key={item.id}>
              <ProductCard
                productsArgs={originalArgs || null}
                name={item.name}
                slug={item.id}
                catalogName={item.category.name}
                price={item.price}
                images={item.image}
                isWishlist={item.is_liked}
              />
            </GridItem>
          ))}
        </Grid>
      )}
    </Box>
  );
};
