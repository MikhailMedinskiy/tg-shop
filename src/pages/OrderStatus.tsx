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
import { OrderSummary } from '../components/orderSummary/OrderSummary.tsx';
import { ProductH } from '../components/productWithCounter/ProductH.tsx';

export const OrderStatus = () => {
  return (
    <Box>
      <Heading as={'h1'} mb={4}>
        Ваші замовлення
      </Heading>
      <VStack width={'full'} alignItems={'stretch'}>
        <Accordion allowToggle mb={2}>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Flex
                  alignItems={'center'}
                  justifyContent={'space-between'}
                  width={'full'}
                >
                  <Text>Замовлення #1231 </Text>
                  <Icon as={FaChevronDown} />
                </Flex>
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <VStack>
                <Text>Статус замовлення: Нове замовлення</Text>
                <Text>Статус оплати: Очікування оплати</Text>
                <ProductH hideCounter hideDelete />
                <ProductH hideCounter hideDelete />
                <ProductH hideCounter hideDelete />
                <OrderSummary />
              </VStack>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>

        <Accordion allowToggle mb={2}>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Flex
                  alignItems={'center'}
                  justifyContent={'space-between'}
                  width={'full'}
                >
                  <Text>Замовлення #1232</Text>
                  <Icon as={FaChevronDown} />
                </Flex>
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <VStack>
                <Text>Статус замовлення: Нове замовлення</Text>
                <Text>Статус оплати: Очікування оплати</Text>
                <ProductH hideCounter hideDelete />
                <ProductH hideCounter hideDelete />
                <ProductH hideCounter hideDelete />
                <OrderSummary />
              </VStack>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>

        <Accordion allowToggle mb={2}>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Flex
                  alignItems={'center'}
                  justifyContent={'space-between'}
                  width={'full'}
                >
                  <Text>Замовлення #1233</Text>
                  <Icon as={FaChevronDown} />
                </Flex>
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <VStack>
                <Text>Статус замовлення: Нове замовлення</Text>
                <Text>Статус оплати: Очікування оплати</Text>
                <ProductH hideCounter hideDelete />
                <ProductH hideCounter hideDelete />
                <ProductH hideCounter hideDelete />
                <OrderSummary />
              </VStack>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </VStack>
    </Box>
  );
};
