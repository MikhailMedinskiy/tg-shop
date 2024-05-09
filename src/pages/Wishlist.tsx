import { Box, VStack, Button, Heading } from '@chakra-ui/react';
import { ProductH } from '../components/productWithCounter/ProductH.tsx';

export const Wishlist = () => {
  return (
    <Box>
      <Heading as={'h1'} mb={4}>
        Вподобайки
      </Heading>
      <VStack>
        <ProductH hideCounter>
          <VStack justifyContent={'stretch'} px={4} pb={4}>
            <Button width={'full'} colorScheme={'teal'}>
              Відкрити товар
            </Button>
          </VStack>
        </ProductH>
      </VStack>
    </Box>
  );
};
