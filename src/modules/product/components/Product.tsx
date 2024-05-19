import { ProductProps, Variant } from '../../../types.ts';

import {
  Box,
  Image,
  Text,
  Button,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Stack,
  Flex,
  RadioGroup,
  Radio,
  Icon,
  Heading,
} from '@chakra-ui/react';
import { FaRegHeart, FaChevronDown, FaHeart } from 'react-icons/fa6';

import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { API_URL } from '../../../core/constants.ts';
import { Counter } from '../../../components/counter/Counter.tsx';
import { useAddToCartMutation } from '../../../service.ts';
import { useToWishlist } from '../../../hooks/useToWishlist.ts';

type ProductCartProps = {
  product: ProductProps;
};

export const Product = ({ product }: ProductCartProps) => {
  const [addToCard] = useAddToCartMutation();
  const { isWishlist, toggleWithList } = useToWishlist({
    isWishlist: Boolean(product.is_liked),
    productId: product.id.toString(),
  });
  const methods = useForm({
    defaultValues: {
      variantId: product?.variants[0]?.id.toString(),
      quantity: 1,
    },
  });

  const selectedVariant = methods.watch(['variantId']);

  const onSubmit: SubmitHandler<any> = ({ variantId, quantity }) => {
    addToCard({
      variantId,
      quantity,
    });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Box borderRadius='lg' overflow='hidden'>
          <Image
            src={`${API_URL}${getImage(product.variants, selectedVariant[0])}`}
            alt={product.name}
          />

          <Box p='2'>
            <Flex alignItems='baseline'>
              <Heading as={'h1'} fontSize={'x-large'} mt={2} lineHeight='tight'>
                {product.name}
              </Heading>
            </Flex>

            <Box fontSize={'lg'} fontWeight='medium' mb={2}>
              <Text fontWeight='bold' color={'green'}>
                {product.price} грн
              </Text>
              <Text fontSize={'sm'} color={'grey'}>
                ({product.category.name})
              </Text>
            </Box>

            <Text mb={2} fontWeight={'bold'}>
              Тип:
            </Text>
            <RadioGroup
              colorScheme='green'
              defaultValue={
                methods.getValues('variantId') as string | undefined
              }
              mb={6}
            >
              <Stack direction='row' flexWrap={'wrap'}>
                {product.variants.map((item, index) => (
                  <Radio
                    m={1}
                    key={index}
                    value={`${item.id}`}
                    {...methods.register('variantId')}
                  >
                    {item.name}
                  </Radio>
                ))}
              </Stack>
            </RadioGroup>

            <Box mb={4}>
              <Counter
                initialValue={1}
                onChange={(value) => {
                  methods.setValue('quantity', value);
                }}
              />
            </Box>

            <Accordion allowToggle mb={6}>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Flex
                      alignItems={'center'}
                      justifyContent={'space-between'}
                      width={'full'}
                    >
                      <Text>Детальніше</Text>
                      <Icon as={FaChevronDown} />
                    </Flex>
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>{product.description}</AccordionPanel>
              </AccordionItem>
            </Accordion>

            <Button
              leftIcon={product.is_liked ? <FaHeart /> : <FaRegHeart />}
              colorScheme='teal'
              mt='3'
              position={'absolute'}
              right={10}
              top={10}
              onClick={toggleWithList}
              fontSize={'sm'}
            >
              {isWishlist
                ? 'Видалити зі списку бажань'
                : 'Додати в список бажань'}
            </Button>

            <Button colorScheme='teal' width={'full'} type={'submit'}>
              Купити
            </Button>
          </Box>
        </Box>
      </form>
    </FormProvider>
  );
};

function getImage(variants: Variant[], selectedVariant: string) {
  const selected = variants.find(
    (item) => item.id.toString() === selectedVariant
  );
  return selected?.image || variants[0].image;
}
