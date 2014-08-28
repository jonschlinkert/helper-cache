/*!
 * helper-cache <https://github.com/jonschlinkert/helper-cache>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var _ = require('lodash');


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


/**
 * ```js
 * var Helpers = require('helper-cache');
 * var helpers = new Helpers();
 * ```
 *
 * @param {Object} `options` Default options to use.
 *   @option {Boolean} [options] `bindFunctions` Bind functions to `this`. Defaults to `false`.
 * @api public
 */

function Helpers (options) {
  options = options || {bindFunctions: false};

  defineGetter(this, 'options', function () {
    return options;
  });
}


/**
 * Set helpers on the cache.
 *
 * @param {String} `key` The name of the helper.
 * @param {Function} `fn` Helper function.
 * @api public
 */

defineGetter(Helpers.prototype, 'set', function () {
  return function (key, fn, thisArg) {
    if (typeof key !== 'string') {
      this.keyend(key);
    } else {
      if (this.options.bindFunctions) {
        this[key] = _.bind(fn, thisArg || this);
      } else {
        this[key] = fn;
      }
    }
    return this;
  }.bind(this);
});


/**
 * Get a helper from the cache.
 *
 * @param  {String} `key` The helper to get.
 * @return {Object} The specified helper. If no `key` is passed, the entire cache is returned.
 * @api public
 */

defineGetter(Helpers.prototype, 'get', function () {
  return function(key) {
    if (!key) {
      return this;
    }
    return this[key];
  }.bind(this);
});


module.exports = Helpers;
