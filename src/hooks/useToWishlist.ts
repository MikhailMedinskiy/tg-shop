import {
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
} from '../service.ts';

export const useToWishlist = ({
  isWishlist,
  productId,
}: {
  isWishlist: boolean;
  productId: number | string;
}) => {
  const [addToWishList] = useAddToWishlistMutation();
  const [removeFromWishList] = useRemoveFromWishlistMutation();
  const toggleWithList = () => {
    if (isWishlist) {
      removeFromWishList({ productId });
    } else {
      addToWishList({ productId });
    }
  };

  return {
    toggleWithList,
  };
};
