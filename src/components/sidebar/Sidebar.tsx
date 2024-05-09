import {
  Box,
  Slide,
  Button,
  VStack,
  Icon,
  Divider,
  HStack,
  Text,
} from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import { IoMdClose } from 'react-icons/io';
import { PATHS } from '../../utils/constants.ts';
import {
  AiOutlineHome,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineContacts,
  AiOutlineCreditCard,
  AiOutlineCar,
  AiOutlineAppstore,
  AiOutlineFileDone,
} from 'react-icons/ai';

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

const menuItems = [
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

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const { pathname } = useLocation();
  return (
    <>
      <Slide direction='left' in={isOpen}>
        <Box
          bg={'white'}
          boxShadow={'dark-lg'}
          w='300px'
          h='100vh'
          position='absolute'
          top='0'
          left='0'
          p='4'
          zIndex={10}
        >
          <Box>
            <HStack justifyContent={'end'} mb={4}>
              <Button onClick={onClose}>
                <Icon as={IoMdClose} boxSize={4} />
              </Button>
            </HStack>
            <VStack alignItems={'start'} gap={4}>
              <MenuItem
                href={PATHS.home}
                isActive={pathname === PATHS.home}
                title={'Головна'}
                icon={AiOutlineHome}
              />

              {menuItems.map((item) => (
                <MenuItem
                  key={item.href}
                  href={item.href}
                  isActive={pathname.includes(item.href)}
                  title={item.title}
                  divider={item.divider}
                  icon={item.icon}
                />
              ))}
            </VStack>
          </Box>
        </Box>
      </Slide>
    </>
  );
};

type MenuItemProps = {
  href: string;
  isActive: boolean;
  title: string;
  divider?: boolean;
  icon: any;
};
const MenuItem = ({
  href = '/',
  isActive,
  title,
  divider,
  icon,
}: MenuItemProps) => {
  return (
    <>
      <Link to={href}>
        <HStack
          color={isActive ? 'cyan.800' : 'black'}
          _hover={{
            color: 'cyan.800',
          }}
        >
          <Icon as={icon} boxSize={5} />
          <Text fontSize={'lg'}>{title}</Text>
        </HStack>
      </Link>
      {divider && <Divider />}
    </>
  );
};
