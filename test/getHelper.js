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


describe('get helpers', function () {
  describe('.getHelper():', function () {
    it('should get helpers from the cache.', function () {
      var helper = cache();

      helper.addHelper('a', function (str) {
        return str;
      });
      helper.addHelper('b', function (str) {
        return str;
      });

      var keys = Object.keys(helper);
      keys.should.have.length(2);
    });

    it('should get `load`ed helpers from the cache', function () {
      var helper = cache();

      helper.addHelpers({
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
      var a = helper.getHelper('a');
      var b = helper.getHelper('b');

      assert.equal(typeof a, 'function');
      assert.equal(typeof b, 'function');
    });
  });
});