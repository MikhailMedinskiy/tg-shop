import { ProductH } from '../../productWithCounter/ProductH.tsx';
import {
  useDecreaseCartItemMutation,
  useDeleteFromCartMutation,
  useIncreaseCartItemMutation,
} from '../../../service.ts';
import { CartProductsProps } from '../types.ts';

export const CartProducts = ({ variants }: CartProductsProps) => {
  const [decreaseItem] = useDecreaseCartItemMutation();
  const [intrease] = useIncreaseCartItemMutation();
  const [deleteItem] = useDeleteFromCartMutation();

  return variants.map((item) => (
    <ProductH
      key={item.id}
      price={item.product.price}
      variant={item.variant.name}
      productName={item.product.name}
      image={item.variant.image}
      counter={item.quantity}
      onIncrement={() => decreaseItem({ productId: item.id.toString() })}
      onDecrement={() => intrease({ productId: item.id.toString() })}
      onDeleteClick={() => deleteItem({ variantId: item.id.toString() })}
    />
  ));
};
