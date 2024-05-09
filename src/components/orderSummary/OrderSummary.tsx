import { Divider, Text, VStack } from '@chakra-ui/react';

export const OrderSummary = () => {
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
      <Text>Загальна кількість товарів: 1</Text>
      <Text>Сума замовлення: UAH 120.00</Text>
      <Text>Знижка: 20%</Text>
      <Divider />
      <Text>До сплати: UAH 120.00</Text>
    </VStack>
  );
};
