import { Box, Radio, RadioGroup, Text, VStack } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

export const Payment = () => {
  const { register, getValues } = useFormContext();
  return (
    <Box width={'full'} mb={4}>
      <Text mb={2}>Оплата</Text>
      <RadioGroup defaultValue={getValues('payment')}>
        <VStack alignItems={'start'}>
          <Radio value='cash' mb={1} {...register('payment')}>
            Готівкою
          </Radio>
          <Radio value='afterCash' {...register('payment')}>
            Післяплата
          </Radio>
        </VStack>
      </RadioGroup>
    </Box>
  );
};
