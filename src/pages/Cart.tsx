import { Button, Heading, VStack } from '@chakra-ui/react';
import { OrderSummary } from '../components/orderSummary/OrderSummary.tsx';
import { ProductH } from '../components/productWithCounter/ProductH.tsx';
import { PromoCode } from '../modules/PromoCode';

export const Cart = () => {
  return (
    <VStack alignItems={'start'} width={'full'}>
      <Heading as={'h1'} mb={4}>
        Кошик
      </Heading>
      <ProductH />
      <PromoCode />
      <OrderSummary />
      <Button colorScheme='teal' width={'full'}>
        Замовити
      </Button>
    </VStack>
  );
};
