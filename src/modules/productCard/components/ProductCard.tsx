import {
  Box,
  Image,
  Text,
  Button,
  Flex,
  IconButton,
  VStack,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import { generatePath, NavLink } from 'react-router-dom';
import { PATHS } from '../../../utils/constants.ts';
import { FaHeart, FaRegHeart } from 'react-icons/fa6';
import { useToWishlist } from '../../../hooks/useToWishlist.ts';
import { API_URL } from '../../../core/constants.ts';
import { SelectedCategory } from '../../../types.ts';

type ProductCardProps = {
  name: string;
  slug: string | number;
  catalogName: string;
  price: number;
  images: string;
  oldPrice?: string;
  isWishlist: boolean;
  productsArgs: SelectedCategory;
};

export const ProductCard = ({
  name,
  slug,
  catalogName,
  price,
  images,
  isWishlist,
  productsArgs,
}: ProductCardProps) => {
  const { toggleWithList } = useToWishlist({
    isWishlist,
    productId: slug,
    productsArgs,
  });

  return (
    <VStack
      borderWidth='1px'
      borderRadius='lg'
      overflow='hidden'
      position={'relative'}
      height={'full'}
      alignItems={'stretch'}
      justifyContent={'stretch'}
    >
      <IconButton
        aria-label={'toggle wishlist'}
        icon={isWishlist ? <FaHeart /> : <FaRegHeart />}
        colorScheme='teal'
        mt='3'
        position={'absolute'}
        right={2}
        top={0}
        onClick={toggleWithList}
      />
      <NavLink to={generatePath(PATHS.product, { slug: `${slug}` })}>
        <Image
          src={`${API_URL}/${images}`}
          alt={name}
          height={'200px'}
          objectFit={'cover'}
          width={'full'}
        />
      </NavLink>

      <Box p='2' flexGrow={1}>
        <NavLink to={generatePath(PATHS.product, { slug: `${slug}` })}>
          <Grid flexGrow={1} height={'100%'} gridTemplateRows={'1fr auto'}>
            <GridItem>
              <Flex alignItems='baseline'>
                <Text mt='2' fontWeight='semibold' as='h4'>
                  {name}
                </Text>
              </Flex>

              <Box>
                <Text fontWeight='bold' color={'red'} lineHeight={'tight'}>
                  UAH {price}
                </Text>
              </Box>

              <Box mt='2' alignItems='center'>
                {catalogName}
              </Box>
            </GridItem>

            <GridItem>
              <Button colorScheme='teal' mt='3' width={'full'}>
                Відкрити товар
              </Button>
            </GridItem>
          </Grid>
        </NavLink>
      </Box>
    </VStack>
  );
};
