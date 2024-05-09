import { Box, Button, Heading, Text } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { PATHS } from '../utils/constants.ts';

export const NotFound = () => {
  return (
    <Box
      textAlign='center'
      h='100vh'
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
    >
      <Heading fontSize='5xl' color='gray.800'>
        404
      </Heading>
      <Text fontSize='xl' color='gray.600' mb={4}>
        Упс! Сторінку не знайдено
      </Text>
      <NavLink to={PATHS.home}>
        <Button colorScheme='teal' size='lg'>
          До головної
        </Button>
      </NavLink>
    </Box>
  );
};
