import {
  Button,
  FormControl,
  FormErrorMessage,
  HStack,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useLazyGetDiscountsQuery } from '../../../service.ts';
import { useForm } from 'react-hook-form';
import { getPromoCode, resetPromo } from '../slice.ts';
import { useAppDispatch, useAppSelector } from '../../../core/hooks.ts';

export const PromoCode = () => {
  const dispatch = useAppDispatch();
  const [getDiscount, { isLoading }] = useLazyGetDiscountsQuery();
  const promoCode = useAppSelector(getPromoCode);
  const {
    register,
    formState: { errors },
    setError,
    handleSubmit,
  } = useForm({
    defaultValues: {
      promoCode: promoCode || '',
    },
  });

  const handleGetPromo = async (data: { promoCode: string }) => {
    try {
      await getDiscount(data.promoCode).unwrap();
    } catch (e) {
      dispatch(resetPromo());
      setError('promoCode', { type: 'custom', message: 'Не вірний купон' });
    }
  };

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
        Промокод
      </Text>
      <HStack width={'full'} alignItems={'start'} justifyContent={'end'}>
        <FormControl isInvalid={!!errors.promoCode} mb={4} width={'auto'}>
          <Input placeholder='Введіть промокод' {...register('promoCode')} />
          {errors.promoCode && (
            <FormErrorMessage>{errors?.promoCode?.message}</FormErrorMessage>
          )}
        </FormControl>

        <Button
          px='4'
          colorScheme='teal'
          isLoading={isLoading}
          type={'submit'}
          onClick={handleSubmit(handleGetPromo)}
        >
          {promoCode ? 'Оновити' : 'Застосувати'}
        </Button>
      </HStack>
    </VStack>
  );
};
