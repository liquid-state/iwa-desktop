import { MiddlewareT } from '@liquid-state/iwa-core/dist/communicator/middleware';
import { WrappedSendingMessage } from '@liquid-state/iwa-core/dist/communicator/communicator';

export type OnSendMiddleware = MiddlewareT<WrappedSendingMessage, any>;

const iwaMiddleware: OnSendMiddleware = dispatch => (next, done) => message => {
  // @TODO Move all iwa domain handlers here
  if (message.domain !== 'iwa' && message.eventType !== 'http') {
    return next(message);
  }
  switch (message.eventType) {
    case 'http':
      const data = message.data.data as any;
      fetch(data.url, data).then(res =>
        dispatch({
          purpose: 'response',
          eventType: 'http',
          request_id: message.data.request_id,
          response_data: res,
        })
      );
      done();
      break;
    case 'navigate_back':
      window.history.back();
      done();
      break;
    default:
      console.warn('Unhandled iwa domain event', message);
      return next(message);
  }
};

export default iwaMiddleware;
