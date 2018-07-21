import { MiddlewareT } from '@liquid-state/iwa-core/dist/communicator/middleware';
import { WrappedSendingMessage } from "@liquid-state/iwa-core/dist/communicator/communicator";

export type OnSendMiddleware = MiddlewareT<WrappedSendingMessage, any>;

let _kv: string | null = null;

const getKV = () => {
  if (!_kv) {
    _kv = localStorage.getItem('kv');
    if (!_kv) {
      _kv = '{}';
    }
  }
  return JSON.parse(_kv);
}

const updateKv = (value: object) => {
  _kv = JSON.stringify(value);
  localStorage.setItem('kv', _kv);
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
  const items = (message.data.data as any).items as { key: string, value: any }[];
  const result: {[key: string]: any} = {};
  items.forEach(item => {
    kv[item.key] = item;
    result[item.key] = {
      found: true,
      value: item.value
    };
  });
  updateKv(kv);
  return result;
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
    dispatch({
      purpose: 'response',
      request_id: message.data.request_id,
      event_type: 'set',
      response_data: result
    });
    done();
  } else {
    throw `Invalid event type ${message.eventType} for domain kv`;
  }
};

export default keyValueMiddleware;
