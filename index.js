'use strict';

var get = require('get-value');
var visit = require('collection-visit');
var define = require('define-property');
var Loader = require('load-helpers');

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

  options = options || {};
  define(this, 'loader', new Loader(options));
  this.cache = this.loader.cache;

  if (options.async === true) {
    this.async = true;
  }
}

/**
 * Register a helper.
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

HelperCache.prototype.addHelper = function(name, fn, options) {
  this.loader.addHelper.apply(this.loader, arguments);
  return this;
};

/**
 * Get a helper.
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

HelperCache.prototype.getHelper = function(name) {
  return get(this.loader.cache, name);
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
  if (arguments.length === 1 && typeof name === 'string') {
    return this.getHelper(name);
  }
  if (isObject(name)) {
    return this.helpers.apply(this, arguments);
  }
  if (isObject(fn) && typeof fn.async !== 'boolean') {
    return this.asyncGroup.apply(this, arguments);
  }
  if (typeof fn !== 'function') {
    throw new TypeError('expected a function');
  }
  this.addHelper(name, fn);
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
  this.visit('helper', helpers);
  return this;
};

/**
 * Register an async template helper `fn` as `name`.
 *
 * ```js
 * app.asyncHelper('uppercase', function(str) {
 *   return str.toUpperCase();
 * });
 * ```
 * @param {String} `name`
 * @param {Function} `fn`
 * @return {Object} Retuns the instance of `HelperCache` for chaining.
 * @api public
 */

HelperCache.prototype.asyncHelper = function(name, fn) {
  if (arguments.length === 1 && typeof name === 'string') {
    return this.helper(name);
  }
  if (isObject(name)) {
    return this.asyncHelpers.apply(this, arguments);
  }
  if (typeof fn !== 'function') {
    throw new TypeError('expected a function');
  }
  this.addHelper(name, toAsync(fn), {async: true});
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
 * @param {Object|Array} `helpers` Object, array of objects, or glob patterns.
 * @api public
 */

HelperCache.prototype.group = function(prop, helpers) {
  if (!isObject(helpers)) {
    throw new TypeError('expected an object');
  }
  var keys = Object.keys(helpers);
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    this.set([prop, key], helpers[key]);
  }
  return this;
};

/**
 * Namespace a collection of async helpers on the given `prop`.
 *
 * ```js
 * app.asyncGroup('mdu', require('markdown-utils'));
 * // Usage: '<%= mdu.heading("My heading") %>'
 * ```
 * @param {Object|Array} `helpers` Object, array of objects, or glob patterns.
 * @api public
 */

HelperCache.prototype.asyncGroup = function(name, helpers) {
  if (typeof helpers === 'function') {
    return this.asyncGroup(helpers(this.options));
  }

  if (!isObject(helpers)) {
    throw new TypeError('expected an object');
  }

  var keys = Object.keys(helpers);
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    this.addHelper(name + '.' + key, toAsync(helpers[key]));
  }
  return this;
};

/**
 * Load helpers.
 *
 * ```js
 * app.load({
 *   foo: function() {},
 *   bar: function() {},
 *   baz: function() {}
 * });
 * ```
 * @param {Object} `helpers` Array of globs, file paths or key-value pair helper objects.
 * @return {Object} Retuns the instance of `HelperCache` for chaining.
 * @api public
 */

HelperCache.prototype.load = function() {
  this.loader.load.apply(this.loader, arguments);
  return this;
};

HelperCache.prototype.loadGroup = function() {
  this.loader.loadGroup.apply(this.loader, arguments);
  return this;
};

HelperCache.prototype.visit = function(method, val) {
  visit.apply(null, [this].concat([].slice.call(arguments)));
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

function toAsync(fn) {
  fn.async = true;
  return fn;
}
