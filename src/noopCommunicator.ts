import {
  ReceivedMessage,
  ICommunicatorImpl,
} from '@liquid-state/iwa-core/dist/communicator/communicator';
import SimpleEvent from '@liquid-state/iwa-core/dist/utils/simpleEvent';

/* A communicator implementation which does nothing but log all events which reach it.

Generally when running in a desktop environment communicator middleware should handle all events,
when events react the communicator implementation that means they have not been handled correctly.
*/
export class NoopCommunicator implements ICommunicatorImpl {
  messageReceived = new SimpleEvent<ReceivedMessage>();

  send(domain: string, type: string, data: object) {
    const message = `No-op communicator tried to send an event ${domain} ${type}.
    The noop communicator should not recieve messages as they should always be handled by communicator middleware.

    You should check that you have configured your communicator correctly,
    or if you are confident in your configuration please raise a bug at
    https://github.com/liquid-state/iwa-desktop/issues`;

    console.warn(message);
    console.log('Message details', domain, type, data);
  }
}

export default () => new NoopCommunicator();
