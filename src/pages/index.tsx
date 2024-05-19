import { Routes, Route, Outlet, useLocation } from 'react-router-dom';
// import { useGetProductsQuery } from '../service.ts';
import { Home } from './Home.tsx';
import { Box, useDisclosure } from '@chakra-ui/react';

import { Navigation } from '../modules/navigation';
import { Sidebar } from '../modules/sidebar/components/Sidebar.tsx';
import { Catalog } from './Catalog.tsx';
import { PATHS } from '../utils/constants.ts';
import { useEffect } from 'react';
import { Product } from './Product.tsx';
import { Wishlist } from './Wishlist.tsx';
import { Cart } from './Cart.tsx';
import { Checkout } from './Checkout.tsx';
import { useTelegram } from '../hooks/useTelegram.ts';
import { OrderStatus } from './OrderStatus.tsx';
import { ProductList } from './ProductList.tsx';
import { Contacts } from './Contacts.tsx';
import { PaymentInfo } from './PaymentInfo.tsx';
import { NotFound } from './404.tsx';
import { Auth } from '../modules/auth';
import { AppBootstrap } from '../modules/appBootsrap';

export default function App() {
  return (
    <Routes>
      <Route path={PATHS.home} element={<Layout />}>
        <Route index element={<Home />} />
        <Route path={PATHS.catalog} element={<Catalog />} />
        <Route path={PATHS.catalogItems} element={<ProductList />} />
        <Route path={`${PATHS.product}`} element={<Product />} />
        <Route path={PATHS.wishlist} element={<Wishlist />} />
        <Route path={PATHS.cart} element={<Cart />} />
        <Route path={PATHS.checkout} element={<Checkout />} />
        <Route path={PATHS.orderStatus} element={<OrderStatus />} />
        <Route path={PATHS.contact} element={<Contacts />} />
        <Route path={PATHS.payment} element={<PaymentInfo />} />
        <Route path={PATHS.delivery} element={<PaymentInfo />} />
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  );
}

function Layout() {
  const { isOpen, onClose, onToggle } = useDisclosure();
  let location = useLocation();
  const { tg } = useTelegram();

  useEffect(() => {
    window.scrollTo(0, 0);
    tg.expand();
    onClose();
  }, [location]);

  return (
    <Auth>
      <Box p={4} pb={'78px'} position={'relative'} height={'100vh'}>
        <AppBootstrap>
          <Box height={'100%'} overflow={'scroll'}>
            <Outlet />
          </Box>
          <Box
            position={'absolute'}
            bottom={0}
            width={'full'}
            left={0}
            right={0}
          >
            <Navigation onToggle={onToggle} isMenuOpen={isOpen} />
          </Box>
          <Sidebar isOpen={isOpen} onClose={onClose} />
        </AppBootstrap>
      </Box>
    </Auth>
  );
}
