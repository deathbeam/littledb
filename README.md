# littledb [![Build Status](https://travis-ci.org/deathbeam/littledb.svg?branch=master)](https://travis-ci.org/deathbeam/littledb)

`littledb` is the littlest key-value database possible based on this
awesome [gist](https://gist.github.com/brandonb927/9587436).

`littledb` consists of simple JavaScript API to `put`/`get` and `ls`
to/from database and simple database server.

To run server, simply install package and run

```bash
littledb 80 # without passing some available port will be chosen
```

or in node.js
```javascript
const port = 80
require('littledb')().listen(port)
```

Then you can simply access it with `curl`:


```sh
# save key
curl -d "key;value" localhost  
# save array
curl -d "key;value;value;value" localhost  
# show keys
curl -d "ls" localhost  
# get value
curl -d "key" localhost  
# delete key
curl -d "key;" localhost
```

To create simple client:

```javascript
const path = './db.json' // this is default path, not required to be passed
const db = require('littledb')(path)

db.put('hello', 'world') // => "world"
db.get('hello')          // => "world"
db.ls()                  // => [ "hello" ]
db.put('hello')          // => undefined
db.get('hello')          // => undefined
```
