import {
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Input,
  Button,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import { Banner } from '../components/banner/Banner.tsx';
import { ProductCard } from '../components/productCard/ProductCard.tsx';
import { useGetCategoriesQuery, useGetProductsQuery } from '../service.ts';

export const Home = () => {
  // TODO request for catalog list, show loading and error state
  // TODO request for products list, show loading and error state
  const { data: productData } = useGetProductsQuery();
  const { data: categoriesData } = useGetCategoriesQuery();

  const products = productData?.products || [];
  const categories = categoriesData?.categories || [];

  return (
    <Box>
      {/*search*/}
      <Input placeholder='Search' mb={8} />
      {/*banner*/}
      <Box className={'banner'} mb={8}>
        <Banner />
      </Box>
      {/*menu*/}
      <Menu matchWidth>
        <MenuButton as={Button} minWidth={'100%'} mb={4}>
          Всі
        </MenuButton>
        <MenuList width={'100%'}>
          <MenuItem>Всі</MenuItem>
          {categories.map((item) => (
            <MenuItem key={item.name}>{item.name}</MenuItem>
          ))}
        </MenuList>
      </Menu>

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
