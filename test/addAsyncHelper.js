/*!
 * helper-cache <https://github.com/jonschlinkert/helper-cache>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

'use strict';

var should = require('should');
var assert = require('assert');
var cache = require('..');

describe('add async helper', function () {
  it('should create instance of helper cache', function () {
    var actual = cache('foo');

    actual.should.be.an.object;
    actual.should.be.instanceof.cache;
    assert.equal(actual instanceof cache, true);
  });

  it('should set a helper by name', function () {
    var helpers = cache();
    helpers.addAsyncHelper('foo', function (str, callback) {
      callback(null, str + ' foo');
    });

    helpers.foo.should.be.a.function;
  });

  it('should add individual helpers to the cache.', function () {
    var helpers = cache();

    helpers.addAsyncHelper('a', function (str, callback) {
      callback(null, str);
    });

    helpers.addAsyncHelper('b', function (str, callback) {
      callback(null, str);
    });

    var keys = Object.keys(helpers);
    var asyncKeys = Object.keys(helpers._.asyncHelpers);
    keys.should.have.length(2);
    asyncKeys.should.have.length(2);
  });
  it('should set helpers from object', function () {
    var helpers = cache();
    helpers.addAsyncHelper({
      foo: function (str, callback) {
        callback(null, str + ' foo');
      },
      bar: function (str, callback) {
        callback(null, str + ' bar');
      }
    });

    helpers.foo.should.be.a.function;
    helpers.bar.should.be.a.function;
    helpers._.asyncHelpers.foo.should.be.a.function;
    helpers._.asyncHelpers.bar.should.be.a.function;

  });

  it('should get a helper by name', function () {
    var helpers = cache();
    helpers.addAsyncHelper('foo', function (str, callback) {
      callback(null, str + ' foo');
    });
    var foo = helpers.getHelper('foo');
    helpers.foo.should.be.a.function;
  });

  it('should get all helpers as object', function () {
    var helpers = cache();
    helpers.addAsyncHelper({
      foo: function (str, callback) {
        callback(null, str + ' foo');
      },
      bar: function (str, callback) {
        callback(null, str + ' bar');
      }
    });

    var obj = helpers.getHelper();
    helpers._.asyncHelpers.foo.should.be.a.function;
    helpers._.asyncHelpers.bar.should.be.a.function;

  });

});