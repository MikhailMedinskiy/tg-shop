import { Box, Heading, List, ListItem, Text } from '@chakra-ui/react';

export const PaymentInfo = () => {
  return (
    <Box>
      <Heading as={'h1'} mb={4}>
        Оплата
      </Heading>

      <Text>Існує декілька способів оплати замовлення:</Text>
      <List>
        <ListItem>Повна оплата на карту.</ListItem>
        <ListItem>
          Післяплата Нової Пошти (накладний платіж) - по предоплаті на карту.
        </ListItem>
        <ListItem>Сейф-сервіс Нової Пошти.</ListItem>
        <ListItem>Оплата криптовалютою.</ListItem>
      </List>
    </Box>
  );
};
