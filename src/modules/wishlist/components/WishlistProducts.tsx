import { ProductH } from '../../productWithCounter/ProductH.tsx';
import { Box, Button } from '@chakra-ui/react';
import { generatePath, NavLink } from 'react-router-dom';
import { PATHS } from '../../../utils/constants.ts';
import { WishlistProductsProps } from '../types.ts';
import { useRemoveFromWishlistMutation } from '../../../service.ts';

export const WishlistProducts = ({ products }: WishlistProductsProps) => {
  const [removeFromWishlist] = useRemoveFromWishlistMutation();

  return products.map((product) => (
    <ProductH
      hideVariant
      hideCounter
      key={product.id}
      image={product.variants[0].image}
      productName={product.name}
      price={product.price}
      onDeleteClick={() => {
        removeFromWishlist({ productId: product.id });
      }}
    >
      <Box px={4} pb={4} ml={'auto'}>
        <NavLink
          style={{ width: '100%', display: 'block' }}
          to={generatePath(PATHS.product, { slug: `${product.id}` })}
        >
          <Button colorScheme='teal' width={'full'}>
            Переглянути
          </Button>
        </NavLink>
      </Box>
    </ProductH>
  ));
};
