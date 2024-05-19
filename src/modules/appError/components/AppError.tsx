import { Button, Flex, Heading, Icon, Text } from '@chakra-ui/react';
import { FaExclamationCircle } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

export const AppError = () => {
  return (
    <Flex
      height='70vh'
      alignItems='center'
      justifyContent='center'
      flexDirection='column'
    >
      <Icon as={FaExclamationCircle} boxSize={24} color='gray.400' />
      <Heading as='h2' size='lg' mt={4} color='gray.600'>
        Щось не так
      </Heading>
      <Text mt={2} color='gray.500' textAlign={'center'}>
        Ми спіймали помилку і вже працюємо над виправленням
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
