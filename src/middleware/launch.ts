import { MiddlewareT } from '@liquid-state/iwa-core/dist/communicator/middleware';
import { WrappedSendingMessage } from '@liquid-state/iwa-core/dist/communicator/communicator';

export type OnSendMiddleware = MiddlewareT<WrappedSendingMessage, any>;

const launchMiddleware: OnSendMiddleware = dispatch => (next, done) => message => {
  if (message.domain !== 'launch') {
    return next(message);
  }
  switch (message.eventType) {
    case 'iab':
      const { url, settings } = message.data.data as any;
      window.open(url, "_iab");
      done();
      break;
      // @TODO Need to dispatch an event back?
    default:
      console.warn('Unhandled launch domain event', message);
      return next(message);
  }
};

export default launchMiddleware;
