<br />
<p align="center">
  <a href="https://dndb.crawford.ml">
    <img src="https://dndb.crawford.ml/_assets/dndblogo.c35b53e9.png" alt="Deno Logo" width="80" height="80">
  </a>
<br />
<p align="center"><a href="https://nest.land/package/dndb"><img src="https://nest.land/badge.svg" alt="nest badge"></a> <img src="https://hitcounter.pythonanywhere.com/count/tag.svg?url=https%3A%2F%2Fgithub.com%2Fdenyncrawford%2Fdndb" alt="Hits"> <a href="https://deno.land"><img src="https://img.shields.io/badge/deno-v1.1.3-green.svg?style=flat-square&amp;logo=deno" alt="(Deno)"></a> <a href="https://github.com/denyncrawford/crawford/blob/master/LICENSE"><img src="https://img.shields.io/github/license/denyncrawford/dndb?logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAEFCu8CAAAABGdBTUEAALGPC/xhBQAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAHKADAAQAAAABAAAAHAAAAABHddaYAAAC5UlEQVRIDd2WPWtVQRCGby5pVASLiGghQSxyG8Ui2KWwCfkH9olY2JneQkiR0oCIxH/gB+qVFDYBIWBAbAIRSbCRpLXwIxLiPT7vnNm9e87ZxJtUwYH3zO47Mzv7Mbv3tlo5KYriGtgAJ81OY1ENdG/YI4boFEOI911BXgY/pdtwGuAtXpvmB1tAXHDnUolE5urkPOQo6MqA3pXWmJJL4Bb4rQ7yEYfxsjnIF29NJIoNC6e5fxOL/qN+9KCz7AaLpN8zI415N2i2EptpGrkRIjGeAuvR6IY1hSFLFUOug9Ms2M7ZxIUNytm1mnME186sdI2BOCwAyQMg54ugzSmKmwbPwSbolKH+hbAtQdsOoF+BsF3anUVwBdiOWRidFZDKTTrKEAJTm3GVrGkHzw/uPZbyx7DNNLfB7KGmRsCcr+/gjaiPSpAOTyX9qG4L/XBDdWXDDf1M+wtQ5fwCOtcb4Dto6VpLmzByB6gqdHbTItGSJdAGqibJQhmRfCF7IN4beSF2G9CqnGXQrxofXU+EykllNeoczRgYytDKMubDIRK0g5MF8rE69cGu0u9nlUcqaUZ41W0qK2nGcSzr4D2wV9U9wxp1rnpxn8agXAOHMQ9cy9kbHM7ngY4gFb03TxrO/yfBUifTtXt78jCrjY/jgEFnMn45LuNWUtknuu7NSm7D3QEn3HbatV1Q2jvgIRf1sfODKQaeymxZoMLlTqsq1LF+HvaTqQOzEzUCfni0/eNIA+DfuE3KEtbsegckGmMktTXacnBHPVe687ugkpT+axCkkhBSyRSjWI2xf1KMMVmYiQdWksK9BEFiQoiYLIlvJA3/zeTzCejP0RbB6YPbhZuB+0pR3KcdX0LaJtju0ZgBL8Bd+sbz2QIaU2OfBX3BaQLsgZysQtrk0M8Sh1A0w3DyyYnGnAiZ4gqZ/TvI2A8OGd1YIbF7+F3P+B6dYpYdsJNZgrjO0UdOIhmom0nwL0pnfnzkL1803jAoKhvyAAAAAElFTkSuQmCC" alt="license"></a>
<a href="https://app.fossa.com/projects/git%2Bgithub.com%2Fdenyncrawford%2Fdndb?ref=badge_small"><img src="https://app.fossa.com/api/projects/git%2Bgithub.com%2Fdenyncrawford%2Fdndb.svg?type=small" alt="FOSSA Status"></a></p>

<p align="center">
    A Deno 🦕 persistent, embeddable and optimized NoSQL database for JS & TS </a>.
    <br />
    <a href="https://dndb.crawford.ml/docs"><strong>Documentation</strong></a>
    <br />
    <br />
    <a href="https://github.com/denyncrawford/dndb/issues">Report a Bug</a>
    ·
    <a href="https://github.com/denyncrawford/dndb/issues">Request Feature</a>
    .
    <a href="https://github.com/denyncrawford">Support Us</a>
  </p>
