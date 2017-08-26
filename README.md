# rx-lokka

A simple Rx-powered wrapper around Lokka

## Get Started

    yarn add rx-lokka

### Create a Lokka Client

```javascript
const Lokka = require('lokka').Lokka;
const Transport = require('lokka-transport-http').Transport;

export function createLokkaClient() {
  return new Lokka({
    transport: new Transport('https://<your-api>')
  });
}
```

### Add to your module's providers

```javascript
import { LokkaProvider } from 'rx-lokka';
// ...
providers: [{
    provide: LokkaProvider,
    useFactory: () => {
      return new LokkaProvider(createLokkaClient());
    }
  }],
```

### Use it in your components

```javascript

const allTasksQuery = `
    {
      allTasks {
        title
        id
        createdAt
        content
      }
    }`;

this.lokka
    .query(allTasksQuery)
    .subscribe((data: AllTasks) => {
        // all Tasks
    });
```