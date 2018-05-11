import {
  INativeCommunicator,
  WrappedSendingMessage,
} from '@liquid-state/iwa-core/dist/communicator/communicator';
import config from './config';
import navigation from './navigation';

const injectDefaultMiddleware = (communicator: INativeCommunicator) => {
  communicator.addOnSendMiddleware(navigation);
  return communicator;
};

export default {
  injectDefaultMiddleware,
  config,
  navigation,
};
