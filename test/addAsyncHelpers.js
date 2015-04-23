/*!
 * helper-cache <https://github.com/jonschlinkert/helper-cache>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var should = require('should');
var assert = require('assert');
var cache = require('..');

describe('add async helpers', function () {
  it('should create instance of helper cache', function () {
    var actual = cache();

    actual.should.be.an.object;
    actual.should.be.instanceof.cache;
    assert.equal(actual instanceof cache, true);
  });

  it('should add an object of helpers to the cache', function () {
    var helpers = cache();
    helpers.addAsyncHelpers({
      a: function() {},
      b: function() {},
      c: function() {},
    });

    helpers.a.should.be.a.function;
    helpers.b.should.be.a.function;
    helpers.c.should.be.a.function;
    helpers.a.async.should.be.true;
    helpers.b.async.should.be.true;
    helpers.c.async.should.be.true;
  });

  describe('.addAsyncHelpers():', function () {
    it('should add an object of helper functions to the cache.', function () {
      var helpers = cache();

      helpers.addAsyncHelpers({
        a: function (str) {
          return str;
        },
        b: function (str) {
          return str;
        },
        c: function (str) {
          return str;
        },
        d: function (str) {
          return str;
        }
      });

      var keys = Object.keys(helpers);
      keys.should.have.length(4);
    });

    it('should load helpers from a function', function () {
      var helpers = cache();

      var fn = function () {
        return {
          foo: function () {
            return 'foo';
          },
          bar: function () {
            return 'bar';
          }
        };
      };
      var actual = helpers.addAsyncHelpers(fn);
      helpers.should.have.property('foo');
      helpers.should.have.property('bar');
      helpers.foo.async.should.be.true;
      helpers.bar.async.should.be.true;
    });
  });
});
