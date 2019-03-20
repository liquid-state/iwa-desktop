import { MiddlewareT } from '@liquid-state/iwa-core/dist/communicator/middleware';
import { WrappedSendingMessage } from '@liquid-state/iwa-core/dist/communicator/communicator';

export type OnSendMiddleware = MiddlewareT<WrappedSendingMessage, any>;

const setReadyMiddleware: OnSendMiddleware = dispatch => (next, done) => message => {
  if (message.domain !== 'iwa' || message.eventType !== 'set_ready') {
    return next(message);
  }
  dispatch({
    purpose: 'navigate',
    route: undefined,
  });
  done();
};

export default setReadyMiddleware;
