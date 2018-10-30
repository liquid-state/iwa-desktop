import {
  INativeCommunicator,
  WrappedSendingMessage,
} from '@liquid-state/iwa-core/dist/communicator/communicator';
import config from './config';
import navigation from './navigation';
import keyValue from './keyValue';
import setReady from './setReady';

const injectDefaultMiddleware = (communicator: INativeCommunicator) => {
  if (!communicator.addOnSendMiddleware) {
    return;
  }
  communicator.addOnSendMiddleware(navigation);
  communicator.addOnSendMiddleware(keyValue);
  communicator.addOnSendMiddleware(setReady);
  return communicator;
};

export default {
  injectDefaultMiddleware,
  config,
  navigation,
  keyValue,
  setReady,
};
