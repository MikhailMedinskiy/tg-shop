import { PATHS } from '../../utils/constants.ts';
import {
  AiOutlineAppstore,
  AiOutlineCar,
  AiOutlineContacts,
  AiOutlineCreditCard,
  AiOutlineFileDone,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from 'react-icons/ai';

export const menuItems = [
  {
    title: 'Каталог',
    href: PATHS.catalog,
    divider: true,
    icon: AiOutlineAppstore,
  },
  {
    title: 'Вподобайки',
    href: PATHS.wishlist,
    divider: false,
    icon: AiOutlineHeart,
  },
  {
    title: 'Кошик',
    href: PATHS.cart,
    divider: false,
    icon: AiOutlineShoppingCart,
  },
  {
    title: 'Статус Замовлення',
    href: PATHS.orderStatus,
    divider: true,
    icon: AiOutlineFileDone,
  },
  {
    title: 'Контакти',
    href: PATHS.contact,
    divider: false,
    icon: AiOutlineContacts,
  },
  {
    title: 'Оплата',
    href: PATHS.payment,
    divider: false,
    icon: AiOutlineCreditCard,
  },
  {
    title: 'Доставка',
    href: PATHS.delivery,
    divider: false,
    icon: AiOutlineCar,
  },
];
