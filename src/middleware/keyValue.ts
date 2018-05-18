import { MiddlewareT } from '@liquid-state/iwa-core/dist/communicator/middleware';
import { WrappedSendingMessage } from "@liquid-state/iwa-core/dist/communicator/communicator";

export type OnSendMiddleware = MiddlewareT<WrappedSendingMessage, any>;

let kv: string | null = null;

const getKV = () => {
  if (!kv) {
    kv = localStorage.getItem('kv');
    if (!kv) {
      kv = '{}';
    }
  }
  return JSON.parse(kv);
}

const get = (message: WrappedSendingMessage) => {
  const kv = getKV();
  const result: { [key: string]: any } = {};
  const keys = (message.data.data as any).keys as string[];
  keys.forEach(key => {
    const data = kv[key];
    result[key] = {
      found: Boolean(data),
      value: data ? data.value : null,
    };
  });
  return result;
}

const set = (message: WrappedSendingMessage) => {
  const kv = getKV();
  const items = (message.data.data as any).items as { key: string }[];
  items.forEach(item => {
    kv[item.key] = item;
  });
  localStorage.setItem('kv', JSON.stringify(kv));
}

const keyValueMiddleware: OnSendMiddleware = dispatch => (next, done) => message => {
  if (message.domain !== 'kv') {
    return next(message);
  }
  if (message.eventType === 'get') {
    const result = get(message);
    dispatch({
      purpose: 'response',
      request_id: message.data.request_id,
      event_type: 'get',
      response_data: result
    });
    done();
  } else if (message.eventType === 'set') {
    const result = set(message);
    done();
  } else {
    throw `Invalid event type ${message.eventType} for domain kv`;
  }
};

export default keyValueMiddleware;
