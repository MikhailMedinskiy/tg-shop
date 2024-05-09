import { Box, Heading, Flex, Spinner } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { Banner } from '../components/banner/Banner.tsx';
import { useGetCategoriesQuery } from '../service.ts';

export const Catalog = () => {
  const { data, isLoading } = useGetCategoriesQuery();
  const categories = data?.categories || [];

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Box>
      <Box className={'banner'} mb={8}>
        <Banner />
      </Box>

      <Box>
        <Heading as={'h1'} mb={4}>
          Каталог
        </Heading>
        <Box>
          {categories.map((item) => (
            <Link to={`/catalog/${item.url}`}>
              <Flex
                height={'200px'}
                bgImage={item.url}
                alignItems={'center'}
                justifyContent={'center'}
                p={4}
                mb={1}
                fontWeight={'semibold'}
                fontSize={'xl'}
                textAlign={'center'}
              >
                {item.name}
              </Flex>
            </Link>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
