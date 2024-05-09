import { Box, FormControl, FormErrorMessage, Text } from '@chakra-ui/react';

import { CitiesSelect } from './CitiesSelect.tsx';
import { WareHouseSelect } from './WareHouseSelect.tsx';
import { useFormContext } from 'react-hook-form';
import { CheckoutFormProps } from '../../pages/Checkout.tsx';

export const DeliverySelect = () => {
  const {
    formState: { errors },
  } = useFormContext<CheckoutFormProps>();
  return (
    <Box width={'full'} mb={4}>
      <Text mb={2}>Доставка: Нова пошта</Text>
      <FormControl isInvalid={!!errors?.city} mb={4}>
        <CitiesSelect />
        {errors.city && (
          <FormErrorMessage>{errors?.city?.message}</FormErrorMessage>
        )}
      </FormControl>

      <FormControl isInvalid={!!errors.warehouse}>
        <WareHouseSelect />
        {errors.warehouse && (
          <FormErrorMessage>{errors.warehouse?.message}</FormErrorMessage>
        )}
      </FormControl>
    </Box>
  );
};
