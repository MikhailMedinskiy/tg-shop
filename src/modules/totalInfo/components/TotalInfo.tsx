import { Divider, Text, VStack } from '@chakra-ui/react';
import { CartItem } from '../../../types.ts';

type OrderSummaryProps = {
  variants: CartItem[];
};
export const TotalInfo = ({ variants }: OrderSummaryProps) => {
  const total = variants.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const quantity = variants.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <VStack
      borderWidth='1px'
      borderRadius='lg'
      p='4'
      width={'full'}
      justifyContent={'end'}
      alignItems={'end'}
    >
      <Text fontSize='xl' fontWeight='bold'>
        Загальна інформація
      </Text>
      <Text>Загальна кількість товарів: {quantity}</Text>
      <Text>Сума замовлення: UAH {total}</Text>
      {/*<Text>Знижка: 20%</Text>*/}
      <Divider />
      <Text>До сплати: UAH {total}</Text>
    </VStack>
  );
};
