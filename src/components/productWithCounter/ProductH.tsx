import {
  Box,
  Button,
  Grid,
  GridItem,
  HStack,
  Icon,
  Image,
} from '@chakra-ui/react';
import { FaTrash } from 'react-icons/fa6';
import { Counter } from '../counter/Counter.tsx';

export const ProductH = ({
  hideCounter,
  hideDelete,
  children,
}: {
  hideCounter?: boolean;
  hideDelete?: boolean;
  children?: React.ReactNode;
}) => {
  return (
    <Grid
      width={'full'}
      gridTemplateColumns={'1fr 3fr'}
      borderWidth='1px'
      borderRadius='lg'
      overflow={'hidden'}
    >
      <GridItem pl={2} pt={6} pb={6}>
        <Image
          src='https://via.placeholder.com/900x900'
          border={'solid'}
          borderWidth='1px'
          borderColor={'teal'}
        />
      </GridItem>
      <Box>
        <Box position={'relative'} flexGrow={1} p={4} pr={16}>
          <Box>product name</Box>
          <Box mb={2}>100 USD</Box>
          <Box>Характеристика: Red</Box>

          {!hideDelete && (
            <Button position={'absolute'} colorScheme={'red'} right={2} top={4}>
              <Icon as={FaTrash} boxSize={4} />
            </Button>
          )}

          {!hideCounter && (
            <HStack justifyContent={'end'} mr={-14}>
              <Counter />
            </HStack>
          )}
        </Box>
        {children}
      </Box>
    </Grid>
  );
};
