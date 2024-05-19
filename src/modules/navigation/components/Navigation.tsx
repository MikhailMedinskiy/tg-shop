import { Badge, Box, Card, HStack, Icon } from '@chakra-ui/react';
import {
  FaBarsStaggered,
  FaBoxesStacked,
  FaCartShopping,
  FaHouse,
} from 'react-icons/fa6';

import { Link, useLocation } from 'react-router-dom';
import { PATHS } from '../../../utils/constants.ts';
import { useAppSelector } from '../../../core/hooks.ts';
import { getCartCount } from '../slice.ts';
import { NavigationProps } from '../types.ts';

export const Navigation = ({ onToggle, isMenuOpen }: NavigationProps) => {
  const count = useAppSelector(getCartCount);
  const { pathname } = useLocation();

  return (
    <Card
      p={4}
      position={'fixed'}
      left={0}
      bottom={0}
      width={'100%'}
      boxShadow='0 -4px 6px rgba(0, 0, 0, 0.1)'
      zIndex={10}
    >
      <HStack alignItems={'center'} justifyContent='space-around'>
        <Box onClick={onToggle}>
          <Icon
            as={FaBarsStaggered}
            boxSize={8}
            transition={'color 0.3s'}
            cursor={'pointer'}
            color={isMenuOpen ? 'cyan.800' : 'grey'}
            _hover={{
              color: 'cyan.800',
            }}
          />
        </Box>
        <Link to={PATHS.catalog}>
          <Icon
            as={FaBoxesStacked}
            boxSize={8}
            color={pathname.includes(PATHS.catalog) ? 'cyan.800' : 'grey'}
            transition={'color 0.3s'}
            _hover={{
              color: 'cyan.800',
            }}
          />
        </Link>
        <Link to={PATHS.home}>
          <Icon
            as={FaHouse}
            boxSize={8}
            color={pathname === PATHS.home ? 'cyan.800' : 'grey'}
            transition={'color 0.3s'}
            _hover={{
              color: 'cyan.800',
            }}
          />
        </Link>
        <Link to={PATHS.cart}>
          <Box position={'relative'}>
            <Badge
              position={'absolute'}
              right={0}
              top={0}
              backgroundColor={'red'}
              color={'white'}
              transform={'translate(50%, -50%)'}
            >
              {count}
            </Badge>
            <Icon
              as={FaCartShopping}
              boxSize={8}
              color={pathname.includes(PATHS.cart) ? 'cyan.800' : 'grey'}
              transition={'color 0.3s'}
              _hover={{
                color: 'cyan.800',
              }}
            />
          </Box>
        </Link>
      </HStack>
    </Card>
  );
};
