import { setupWorker } from 'msw/browser';
import { authHandlers } from './endpoints/login';
import { categoriesHandlers } from './endpoints/categories';
import { productsHandlers } from './endpoints/products';

export const handlers = [
  ...authHandlers,
  ...categoriesHandlers,
  ...productsHandlers,
];

export const worker = setupWorker(...handlers);
