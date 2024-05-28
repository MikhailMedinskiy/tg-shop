import { Box, Radio, RadioGroup, Text, VStack } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

export const Payment = () => {
  const { register, getValues } = useFormContext();

  return (
    <Box width={'full'} mb={4}>
      <Text mb={2}>Оплата</Text>
      <RadioGroup defaultValue={getValues('payMethod')}>
        <VStack alignItems={'start'}>
          <Radio value='cash' mb={1} {...register('payMethod')}>
            Hакладений платіж
          </Radio>
          <Radio value='card' {...register('payMethod')}>
            На картку
          </Radio>
        </VStack>
      </RadioGroup>
    </Box>
  );
};
