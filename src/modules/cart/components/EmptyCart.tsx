import { Button, Flex, Heading, Icon, Text } from '@chakra-ui/react';
import { FaShoppingCart } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

export const EmptyCart = () => {
  return (
    <Flex
      height='80vh'
      alignItems='center'
      justifyContent='center'
      flexDirection='column'
    >
      <Icon as={FaShoppingCart} boxSize={24} color='gray.400' />
      <Heading as='h2' size='lg' mt={4} color='gray.600'>
        Кошик порожній
      </Heading>
      <Text mt={2} color='gray.500'>
        Виберіть товар та додайте його до кошика
      </Text>
      <Button
        as={NavLink}
        to='/'
        mt={4}
        colorScheme='teal'
        size='md'
        borderRadius='md'
      >
        До головної
      </Button>
    </Flex>
  );
};
