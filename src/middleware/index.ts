import {
  INativeCommunicator,
  WrappedSendingMessage,
} from '@liquid-state/iwa-core/dist/communicator/communicator';
import config from './config';
import navigation from './navigation';
import keyValue from './keyValue';
import setReady from './setReady';
import iwa from './iwa';
import app from './app';

const injectDefaultMiddleware = (communicator: INativeCommunicator) => {
  if (!communicator.addOnSendMiddleware) {
    return;
  }
  communicator.addOnSendMiddleware(navigation);
  communicator.addOnSendMiddleware(keyValue);
  communicator.addOnSendMiddleware(setReady);
  communicator.addOnSendMiddleware(app);
  communicator.addOnSendMiddleware(iwa);

  return communicator;
};

export default {
  injectDefaultMiddleware,
  config,
  navigation,
  keyValue,
  setReady,
  app,
  iwa,
};
