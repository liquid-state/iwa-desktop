import {
  INativeCommunicator,
  WrappedSendingMessage,
} from '@liquid-state/iwa-core/dist/communicator/communicator';
import config from './config';
import navigation from './navigation';
import keyValue from './keyValue';

const injectDefaultMiddleware = (communicator: INativeCommunicator) => {
  if (!communicator.addOnSendMiddleware) {
    return;
  }
  communicator.addOnSendMiddleware(navigation);
  communicator.addOnSendMiddleware(keyValue);
  return communicator;
};

export default {
  injectDefaultMiddleware,
  config,
  navigation,
  keyValue
};
