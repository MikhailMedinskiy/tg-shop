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
  useBoolean,
  Heading,
} from '@chakra-ui/react';
import { FaRegHeart, FaChevronDown, FaHeart } from 'react-icons/fa6';

type ProductProps = {
  name: string;
  category: string;
  price: string;
  image: string;
  description: string;
  colors: string[];
  oldPrice: string;
};

const demoProduct: ProductProps = {
  category: 'sigarts',
  price: '100 USD',
  colors: ['red', 'gream', 'blue'],
  description:
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor enim eum maiores minima modi provident vel veniam! Pariatur reiciendis rerum temporibus. Consectetur consequuntur dolore enim, illo porro quisquam? Eveniet, optio.',
  image: 'https://via.placeholder.com/900x900',
  name: 'Name of product',
  oldPrice: '200 USD',
};

export const Product = () => {
  const { name, category, price, image, description, colors, oldPrice } =
    demoProduct;
  const [isWishlist, setIsWishList] = useBoolean();

  return (
    <Box borderRadius='lg' overflow='hidden'>
      <Image src={image} alt={name} />

      <Box p='2'>
        <Flex alignItems='baseline' mb={4}>
          <Heading as={'h1'} fontSize={'x-large'} mt={2} lineHeight='tight'>
            {name}
          </Heading>
        </Flex>

        {/*old price*/}

        <Box fontSize={'lg'} fontWeight='medium' mb={6}>
          <Text
            textDecoration='line-through'
            mr={2}
            color={'grey'}
            fontSize={'md'}
          >
            {oldPrice}
          </Text>
          <Text fontWeight='bold' color={'red'}>
            {price}
          </Text>

          <Text fontSize={'sm'} color={'grey'}>
            ({category})
          </Text>
        </Box>

        <Text mb={2}>Смак</Text>
        <RadioGroup colorScheme='green' defaultValue={'red'} mb={6}>
          <Stack direction='row'>
            {colors.map((color, index) => (
              <Radio key={index} value={color}>
                {color}
              </Radio>
            ))}
          </Stack>
        </RadioGroup>

        <Accordion allowToggle mb={6}>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Flex
                  alignItems={'center'}
                  justifyContent={'space-between'}
                  width={'full'}
                >
                  <Text>Description</Text>
                  <Icon as={FaChevronDown} />
                </Flex>
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>{description}</AccordionPanel>
          </AccordionItem>
        </Accordion>

        <Button
          leftIcon={isWishlist ? <FaHeart /> : <FaRegHeart />}
          colorScheme='teal'
          mt='3'
          position={'absolute'}
          right={10}
          top={10}
          onClick={setIsWishList.toggle}
        >
          {isWishlist ? 'Видалити зі списку бажань' : 'Додати в список бажань'}
        </Button>

        <Button colorScheme='teal' width={'full'}>
          Купити
        </Button>
      </Box>
    </Box>
  );
};
