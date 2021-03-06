import { MiddlewareT } from '@liquid-state/iwa-core/dist/communicator/middleware';
import { WrappedSendingMessage } from '@liquid-state/iwa-core/dist/communicator/communicator';

export type OnSendMiddleware = MiddlewareT<WrappedSendingMessage, any>;

const navigateEvent = (route: string, action: string, data: any) => ({
  purpose: 'navigate',
  route,
  action,
  ...data,
});

const responseForNavigate = (messageData: any) => {
  // Build the response message for a navigate.
  const {
    data: { webapp_id, route, params, context, transition },
  } = messageData;
  // If we are passed a webapp_id this route is navigating to an external web app.
  let result = webapp_id ? `external://${webapp_id}/${route}` : route;
  const event = navigateEvent(result, transition, { params, context });
  return event;
};

const navigationMiddleware: OnSendMiddleware = dispatch => (next, done) => message => {
  if (message.domain !== 'iwa' || message.eventType !== 'navigate') {
    return next(message);
  }
  dispatch(responseForNavigate(message.data));
  done();
};

export default navigationMiddleware;
