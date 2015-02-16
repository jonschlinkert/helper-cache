/*!
 * helper-cache <https://github.com/jonschlinkert/helper-cache>
 *
 * Copyright (c) 2014-2015 Jon Schlinkert
 * Licensed under the MIT License
 */

'use strict';

var should = require('should');
var assert = require('assert');
var cache = require('..');
var LoaderCache = require('loader-cache');
var loader = require('./utils/loader');

var loaderCache = new LoaderCache();
loaderCache.register('helpers', loader);

var load = function (helpers) {
  var options = {
    matchLoader: function () {
      return 'helpers';
    }
  };
  return loaderCache.load(helpers, options);
};

describe('add helper with loader', function () {

  it('should set helpers from object', function () {
    var helpers = cache();
    helpers.addHelper(load({
      foo: function (str) {
        return str + ' foo';
      },
      bar: function (str) {
        return str + ' bar';
      }
    }));

    helpers.foo.should.be.a.function;
    helpers.bar.should.be.a.function;
  });

  it('should set helpers from a glob pattern', function () {
    var helpers = cache();
    helpers.addHelper(load(['test/fixtures/*.js']));
    helpers.one.should.be.a.function;
    helpers.two.should.be.a.function;
    helpers.three.should.be.a.function;
  });

  it('should get all helpers as object', function () {
    var helpers = cache();
    helpers.addHelper(load({
      foo: function (str) {
        return str + ' foo';
      },
      bar: function (str) {
        return str + ' bar';
      }
    }));

    var obj = helpers.getHelper();
    helpers.foo.should.be.a.function;
    helpers.bar.should.be.a.function;
  });

});
