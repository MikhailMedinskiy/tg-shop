import { Box, Grid, GridItem, Heading } from '@chakra-ui/react';
import { ProductCard } from '../components/productCard/ProductCard.tsx';
import { useGetProductsQuery } from '../service.ts';

export const ProdictList = () => {
  const { data: productData } = useGetProductsQuery();
  const products = productData?.products || [];

  return (
    <Box>
      <Heading as={'h1'} mb={4}>
        Список продуктів
      </Heading>
      <Grid gridTemplateColumns={'1fr 1fr'} gap={2}>
        {products.map((item) => (
          <GridItem key={item.id}>
            <ProductCard
              name={item.name}
              slug={item.id}
              catalogName={item.category.name}
              price={item.price + ' usd'}
              images={item.variants[0].image}
              isWishlist={item.is_liked}
            />
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};
