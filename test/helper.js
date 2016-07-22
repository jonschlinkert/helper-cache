/*!
 * helper-cache <https://github.com/jonschlinkert/helper-cache>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var should = require('should');
var assert = require('assert');
var Cache = require('..');

describe('add helper', function() {
  it('should create instance of helper cache', function() {
    var app = new Cache();

    app.should.be.an.object;
    assert(app instanceof Cache);
  });

  it('should set a helper by name', function() {
    var app = new Cache();
    app.helper('foo', function(str) {
      return str + ' foo';
    });
    assert.equal(typeof app.cache.foo, 'function');
  });

  it('should add individual helpers to the cache.', function() {
    var app = new Cache();
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
    var app = new Cache();
    app.helper('foo', function(str) {
      return str + ' foo';
    });
    var foo = app.helper('foo');
    assert.equal(typeof foo, 'function');
  });

  it('should get all helpers as object', function() {
    var app = new Cache();
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
