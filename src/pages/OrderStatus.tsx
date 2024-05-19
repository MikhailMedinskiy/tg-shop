import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Heading,
  Icon,
  Text,
  VStack,
} from '@chakra-ui/react';
import { FaChevronDown } from 'react-icons/fa6';
// import { OrderSummary } from '../components/orderSummary/OrderSummary.tsx';
import { ProductH } from '../modules/productWithCounter/ProductH.tsx';
import { useGetOrdersQuery } from '../service.ts';

export const OrderStatus = () => {
  const { data, isLoading } = useGetOrdersQuery();

  if (isLoading) {
    return <Box>Loading...</Box>;
  }

  if (!data) {
    return <Box>Ще немає замовлень</Box>;
  }

  console.log(data, 'data');
  return (
    <Box>
      <Heading as={'h1'} mb={4}>
        Ваші замовлення
      </Heading>
      <VStack width={'full'} alignItems={'stretch'}>
        {data.orders.map((order) => (
          <Accordion allowToggle mb={2}>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Flex
                    alignItems={'center'}
                    justifyContent={'space-between'}
                    width={'full'}
                  >
                    <Text>Замовлення #{order.id} </Text>
                    <Icon as={FaChevronDown} />
                  </Flex>
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <VStack>
                  <Text>Статус замовлення: {order.status}</Text>
                  <Text>Статус оплати: {order.status}</Text>
                  {order.line_items.map((item) => (
                    <ProductH
                      hideCounter
                      hideDelete
                      productName={item.variant.name}
                      price={item.order_price}
                      variant={item.variant.name}
                      image={item.variant.image}
                    />
                  ))}

                  {/*<OrderSummary variants={order.line_items} />*/}
                </VStack>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        ))}
      </VStack>
    </Box>
  );
};
