# helper-cache [![NPM version](https://badge.fury.io/js/helper-cache.svg)](http://badge.fury.io/js/helper-cache)


> Easily get and set helper functions to pass to any application or template engine.

## Install
#### Install with [npm](npmjs.org):

```bash
npm i helper-cache --save-dev
```

## Usage

```js
var Cache = require('helper-cache');

var helpers = new Cache();
helpers.set('a', function (str) {
  return str.toLowerCase();
});
helpers.set('b', function (str) {
  return str.toUpperCase();
});

console.log(helpers)
//=> { options: { bindFunctions: false },
//    '.a': [Function],
//    '.b': [Function] }

var mixins = new Cache();
mixins.set('a', function (str) {
  return str.toLowerCase();
});
mixins.set('b', function (str) {
  return str.toUpperCase();
});

console.log(mixins);
//=> { options: { bindFunctions: false },
//    '.a': [Function],
//    '.b': [Function] }
```

## API
### [Helpers](index.js#L46)

* `options` **{Object}**: Default options to use.  
    - `bindFunctions` **{Boolean}**: Bind functions to `this`. Defaults to `false`.
      

```js
var Helpers = require('helper-cache');
var helpers = new Helpers();
```

Set helpers on the cache.

Set async helpers on the cache.

See [load-helpers] for issues, API details and the full range of options.

See [load-helpers] for issues, API details and the full range of options.

Get a helper from the cache.

Get an async helper from the cache.

### [next](index.js#L234)

Resolve async helpers to replace the generated id with the actual value.

* `content` **{String}**: Content that was originally rendered and may have async helper IDs.    
* `cb` **{Function}**: Callback that will return the final contents after all async helpers have been resolved.    

**Example**

```js
helpers.resolve(str, function (err, content) {
  // do something with finaly contents
});
```

## Author
 
**Jon Schlinkert**
 
+ [github/jonschlinkert](https://github.com/jonschlinkert)
+ [twitter/jonschlinkert](http://twitter.com/jonschlinkert) 
 
**Brian Woodward**
 
+ [github/doowb](https://github.com/doowb)
+ [twitter/doowb](http://twitter.com/doowb) 


## License
Copyright (c) 2014 Jon Schlinkert, contributors.  
Released under the MIT license

***

_This file was generated by [verb-cli](https://github.com/assemble/verb-cli) on September 14, 2014._


[load-helpers]: https://github.com/assemble/load-helpers