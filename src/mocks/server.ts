import { setupServer } from 'msw/node';
import { regularHandlers } from './handlers';

export const server = setupServer(...regularHandlers);
