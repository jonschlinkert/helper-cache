/*!
 * helper-cache <https://github.com/jonschlinkert/helper-cache>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

require('mocha');
var should = require('should');
var assert = require('assert');
var HelperCache = require('..');

describe('async helper', function() {
  describe('set', function() {
    it('should create instance of helper cache', function() {
      var actual = new HelperCache();

      actual.should.be.an.object;
      actual.should.be.instanceof.cache;
      assert.equal(actual instanceof HelperCache, true);
    });

    it('should set a helper by name', function() {
      var helpers = new HelperCache();
      helpers.asyncHelper('foo', function(str, callback) {
        callback(null, str + ' foo');
      });
      assert.equal(typeof helpers.cache.foo, 'function');
      assert.equal(helpers.cache.foo.async, true);
    });

    it('should add individual helpers to the cache.', function() {
      var helpers = new HelperCache();

      helpers.asyncHelper('a', function(str, callback) {
        callback(null, str);
      });

      helpers.asyncHelper('b', function(str, callback) {
        callback(null, str);
      });

      var keys = Object.keys(helpers.cache);
      assert.equal(keys.length, 2);
    });

    it('should set helpers from object', function() {
      var helpers = new HelperCache();
      helpers.asyncHelper({
        foo: function(str, callback) {
          callback(null, str + ' foo');
        },
        bar: function(str, callback) {
          callback(null, str + ' bar');
        }
      });

      assert.equal(typeof helpers.cache.foo, 'function');
      assert.equal(typeof helpers.cache.bar, 'function');
      assert.equal(helpers.cache.foo.async, true);
      assert.equal(helpers.cache.bar.async, true);
    });
  });

  describe('get', function() {
    it('should get a helper by name', function() {
      var helpers = new HelperCache();
      helpers.asyncHelper('foo', function(str, callback) {
        callback(null, str + ' foo');
      });
      var foo = helpers.helper('foo');
      assert.equal(typeof foo, 'function');
      assert.equal(foo.async, true);
    });

    it('should get all helpers as object', function() {
      var helpers = new HelperCache();
      helpers.asyncHelper({
        foo: function(str, callback) {
          callback(null, str + ' foo');
        },
        bar: function(str, callback) {
          callback(null, str + ' bar');
        }
      });

      var obj = helpers.cache;
      assert.equal(typeof obj.foo, 'function');
      assert.equal(typeof obj.bar, 'function');
      assert.equal(obj.foo.async, true);
      assert.equal(obj.bar.async, true);
    });
  });
});
