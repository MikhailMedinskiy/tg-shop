import { Button, Heading, VStack } from '@chakra-ui/react';
import { OrderSummary } from '../components/orderSummary/OrderSummary.tsx';
import { ProductH } from '../components/productWithCounter/ProductH.tsx';
import { DeliverySelect } from '../modules/DelivertySelect';
import { SubmitHandler, useForm, FormProvider } from 'react-hook-form';
import { PromoCode } from '../modules/PromoCode';
import { Payment } from '../modules/Payment/Payment.tsx';
import { CustomerInfo } from '../modules/CustomerInfo';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

export type CheckoutFormProps = {
  products: string;
  promoCode: string;
  name: string;
  phone: string;
  city: { label: string; value: string } | null;
  warehouse: { label: string; value: string } | null;
  payment: 'afterCash' | 'cash';
};

const schema = yup.object({
  products: yup.string().required("Це поле обов'язкове"),
  promoCode: yup.string(),
  name: yup.string().required("Це поле обов'язкове"),
  phone: yup.string().required("Це поле обов'язкове"),
  city: yup.object().required("Це поле обов'язкове").nullable(),
  warehouse: yup.object().required("Це поле обов'язкове").nullable(),
  payment: yup.string().required("Це поле обов'язкове"),
});

export const Checkout = () => {
  const methods = useForm({
    defaultValues: {
      products: '',
      promoCode: '',
      name: '',
      phone: '',
      payment: 'afterCash',
      city: undefined,
      warehouse: undefined,
    },
    resolver: yupResolver(schema),
  });
  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<any> = (data) => console.log(data);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack width={'full'} alignItems={'start'}>
          <Heading as={'h1'} mb={4}>
            Замовлення
          </Heading>
          <ProductH hideCounter />
          <PromoCode />
          <OrderSummary />
          <Payment />
          <DeliverySelect />
          <CustomerInfo />

          <Button colorScheme='teal' width={'full'} type={'submit'}>
            Замовити
          </Button>
        </VStack>
      </form>
    </FormProvider>
  );
};
