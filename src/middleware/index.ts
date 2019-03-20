import {
  INativeCommunicator,
  WrappedSendingMessage,
} from '@liquid-state/iwa-core/dist/communicator/communicator';
import config from './config';
import navigation from './navigation';
import keyValue from './keyValue';
import setReady from './setReady';
import app from './app';

const injectDefaultMiddleware = (communicator: INativeCommunicator) => {
  if (!communicator.addOnSendMiddleware) {
    return;
  }
  communicator.addOnSendMiddleware(navigation);
  communicator.addOnSendMiddleware(keyValue);
  communicator.addOnSendMiddleware(setReady);
  communicator.addOnSendMiddleware(app);

  return communicator;
};

export default {
  injectDefaultMiddleware,
  config,
  navigation,
  keyValue,
  setReady,
  app,
};
