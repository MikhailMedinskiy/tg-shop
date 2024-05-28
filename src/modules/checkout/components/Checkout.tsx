import { Button, Heading, Textarea, VStack } from '@chakra-ui/react';
import { ProductH } from '../../productWithCounter/ProductH.tsx';
import { TotalInfo } from '../../totalInfo';
import { Payment } from './Payment.tsx';
import { DeliverySelect } from './DeliverySelect.tsx';
import { CustomerInfo } from './CustomerInfo.tsx';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import {
  useCreateOrderMutation,
  useDeleteFromCartMutation,
} from '../../../service.ts';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { CheckoutProps } from '../types.ts';
import { PromoCode } from '../../cart';
import { getPromoCode, resetPromo } from '../../cart/slice.ts';
import { useAppDispatch, useAppSelector } from '../../../core/hooks.ts';

const schema = yup.object({
  payMethod: yup.string().required("Це поле обов'язкове"),
  fullName: yup.string().required("Це поле обов'язкове"),
  phone: yup.string().required("Це поле обов'язкове"),
  city: yup.object().required("Це поле обов'язкове"),
  np: yup.object().required("Це поле обов'язкове"),
  comment: yup.string(),
});

export const Checkout = ({ variants }: CheckoutProps) => {
  const dispatch = useAppDispatch();
  const [createOrder] = useCreateOrderMutation();
  const [deleteItem] = useDeleteFromCartMutation();
  const navigate = useNavigate();
  const promoCode = useAppSelector(getPromoCode);

  const methods = useForm({
    defaultValues: {
      payMethod: 'cash',
      fullName: '',
      phone: '',
      city: undefined,
      np: undefined,
      comment: '',
    },
    resolver: yupResolver(schema),
  });
  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<any> = (data) =>
    createOrder({
      ...data,
      promo_code: promoCode,
    })
      .unwrap()
      .then(() => {
        dispatch(resetPromo());
        navigate('/');
      });

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack width={'full'} alignItems={'start'}>
          <Heading as={'h1'} mb={4}>
            Замовлення
          </Heading>
          {variants.map((item) => (
            <ProductH
              hideCounter
              price={item.product.price * item.quantity}
              variant={item.variant.name}
              productName={`${item.product.name} x ${item.quantity}`}
              image={item.variant.image}
              onDeleteClick={() =>
                deleteItem({ variantId: item.id.toString() })
              }
            />
          ))}
          <PromoCode />
          <TotalInfo variants={variants} />
          <Payment />
          <DeliverySelect />
          <CustomerInfo />
          <Textarea
            placeholder='Коментар'
            width={'full'}
            {...methods.register('comment')}
          />

          <Button colorScheme='teal' width={'full'} type={'submit'}>
            Замовити
          </Button>
        </VStack>
      </form>
    </FormProvider>
  );
};
