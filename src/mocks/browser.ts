import { setupWorker } from 'msw/browser';

import { handlers } from './handlers';

// Used for client-side mocking
export const worker = setupWorker(...handlers);