</p>

<br><br>

## About DnDB

DnDB is a javascript persistent database written for Deno and available for
Typescript.

Inspired by NeDB, DnDB is a robust but minimalist database engine written on JS
that uses/emulates the mongo query API to edit and find data, making it 100%
exportable to a mongojs environment.

> _Notice_: This project is under development, so it is subject to future
> improvements and changes.

## Why DnDB?

DnDB is an incredibly fast and powerful data store. All methods are streamed and
buffered to optimize data reading/writing. DnDB is not only faster, but it
consumes less resources (RAM) since only a small portion of the data stream is
stored in memory by the buffer, enabling optimal performance on large data
collections.

## 🧪 Quick test

[Run the demo](/demo/README.md) to test DnDB in a server environment. Also this
demo lives on [Codesandbox](https://codesandbox.io/s/6x0uw)

## 📦 Importing

**deno.land**

```javascript
import Datastore from "https://deno.land/x/dndb@0.3.3/mod.ts";
```

**nest.land**

```javascript
import Datastore from "https://x.nest.land/dndb@0.3.3/mod.ts";
```

## 📖 Usage

DnDB works by instantiating collections stored in a specific file given by the
user in the instance configuration. By default the created instance exposes the
necessary methods to work the datastore.

All the api methods are asynchronous by default, so they return promises, but
it's also possible to pass a callback to them to work in a traditional mongo
way.

- [Instantiating a collection](/#instatiating-a-collection)
- [API](#inserting-documents)
  - [Inserting documents](#%EF%B8%8F-inserting-documents)
  - [Finding documents](#-finding-documents)
  - [Updating documents](#%EF%B8%8F-updating-documents)
  - [Removing documents](#-removing-documents)

## ✔️ Instantiating the collection

```javascript
import Datastore from "https://deno.land/x/dndb@0.3.3/mod.ts";

const db = new Datastore({ filename: "./database.db", autoload: true });
```

When you instantiate a collection you can pass it a config object with a couple
of options:

- `filename`: The filename is the absolute path to your target file. If no
  filename is provided, DnDB will automatically create one in the current
  working directory, and if a full path is not specified, it will resolve the
  file name within the CWD.

- `autoload`: The autoload option runs the `loadDatabase` method which creates
  the persistent file the first time DnDB is running in your project, this is
  optional, but if the loadDatabase method is not executed, the instance will
  not work until the persistent file exists.

- `bufSize`: The bufSize parameter rewrites the default size of the buffer. It
  must be indicated in numbers and represents the amount of bytes to be
  allocated. By default 4096 bytes.

> _Notice_: The configuration content is currently in alpha, more options will
> be available soon.

## 🖋️ Inserting documents

All data types are allowed, but field names starting with '$' are reserved for
data querying.

If the document does not contain an _id field, DnDB will automatically generate
one for you (a RFC4122 UUID alphanumerical string). The _id of a document, once
set, shouldn't be modified.

```javascript
let obj = {
  name: "denyn",
  lastName: "crawford",
};

let insertion = await db.insert(obj);

// OR

db.insert(obj, (insertion) => {
  // ...foo(insetion)
});
```

To insert documents DnDB exposes the method:

- `insert`:

- returns: Array/object with the inserted documents.

The insert method receives two arguments:

- `data`: Json data to insert
- `callback`(optional): The callback function to get the data inserted.

You can also insert several documents at the same time by wrapping them in an
array.

```javascript
let foo = "foo";

db.insert([{ name: "denyn" }, { name: foo }], (insertion) => {
  // ...foo(insetion)
});
```

## 🔍 Finding documents

To find documents DnDB exposes the methods:

- `find`: Finds all the documents that match the query.

  - returns: array of matching documents

- `findOne`: Finds the first document that matches the query.

  - returns: exact first matching object

You can select documents based on field equality or use comparison operators
(`$lt`, `$lte`, `$gt`, `$gte`, `$in`, `$nin`, `$neq`). You can also use logical
operators `$or`, `$and`, `$not` and `$eq`. See below for the syntax.

You can use regular expressions in two ways: in basic querying in place of a
string, or with the $regex operator.

_Example of document querying:_

> _Notice_: See all rules and operators list
> [here](https://www.npmjs.com/package/mingo)

```javascript
db.find({ name: "Denyn" }, {}, (docs) => {
  console.log(docs);
});

// or

let docs = await db.find({ name: "Denyn" });

// Finding unique document

let docs = await db.findOne({ username: "denyncrawford" });

// Deep querying syntax:

let docs = await db.find({ fullName: { lastName: "Crawford" } });
```

You can also use dot notation to find documents by deep querying.

```javascript
let docs = await db.find({ "fullName.lastName": "Crawford" });

// Using dot notation to find inside arrays:

let docs = await db.find({ "list.games.0": "Doom" });
```

> If you want to know how to advance query documents please
> [read this](https://github.com/louischatriot/nedb/#basic-querying)

### Projections

You can give `find` and `findOne` an optional second argument, projections. The
syntax is the same as MongoDB: `{ a: 1, b: 1 }` to return only the a and b
fields, `{ a: 0, b: 0 }` to omit these two fields. You cannot use both modes at
the time, except for _id which is by default always returned and which you can
choose to omit. You can project on nested documents.

> _Notice_: See all rules and operators list
> [here](https://www.npmjs.com/package/mingo)

```javascript
db.find({ planet: "Mars" }, { planet: 1, system: 1 }, function (docs) {
  // docs is [{ planet: 'Mars', system: 'solar', _id: 'id1' }]
});
```

## 🖌️ Updating documents

To update documents DnDB exposes the method:

- `update`

  - returns: array with the new updated collection

- `updateOne`

  - returns: object with the new updated document.

The update method follows the same query rules as in `find` and `findOne` at
first argument to get the update target document and as a second agument it
receives the aggregation operators that modifies the matching fileds values ​​by
following the aggregation rules.

> _Notice_: See all rules and operators list
> [here](https://www.npmjs.com/package/mingo)

```javascript
db.update({ name: "denyn" }, { $set: { pet: "Boots" } }, (update) => {
  // ...foo(update)
});

// OR

let update = await db.update({ name: "denyn" }, { $set: { pet: "Boots" } });
```

## ❌ Removing documents

To remove documents DnDB exposes the method:

- `remove`

  - returns: array with the new removed collection

- `removeOne`

  - returns: object with the new removed document

The remove method follows the same query rules as in `find` and `findOne` at
first argument, it will remove all the documents that matches the query.

```javascript
db.remove({ _id: "id2" }, function (newDoc) {
  // ...foo(newDoc)
});

//OR

const { remove } = db;

await remove({ _id: "id2" });
```

> _Notice_: If you want to unset a value from the document you must use update
> with the $unset operator. See all rules and operators list
> [here](https://www.npmjs.com/package/mingo)

# 📝 Roadmap

- Standard methods
- Database from datastores factory
- Read and write streams and buffer
- Global Queue executor
- Event hooks on all the API usage
- Count method
- Improve documentation
- Prevent updating immutable data
- Error handlers.
- SORT, SKIP, and LIMIT modifier methods support.

# 📌 This module is right now on Beta, but the main API is pretty usable for production.

Since it is a standard, the API will not be subject to drastic changes, but its
internal working will.

# 👊 Support this project by donating on:

- [Paypal](https://paypal.me/DENYNCRAWFORD?locale.x=en_US).
- BTC address: 1AwAW9gj7zsHWjoawm1yFntjE69uvEjJTv
- USDT adress (BSC) 0x9c83792244a8ee2e5b4c595b001ad8d7173e98bf
- USDT adress (ERC20) 0x9c83792244a8ee2e5b4c595b001ad8d7173e98bf

# 📜 MIT License

Copyright (c) Crawford.

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fdenyncrawford%2Fdndb.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fdenyncrawford%2Fdndb?ref=badge_large)

[Full license](/LICENSE.md)

# Scripts

| Type   | Command                                                                             |
| ------ | ----------------------------------------------------------------------------------- |
| Format | `deno fmt`                                                                          |
| Lint   | `deno lint --unstable --ignore=test,demo`                                           |
| Test   | `deno test --unstable --allow-read=. --allow-write=db.db,db.db.updated`             |
