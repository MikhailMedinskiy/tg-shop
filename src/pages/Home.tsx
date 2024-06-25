import {
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import { ProductCard } from '../modules/productCard';
import { useGetCategoriesQuery, useGetProductsQuery } from '../service.ts';
import { useState } from 'react';
import { SelectedCategory } from '../types.ts';
import { NoResults } from '../components/NoResults';
import { SearchProducts } from '../modules/searchProducts/SearchProducts.tsx';
import { Spinner } from '../components/Spinner/Spinner.tsx';
import Check from '../components/Check/Check.tsx';

export const Home = () => {
  const [selectedCategory, setSelectedCategory] =
    useState<SelectedCategory>(null);

  const {
    data: productData,
    originalArgs,
    isFetching,
  } = useGetProductsQuery(selectedCategory);
  const { data: categoriesData } = useGetCategoriesQuery();

  const products = productData?.products || [];
  const categories = categoriesData?.categories || [];

  const isEmpty = !products?.length;

  const selectedCategoryName =
    categories?.find((category) => {
      return category.id.toString() === selectedCategory;
    })?.name || 'Всі';

  return (
    <Box>
      {/*search*/}
      <Box mb={4}>
        <SearchProducts />
      </Box>
      {/*banner*/}
      {/*<Box className={'banner'} mb={8}>*/}
      {/*  <Banner />*/}
      {/*</Box>*/}
      {/*menu*/}
      <Menu matchWidth>
        <MenuButton as={Button} minWidth={'100%'} mb={4}>
          {selectedCategoryName}
        </MenuButton>
        <MenuList width={'100%'}>
          <MenuItem
            onClick={() => {
              setSelectedCategory(null);
            }}
          >
            Всі
          </MenuItem>
          {categories.map((item) => (
            <MenuItem
              key={item.id}
              onClick={() => {
                setSelectedCategory(item.id.toString());
              }}
            >
              {item.name}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>

      <Check>
        <Check.If state={isFetching}>
          <Box m={12}>
            <Spinner />
          </Box>
        </Check.If>
        <Check.If state={isEmpty}>
          <NoResults />
        </Check.If>

        <Check.Else>
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
        </Check.Else>
      </Check>
    </Box>
  );
};
