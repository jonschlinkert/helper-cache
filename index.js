/*!
 * helper-cache <https://github.com/jonschlinkert/helper-cache>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var _ = require('lodash');


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
  this.options = options || {bindFunctions: false};
}


/**
 * Set helpers on the cache.
 *
 * @param {String} `key` The name of the helper.
 * @param {Function} `fn` Helper function.
 * @api public
 */

Helpers.prototype.set = function(key, fn) {
  if (typeof key !== 'string') {
    this.keyend(key);
  } else {
    if (this.options.bindFunctions) {
      this[key] = _.bind(fn, this);
    } else {
      this[key] = fn;
    }
  }
  return this;
};


/**
 * Get a helper from the cache.
 *
 * @param  {String} `key` The helper to get.
 * @return {Object} The specified helper. If no `key` is passed, the entire cache is returned.
 * @api public
 */

Helpers.prototype.get = function(key) {
  if (!key) {
    return this;
  }
  return this[key];
};


module.exports = Helpers;
