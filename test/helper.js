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

describe('helper', function() {
  describe('set', function() {
    it('should instantiate', function() {
      var app = new HelperCache();
      assert(app instanceof HelperCache);
    });

    it('should set a helper by name', function() {
      var app = new HelperCache();
      app.helper('foo', function(str) {
        return str + ' foo';
      });
      assert.equal(typeof app.cache.foo, 'function');
    });

    it('should add individual helpers to the cache.', function() {
      var app = new HelperCache();
      app.helper('a', function(str) {
        return str;
      });

      app.helper('b', function(str) {
        return str;
      });
      var keys = Object.keys(app.cache);
      assert.equal(keys.length, 2);
    });

    it('should get a helper by name', function() {
      var app = new HelperCache();
      app.helper('foo', function(str) {
        return str + ' foo';
      });
      var foo = app.helper('foo');
      assert.equal(typeof foo, 'function');
    });

    it('should get all helpers as object', function() {
      var app = new HelperCache();
      app.helpers({
        foo: function(str) {
          return str + ' foo';
        },
        bar: function(str) {
          return str + ' bar';
        }
      });

      assert.equal(typeof app.cache.foo, 'function');
      assert.equal(typeof app.cache.bar, 'function');
    });
  });

  describe('get:', function() {
    it('should get helpers from the cache.', function() {
      var app = new HelperCache();

      app.helper('a', function(str) {
        return str;
      });
      app.helper('b', function(str) {
        return str;
      });

      var keys = Object.keys(app.cache);
      assert.equal(keys.length, 2);
    });

    it('should get `load`ed helpers from the cache', function() {
      var app = new HelperCache();

      app.helpers({
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
      var a = app.helper('a');
      var b = app.helper('b');

      assert.equal(typeof a, 'function');
      assert.equal(typeof b, 'function');
    });
  });
});
