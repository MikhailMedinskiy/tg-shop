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
import { Banner } from '../modules/banner/Banner.tsx';
import { ProductCard } from '../modules/productCard';
import { useGetCategoriesQuery, useGetProductsQuery } from '../service.ts';
import { useState } from 'react';
import { SelectedCategory } from '../types.ts';
import { NoResults } from '../components/NoResults';

export const Home = () => {
  const [selectedCategory, setSelectedCategory] =
    useState<SelectedCategory>(null);

  const { data: productData, originalArgs } =
    useGetProductsQuery(selectedCategory);
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
      <Input placeholder='Search' mb={8} />
      {/*banner*/}
      <Box className={'banner'} mb={8}>
        <Banner />
      </Box>
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

      {isEmpty ? (
        <NoResults />
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
                images={item.variants[0].image}
                isWishlist={item.is_liked}
              />
            </GridItem>
          ))}
        </Grid>
      )}
    </Box>
  );
};
