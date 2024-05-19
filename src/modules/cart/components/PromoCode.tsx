import { Button, HStack, Input, Text, VStack } from '@chakra-ui/react';

export const PromoCode = () => {
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
        Promo code
      </Text>
      <HStack width={'full'} alignItems={'start'} justifyContent={'end'}>
        <Input width={'auto'} placeholder='Введіть промокод' />
        <Button px='4' colorScheme='teal'>
          Застусувати
        </Button>
      </HStack>
    </VStack>
  );
};
