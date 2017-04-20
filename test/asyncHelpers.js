/*!
 * helper-cache <https://github.com/jonschlinkert/helper-cache>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var should = require('should');
var assert = require('assert');
var HelperCache = require('..');

describe('async helpers', function() {
  describe('set', function() {
    it('should create instance of helper cache', function() {
      var actual = new HelperCache();
      assert(actual instanceof HelperCache);
    });

    it('should add an object of helpers to the cache', function() {
      var helpers = new HelperCache();
      helpers.asyncHelpers({
        a: function() {},
        b: function() {},
        c: function() {},
      });

      assert.equal(typeof helpers.cache.a, 'function');
      assert.equal(typeof helpers.cache.b, 'function');
      assert.equal(typeof helpers.cache.c, 'function');
      assert.equal(helpers.cache.a.async, true);
      assert.equal(helpers.cache.b.async, true);
      assert.equal(helpers.cache.c.async, true);
    });

    describe('.asyncHelpers():', function() {
      it('should add an object of helper functions to the cache.', function() {
        var helpers = new HelperCache();

        helpers.asyncHelpers({
          a: function(str) {
            return str;
          },
          b: function(str) {
            return str;
          },
          c: function(str) {
            return str;
          },
          d: function(str) {
            return str;
          }
        });

        var keys = Object.keys(helpers.cache);
        assert.equal(keys.length, 4);
      });
    });
  });

  describe('get', function() {
    describe('.asyncHelpers():', function() {
      it('should get helpers from the cache.', function() {
        var helpers = new HelperCache();

        helpers.asyncHelper('a', function(str, callback) {
          callback(null, str);
        });
        helpers.asyncHelper('b', function(str, callback) {
          callback(null, str);
        });

        var keys = Object.keys(helpers.cache).filter(function(key) {
          return helpers.cache[key].async;
        });

        keys.should.have.length(2);
      });

      it('should get `load`ed helpers from the cache', function() {
        var helpers = new HelperCache();

        helpers.asyncHelpers({
          a: function(str, callback) {
            callback(null, str);
          },
          b: function(str, callback) {
            callback(null, str);
          },
          c: function(str, callback) {
            callback(null, str);
          },
          d: function(str, callback) {
            callback(null, str);
          }
        });

        var a = helpers.asyncHelper('a');
        var b = helpers.asyncHelper('b');

        assert.equal(typeof a, 'function');
        assert.equal(typeof b, 'function');
        assert.equal(a.async, true);
        assert.equal(b.async, true);
      });
    });
  });
});
