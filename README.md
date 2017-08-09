# Prettygoat-seed

This is the starting point in a [prettygoat](https://github.com/tierratelematics/prettygoat)-powered application.
By following these simple steps you'll have an engine running some projections of a fake bank context.

## Installation

Make sure you have installed [smild](https://github.com/mtfranchetto/smild) on your machine.
Download this repository (or clone it), then run:

`
$ npm install && smild watch-build
`

And it's running!

## Usage

Open your browser pointing a [projection](http://localhost:3000/projections/accounts/list) to see its results.
To trigger the ingestion of new events you can edit events/bank.js. Try to add this event:

```javascript
{
    type: "io.bank.AccountCreated",
    payload: {
        id: "8340948HSHS-8483J",
        name: "Unicredit"
    },
    timestamp: new Date(4)
}
```

You can then refresh your browser and see that the new account has appeared.

## Event store

This seed is configured to read the events from the filesystem. For production usage this is not really ideal, so have a look at [cassandra-store](https://github.com/tierratelematics/prettygoat-cassandra-store) for a production-ready database.

## Frontend

If you're looking for a frontend that automatically updates your views when something changes on a projection, have a look at [ninjagoat](https://github.com/tierratelematics/ninjagoat-seed).

## License

Copyright 2016 Tierra SpA

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.