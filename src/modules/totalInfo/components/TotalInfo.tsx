import { Divider, Text, VStack } from '@chakra-ui/react';
import { CartItem } from '../../../types.ts';
import { useAppSelector } from '../../../core/hooks.ts';
import { getDiscount } from '../../cart/slice.ts';

type OrderSummaryProps = {
  variants: CartItem[];
};
export const TotalInfo = ({ variants }: OrderSummaryProps) => {
  const discount = useAppSelector(getDiscount);
  const total = variants.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const quantity = variants.reduce((acc, item) => acc + item.quantity, 0);

  const totalWithDiscount = discount ? total - (total * discount) / 100 : total;

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
      {discount && <Text>Знижка: {discount}%</Text>}
      <Divider />
      <Text>До сплати: UAH {totalWithDiscount}</Text>
    </VStack>
  );
};
