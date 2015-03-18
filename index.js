/*!
 * helper-cache <https://github.com/jonschlinkert/helper-cache>
 *
 * Copyright (c) 2014-2015 Jon Schlinkert, Brian Woodward
 * Licensed under the MIT license.
 */

'use strict';

var _ = require('lodash');

/**
 * Create an instance of `Helpers`, optionally passing
 * default `options`.
 *
 * ```js
 * var Helpers = require('helper-cache');
 * var helpers = new Helpers();
 * ```
 *
 * @param {Object} `options` Default options to use.
 *   @option {Boolean} [options] `bind` Bind functions to `this`. Defaults to `false`.
 *   @option {Boolean} [options] `thisArg` The context to use.
 * @api public
 */

function Helpers(options) {
  if (!(this instanceof Helpers)) {
    return new Helpers(options);
  }

  var opts = _.defaults({}, options, {
    bind: false,
    thisArg: null
  });

  defineGetter(this, 'options', function () {
    return opts;
  });
}


/**
 * Register a helper.
 *
 * ```js
 * helpers.addHelper('lower', function(str) {
 *   return str.toLowerCase();
 * });
 * ```
 *
 * @name .addHelper
 * @param {String} `name` The name of the helper.
 * @param {Function} `fn` Helper function.
 * @return {Object} Return `this` to enable chaining
 * @api public
 */

defineGetter(Helpers.prototype, 'addHelper', function () {
  return function (name, fn, thisArg) {
    thisArg = thisArg || this.options.thisArg;

    // `addHelpers` handles functions
    if (typeof name === 'function') {
      return this.addHelpers.call(this, arguments);
    }

    if (typeof name !== 'string') {
      _.extend(this, name);
    } else {

      // when `thisArg` and binding is turned on
      if (thisArg && this.options.bind) {
        this[name] = _.bind(fn, thisArg);
      } else {
        this[name] = fn;
      }
    }

    // chaining
    return this;
  }.bind(this);
});


/**
 * Register an async helper.
 *
 * ```js
 * helpers.addAsyncHelper('foo', function (str, callback) {
 *   callback(null, str + ' foo');
 * });
 * ```
 *
 * @name .addAsyncHelper
 * @param {String} `key` The name of the helper.
 * @param {Function} `fn` Helper function.
 * @return {Object} Return `this` to enable chaining
 * @api public
 */

defineGetter(Helpers.prototype, 'addAsyncHelper', function () {
  return function(key, fn, thisArg) {
    // `addAsyncHelpers` handles functions
    if (typeof key === 'function') {
      return this.addAsyncHelpers.call(this, arguments);
    }

    // pass each key/value pair to `addAsyncHelper`
    if (typeof key !== 'string') {
      _.forOwn(key, function (value, k) {
        this.addAsyncHelper(k, value, thisArg);
      }, this);
    } else {
      fn.async = true;
      this.addHelper(key, fn, thisArg);
    }
    return this;
  }
});


/**
 * Load an object of helpers.
 *
 * ```js
 * helpers.addHelpers({
 *   a: function() {},
 *   b: function() {},
 *   c: function() {},
 * });
 * ```
 *
 * @name .addHelpers
 * @param {String} `key` The name of the helper.
 * @param {Function} `fn` Helper function.
 * @return {Object} Return `this` to enable chaining.
 * @api public
 */

defineGetter(Helpers.prototype, 'addHelpers', function () {
  return function (helpers, thisArg) {
    thisArg = thisArg || this.options.thisArg;

    // when a function is passed, execute it and use the results
    if (typeof helpers === 'function') {
      return this.addHelpers(helpers(thisArg), thisArg);
    }

    // allow binding each helper if enabled
    var o = {};
    _.forIn(helpers, function (value, key) {
      if (thisArg && this.options.bind) {
        o[key] = _.bind(value, thisArg);
      } else {
        o[key] = value;
      }
    }, this);

    // use `addHelper` to extend the object
    return this.addHelper(o);
  }.bind(this);
});


/**
 * Load an object of async helpers.
 *
 * ```js
 * helpers.addAsyncHelpers({
 *   a: function() {},
 *   b: function() {},
 *   c: function() {},
 * });
 * ```
 *
 * @name .addAsyncHelpers
 * @param {String} `key` The name of the helper.
 * @param {Function} `fn` Helper function.
 * @return {Object} Return `this` to enable chaining
 * @api public
 */

defineGetter(Helpers.prototype, 'addAsyncHelpers', function () {
  return function (helpers, thisArg) {
    // when a function is passed, execute it and use the results
    if (typeof helpers === 'function') {
      thisArg = thisArg || this.options.thisArg;
      return this.addAsyncHelpers(helpers(thisArg), thisArg);
    }

    // use `addAsyncHelper` to extend the object
    return this.addAsyncHelper(helpers, thisArg);
  }.bind(this);
});


/**
 * Get a registered helper.
 *
 * ```js
 * helpers.getHelper('foo');
 * ```
 *
 * @name .getHelper
 * @param  {String} `key` The helper to get.
 * @return {Object} The specified helper. If no `key` is passed, the entire cache is returned.
 * @api public
 */

defineGetter(Helpers.prototype, 'getHelper', function () {
  return function(key) {
    if (!key) {
      return this;
    }
    return this[key];
  }.bind(this);
});

/**
 * Utility method to define getters.
 *
 * @param  {Object} `obj`
 * @param  {String} `name`
 * @param  {Function} `getter`
 * @return {Getter}
 * @api private
 */

function defineGetter(obj, name, getter) {
  Object.defineProperty(obj, name, {
    configurable: false,
    enumerable: false,
    get: getter,
    set: function() {}
  });
}


module.exports = Helpers;
