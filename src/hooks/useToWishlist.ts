import {
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
} from '../service.ts';
import { SelectedCategory } from '../types.ts';

export const useToWishlist = ({
  isWishlist,
  productId,
  productsArgs,
}: {
  isWishlist: boolean;
  productId?: number | string;
  productsArgs?: SelectedCategory;
}) => {
  const [addToWishList] = useAddToWishlistMutation();
  const [removeFromWishList] = useRemoveFromWishlistMutation();
  const toggleWithList = () => {
    if (!productId) {
      return;
    }

    if (isWishlist && productId) {
      removeFromWishList({ productId, productsArgs });
    } else {
      addToWishList({ productId, productsArgs });
    }
  };

  return {
    toggleWithList,
    isWishlist,
  };
};
