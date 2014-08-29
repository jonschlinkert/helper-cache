/*!
 * helper-cache <https://github.com/jonschlinkert/helper-cache>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

'use strict';

var assert = require('assert');
var helperCache = require('../');

describe('helperCache', function () {
  it('should create instance of helper cache', function () {
    var actual = helperCache('foo');
    assert(actual);
  });

  it('should set a helper by name', function () {
    var helpers = helperCache();
    helpers.set('foo', function (str) {
      return str + ' foo';
    });
    assert(helpers.foo);
  });

  it('should set helpers from object', function () {
    var helpers = helperCache();
    helpers.set({
      foo: function (str) {
        return str + ' foo';
      },
      bar: function (str) {
        return str + ' bar';
      }
    });
    assert(helpers.foo);
    assert(helpers.bar);
  });

  it('should get a helper by name', function () {
    var helpers = helperCache();
    helpers.set('foo', function (str) {
      return str + ' foo';
    });
    var foo = helpers.get('foo');
    assert(foo);
  });

  it('should get all helpers as object', function () {
    var helpers = helperCache();
    helpers.set({
      foo: function (str) {
        return str + ' foo';
      },
      bar: function (str) {
        return str + ' bar';
      }
    });

    var obj = helpers.get();
    assert(obj.foo);
    assert(obj.bar);
  });

});