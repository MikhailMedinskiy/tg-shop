import {
  Box,
  FormControl,
  FormErrorMessage,
  Input,
  Text,
} from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import InputMask from 'react-input-mask';
import { CheckoutFormProps } from '../types.ts';

export const CustomerInfo = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<CheckoutFormProps>();

  return (
    <Box width={'full'} mb={4}>
      <Text mb={2}>Замовник</Text>

      <FormControl isInvalid={!!errors.fullName} mb={4}>
        <Input placeholder='ПІБ' mb={1} {...register('fullName')} />
        {errors.fullName && (
          <FormErrorMessage>{errors?.fullName?.message}</FormErrorMessage>
        )}
      </FormControl>
      <FormControl isInvalid={!!errors.phone} mb={4}>
        <InputMask mask='+38(999)-999-99-99' {...register('phone')}>
          {/*@ts-ignore*/}
          {(inputProps: any) => <Input {...inputProps} placeholder='Телефон' />}
        </InputMask>
        {errors.phone && (
          <FormErrorMessage>{errors?.phone?.message}</FormErrorMessage>
        )}
      </FormControl>
    </Box>
  );
};
