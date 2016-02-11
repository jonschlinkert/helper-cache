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

describe('add helper', function() {
  it('should create instance of helper cache', function() {
    var actual = cache('foo');

    actual.should.be.an.object;
    actual.should.be.instanceof.cache;
    assert.equal(actual instanceof cache, true);
  });

  it('should add an object of helpers to the cache', function() {
    var helpers = cache();
    helpers.addHelpers({
      a: function() {},
      b: function() {},
      c: function() {},
    });

    helpers.a.should.be.a.function;
    helpers.b.should.be.a.function;
    helpers.c.should.be.a.function;
  });

  it('should add a namespaced object of helpers to the cache', function() {
    var helpers = cache();

    helpers.addHelpers({
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

    Object.keys(helpers.fn).should.have.length(4);
  });

  it('should bind thisArg when passed on the constructor options:', function() {
    var helpers = cache({bind: true, thisArg: {one: 1, two: 2}});

    helpers.addHelpers({
      fn: {
        a: function(str) {
          this.should.have.properties('one', 'two');
          return str;
        }
      }
    });

    helpers.fn.a();
  });

  it('should bind thisArg when passed as the last arg to the method:', function() {
    var helpers = cache({bind: true});

    helpers.addHelpers({
      fn: {
        a: function(str) {
          this.should.have.properties('one', 'two');
          return str;
        }
      }
    }, {one: 1, two: 2});

    helpers.fn.a();
  });

  describe('.addHelpers():', function() {
    it('should add an object of helper functions to the cache.', function() {
      var helpers = cache();

      helpers.addHelpers({
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

      Object.keys(helpers).should.have.length(4);
    });

    it('should load helpers from a function', function() {
      var helpers = cache();

      var fn = function() {
        return {
          foo: function() {
            return 'foo';
          },
          bar: function() {
            return 'bar';
          }
        };
      };
      var actual = helpers.addHelpers(fn);
      helpers.should.have.property('foo');
      helpers.should.have.property('bar');
    });
  });

  describe('.addHelpers()', function() {
    it('should load helpers from a function', function() {
      var helpers = cache();

      var fn = function() {
        return {
          foo: function() {
            return 'foo';
          },
          bar: function() {
            return 'bar';
          }
        };
      };
      var actual = helpers.addHelpers(fn);
      helpers.should.have.property('foo');
      helpers.should.have.property('bar');
    });

    it('should load helpers from an object', function() {
      var helpers = cache();

      var obj = require('./fixtures/wrapped/wrapped.js');
      var actual = helpers.addHelpers(obj);

      helpers.should.have.property('wrapped');
    });

    it('should load helpers from an object', function() {
      var helpers = cache();

      var obj = {
        foo: function() {
          return 'hi';
        }
      };
      var actual = helpers.addHelpers(obj);
      helpers.should.have.property('foo');
    });

    it('should load helpers from a function', function() {
      var helpers = cache();

      var fn = require('./fixtures/two.js');
      var actual = helpers.addHelpers({ 'two': fn });

      helpers.should.have.property('two');
    });
  });
});

describe('load functions:', function() {
  describe('.function():', function() {
    it('should load helpers from a function', function() {
      var helpers = cache();

      var fn = function() {
        return {
          foo: function() {
            return 'foo';
          },
          bar: function() {
            return 'bar';
          }
        };
      };

      var actual = helpers.addHelpers(fn);

      actual.should.have.property('foo');
      actual.should.have.property('bar');

      var foo = helpers.getHelper('foo');
      assert.equal(typeof foo, 'function');
    });
  });
});

