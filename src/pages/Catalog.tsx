import { Box, Heading, Flex } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { Banner } from '../modules/banner/Banner.tsx';
import { useGetCategoriesQuery } from '../service.ts';
import { Spinner } from '../components/Spinner/Spinner.tsx';
import { API_URL } from '../core/constants.ts';

export const Catalog = () => {
  const { data, isLoading } = useGetCategoriesQuery();
  const categories = data?.categories || [];

  if (isLoading) {
    return <Spinner isFullHeight />;
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
            <Link to={`/catalog/${item.id}`}>
              <Flex
                height={'200px'}
                bgImage={`${API_URL}${item.image}`}
                alignItems={'center'}
                justifyContent={'center'}
                p={4}
                mb={1}
                fontWeight={'semibold'}
                fontSize={'xl'}
                textAlign={'center'}
                color={'white'}
                textShadow={'0 0 5px rgba(0, 0, 0,0.7)'}
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
