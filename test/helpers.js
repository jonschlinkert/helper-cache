'use strict';

var should = require('should');
var assert = require('assert');
var HelperCache = require('..');

describe('helpers', function() {
  describe('cache', function() {
    it('should create instance of helper cache', function() {
      var app = new HelperCache();

      assert(app);
      assert.equal(typeof app, 'object');
      assert(app instanceof HelperCache);
    });
  });

  describe('objects', function() {
    it('should register an object of helpers', function() {
      var app = new HelperCache();
      app.helpers({
        foo: function() {},
        bar: function() {}
      });

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

      assert.equal(typeof app.cache.foo, 'function');
      assert.equal(typeof app.cache.bar, 'function');
      assert.equal(typeof app.cache.a, 'function');
      assert.equal(typeof app.cache.b, 'function');
      assert.equal(typeof app.cache.c, 'function');
      assert.equal(typeof app.cache.d, 'function');
      assert.equal(Object.keys(app.cache).length, 6);
    });
  });

  describe('groups', function() {
    it('should add a namespaced object of helpers to the cache', function() {
      var app = new HelperCache();

      app.helpers({
        fn: {
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
        }
      });
      assert.equal(Object.keys(app.cache.fn).length, 4);
    });
  });
});

