import {
  Box,
  Button,
  Grid,
  GridItem,
  HStack,
  Icon,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';
import { FaTrash } from 'react-icons/fa6';
import { Counter } from '../../components/counter/Counter.tsx';
import { API_URL } from '../../core/constants.ts';

type ProductHProps = {
  hideDelete?: boolean;
  children?: React.ReactNode;
  hideVariant?: boolean;
  counter?: number;
  image?: string;
  productName?: string;
  price?: number;
  variant?: string;
  hideCounter?: boolean;
  onCounterChange?: (number: number) => void;
  onIncrement?: (number: number) => void;
  onDecrement?: (number: number) => void;
  onDeleteClick?: () => void;
};
export const ProductH = ({
  hideVariant,
  hideCounter,
  hideDelete,
  children,
  image,
  productName,
  price,
  variant,
  onDeleteClick,
  counter,
  onCounterChange,
  onIncrement,
  onDecrement,
}: ProductHProps) => {
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
          src={`${API_URL}/${image}`}
          border={'solid'}
          borderWidth='1px'
          borderColor={'teal'}
        />
      </GridItem>
      <VStack alignItems={'stretch'}>
        <Box position={'relative'} flexGrow={1} p={4} pr={16}>
          <Text fontWeight={'bold'} fontSize={'xl'}>
            {productName}
          </Text>
          <Text mb={2} fontSize={'md'}>
            {price} UAH
          </Text>
          {!hideVariant && <Box mb={2}>Тип: {variant}</Box>}
          {!hideDelete && (
            <Button
              position={'absolute'}
              colorScheme={'red'}
              right={2}
              top={4}
              onClick={onDeleteClick}
            >
              <Icon as={FaTrash} boxSize={4} />
            </Button>
          )}
          {!hideCounter && (
            <HStack justifyContent={'end'} mr={-14}>
              <Counter
                initialValue={counter}
                onChange={onCounterChange}
                onDecrement={onDecrement}
                onIncrement={onIncrement}
              />
            </HStack>
          )}
        </Box>
        {children}
      </VStack>
    </Grid>
  );
};
