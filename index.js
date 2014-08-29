/*!
 * helper-cache <https://github.com/jonschlinkert/helper-cache>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var loader = require('load-helpers');
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

function Helpers(options) {
  if (!(this instanceof Helpers)) {
    return new Helpers(options);
  }

  var opts = _.defaults({}, options, {
    bindFunctions: false,
    thisArg: this
  });

  defineGetter(this, 'options', function () {
    return opts;
  });
}


/**
 * Set helpers on the cache.
 *
 * @param {String} `key` The name of the helper.
 * @param {Function} `fn` Helper function.
 * @api public
 */

defineGetter(Helpers.prototype, 'addHelper', function () {
  return function (key, fn, thisArg) {
    thisArg = thisArg || this.options.thisArg;

    if (typeof key !== 'string') {
      _.extend(this, key);
    } else {
      if (this.options.bindFunctions) {
        this[key] = _.bind(fn, thisArg);
      } else {
        this[key] = fn;
      }
    }

    return this;
  }.bind(this);
});


/**
 * Add an object of helpers to the cache.
 *
 * See [load-helpers] for issues, API details and the full range of options.
 *
 * @param {String} `key` The name of the helper.
 * @param {Function} `fn` Helper function.
 * @api public
 */

defineGetter(Helpers.prototype, 'addHelpers', function () {
  return function () {
    var thisArg = this.options.thisArg;

    loader.init();

    var helpers = loader.load.apply(loader, arguments);
    _.forIn(helpers.cache, function (value, key) {
      var o = {};
      o[key] = _.bind(value, thisArg);
      _.extend(this, o);
    }, this);

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

defineGetter(Helpers.prototype, 'getHelper', function () {
  return function(key) {
    if (!key) {
      return this;
    }
    return this[key];
  }.bind(this);
});


module.exports = Helpers;
