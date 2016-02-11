'use strict';

var loader = require('load-helpers');
var base = require('base');
var Base = base.namespace('cache');

/**
 * Create an instance of `HelperCache` with the given `options.`
 *
 * ```js
 * var App = require('helper-cache');
 * var app = new App();
 * ```
 * @param {Object} `options`
 * @api public
 */

function HelperCache(options) {
  if (!(this instanceof HelperCache)) {
    return new HelperCache(options);
  }
  Base.call(this);
  this.options = options || {};
  this.cache = {};
  this.load = this.loader(this.cache);
}

/**
 * Inherit `base-methods`
 */

Base.extend(HelperCache);

/**
 * Register multiple sync helpers at once.
 *
 * ```js
 * app.helpers({
 *   foo: function() {},
 *   bar: function() {},
 *   baz: function() {}
 * });
 * ```
 * @param {Object} `helpers` Array of globs, file paths or key-value pair helper objects.
 * @return {Object} Retuns the instance of `HelperCache` for chaining.
 * @api public
 */

HelperCache.prototype.loader = function(cache, async) {
  return loader(cache, {async: async});
};

/**
 * Register a sync template helper `fn` as `name`.
 *
 * ```js
 * app.helper('uppercase', function(str) {
 *   return str.toUpperCase();
 * });
 * ```
 * @param {String} `name`
 * @param {Function} `fn`
 * @return {Object} Retuns the instance of `HelperCache` for chaining.
 * @api public
 */

HelperCache.prototype.helper = function(name, fn) {
  if (isObject(name)) {
    return this.visit('helper', name);
  }
  this.set(name, fn);
  return this;
};

/**
 * Register multiple sync helpers at once.
 *
 * ```js
 * app.helpers({
 *   foo: function() {},
 *   bar: function() {},
 *   baz: function() {}
 * });
 * ```
 * @param {Object} `helpers` Array of globs, file paths or key-value pair helper objects.
 * @return {Object} Retuns the instance of `HelperCache` for chaining.
 * @api public
 */

HelperCache.prototype.helpers = function(helpers) {
  return this.visit('helper', helpers);
};

/**
 * Register an async template helper `fn` as `name`.
 *
 * ```js
 * app.helper('uppercase', function(str) {
 *   return str.toUpperCase();
 * });
 * ```
 * @param {String} `name`
 * @param {Function} `fn`
 * @return {Object} Retuns the instance of `HelperCache` for chaining.
 * @api public
 */

HelperCache.prototype.asyncHelper = function(key, fn) {
  if (isObject(key)) {
    return this.visit('asyncHelper', key);
  }
  fn.async = true;
  this.set(key, fn);
  return this;
};

/**
 * Register multiple async helpers at once.
 *
 * ```js
 * app.asyncHelpers({
 *   foo: function() {},
 *   bar: function() {},
 *   baz: function() {}
 * });
 * ```
 * @param {Object} `helpers` Array of globs, file paths or key-value pair helper objects.
 * @return {Object} Retuns the instance of `HelperCache` for chaining.
 * @api public
 */

HelperCache.prototype.asyncHelpers = function(helpers) {
  return this.visit('asyncHelper', helpers);
};

/**
 * Namespace a collection of sync helpers on the given `prop`.
 *
 * ```js
 * app.group('mdu', require('markdown-utils'));
 * // Usage: '<%= mdu.heading("My heading") %>'
 * ```
 * @name .group
 * @param {Object|Array} `helpers` Object, array of objects, or glob patterns.
 * @api public
 */

HelperCache.prototype.group = function(prop, helpers) {
  this.set(prop, helpers);
  return this;
};

/**
 * Namespace a collection of async helpers on the given `prop`.
 *
 * ```js
 * app.asyncGroup('mdu', require('markdown-utils'));
 * // Usage: '<%= mdu.heading("My heading") %>'
 * ```
 * @name .group
 * @param {Object|Array} `helpers` Object, array of objects, or glob patterns.
 * @api public
 */

HelperCache.prototype.asyncGroup = function(name, helpers) {
  for (var key in helpers) {
    helpers[key].async = true;
  }
  this.set(name, helpers);
  return this;
};

/**
 * Expose `helper-cache`
 */

module.exports = HelperCache;

/**
 * Return true if a value is an object
 */

function isObject(val) {
  return val && typeof val === 'object' && !Array.isArray(val);
}


var cache = new HelperCache();

cache.helper('foo', function() {

})

console.log(cache)
