import { MiddlewareT } from '@liquid-state/iwa-core/dist/communicator/middleware';
import { WrappedSendingMessage } from '@liquid-state/iwa-core/dist/communicator/communicator';

const configMiddleware: (
  config: { [key: string]: any }
) => MiddlewareT<WrappedSendingMessage, any> = config => dispatch => (next, done) => message => {
  if (message.domain !== 'config') {
    return next(message);
  }
  if (message.eventType !== 'get') {
    throw `Invalid event type ${message.eventType} for domain config`;
  }
  const result = (message.data.data as any).keys.reduce((acc: any, key: string) => {
    const data = config[key] ? config[key] : null;
    acc[key] = { value: data };
    return acc;
  }, {});
  dispatch({
    purpose: 'response',
    request_id: message.data.request_id,
    response_data: result,
  });
  done();
};

export default configMiddleware;
