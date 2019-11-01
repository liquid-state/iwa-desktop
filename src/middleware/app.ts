import { MiddlewareT } from '@liquid-state/iwa-core/dist/communicator/middleware';
import { WrappedSendingMessage } from '@liquid-state/iwa-core/dist/communicator/communicator';

export type OnSendMiddleware = MiddlewareT<WrappedSendingMessage, any>;

const appMiddleware: OnSendMiddleware = dispatch => (next, done) => message => {
  if (message.domain !== 'app') {
    return next(message);
  }
  switch (message.eventType) {
    case 'online_status':
      dispatch({
        purpose: 'response',
        request_id: message.data.request_id,
        response_data: { status: navigator.onLine },
      });
      done();
      break;
    case 'user_location':
      navigator.geolocation.getCurrentPosition(loc =>
        dispatch({
          purpose: 'response',
          request_id: message.data.request_id,
          response_data: {
            type: 'fine',
            location: {
              latitude: loc.coords.latitude,
              longitude: loc.coords.longitude,
              accuracy: loc.coords.accuracy,
            },
          },
        })
      );
      done();
      break;
    case 'reset':
      history.pushState({}, '', '/#/');
      location.reload(true);
      done();
      break;
    // @TODO Need to dispatch an event back?
    default:
      console.warn('Unhandled app domain event', message);
      return next(message);
  }
};

export default appMiddleware;
