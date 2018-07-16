# littledb [![Build Status](https://travis-ci.org/deathbeam/littledb.svg?branch=master)](https://travis-ci.org/deathbeam/littledb)

`littledb` is the littlest key-value database possible based on this
awesome [gist](https://gist.github.com/brandonb927/9587436).

`littledb` consists of simple JavaScript API to `put`/`get`/`del` and `ls`
to/from database. 

To create simple client:

```javascript
const db = require('littledb')('./db.json')

db.put('hello', 'world') // => "world"
db.get('hello')          // => "world"
db.ls()                  // => [ "hello" ]
db.del('hello')          // => true
db.get('hello')          // => undefined
```

It also contains super simple HTTP service that you can use as generic key-value
remote database.

Keys and values are separated simply with a semicolon, and arrays by
using multiple semicolons.
To delete key we simply put no value after semicolon.

To run local instance of service pointing to `./db.json` on port `80` simply do:

```javascript
require('littledb')().serve()
```

Then you can simply manipulate it with curl:


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

By default this package will also install `littledb` executable that will
start `littledb` server with single parameter that simply determine port
(not required, defaults to 80).