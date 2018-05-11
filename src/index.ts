import createNoopCommunicator, { NoopCommunicator } from './noopCommunicator';
import middleware from './middleware';

// Typescript didn't like exporting injectDefaultMiddleware without this being defined here.
// No idea why, it doesn't really matter typescript strips type only imports anyway.
import {
  INativeCommunicator,
  WrappedSendingMessage,
} from '@liquid-state/iwa-core/dist/communicator/communicator';

export default {
  createNoopCommunicator,
  injectDefaultMiddleware: middleware.injectDefaultMiddleware,
};

export { middleware, NoopCommunicator };
