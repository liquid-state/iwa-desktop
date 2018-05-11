# IWA Desktop Environment

A set of functions and utilities to make it easy to run IWAs in a desktop environment. This can be used to run a full desktop version of an application in production or to make developing IWAs simpler by modelling native behaviours in a browser.

## Basics

To get a simple working environment quickly you'll need to follow a few quick steps.

1. Replace the communicator with the noopCommunicator from this package

```
import Desktop from '@liquid-state/iwa-desktop'

const app = createApp(definition, Desktop.createNoopCommunicator());
```

2. Wrap the resulting communicator in the default middleware

```
Desktop.injectDefaultMiddleware(app.communicator);
```

3. Add any additional middleware you need (eg config)

```
import { middleware } from '@liquid-state/iwa-desktop';
app.communicator.addOnSendMiddleware(middleware.config({
    AWS_REGION: 'us-east-2',
    AWS_USERPOOL_ID: 'abc123'
}));
```

## Available middleware

### OnSend

* navigation (included in default)
* config

### OnRecieve

None