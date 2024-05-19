import { Icon, Text, VStack } from '@chakra-ui/react';
import { FaBoxOpen } from 'react-icons/fa';

export function NoResults() {
  return (
    <VStack alignItems={'center'} p={4}>
      <Icon as={FaBoxOpen} boxSize={24} color='gray.400' />
      <Text fontSize={'lg'}>Нічого не знайдено</Text>
    </VStack>
  );
}
