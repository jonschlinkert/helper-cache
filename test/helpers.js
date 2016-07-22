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

    assert(app);
    assert.equal(typeof app, 'object');
    assert(app instanceof Cache);
  });

  it('should add helpers', function() {
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

  it('should add an object of helpers to the cache', function() {
    var app = new Cache();
    app.helpers({
      a: function() {},
      b: function() {},
      c: function() {},
    });

    assert.equal(typeof app.cache.a, 'function');
    assert.equal(typeof app.cache.b, 'function');
    assert.equal(typeof app.cache.c, 'function');
  });

  it('should add a namespaced object of helpers to the cache', function() {
    var app = new Cache();

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

  it.skip('should bind thisArg when passed on the constructor options:', function() {
    var app = new Cache({bind: true, thisArg: {one: 1, two: 2}});

    app.helpers({
      fn: {
        a: function(str) {
          this.should.have.properties('one', 'two');
          return str;
        }
      }
    });

    app.cache.fn.a();
  });

  it.skip('should bind thisArg when passed as the last arg to the method:', function() {
    var app = new Cache({bind: true});

    app.helpers({
      fn: {
        a: function(str) {
          this.should.have.properties('one', 'two');
          return str;
        }
      }
    }, {one: 1, two: 2});

    app.cache.fn.a();
  });

  describe('.helpers():', function() {
    it('should add an object of helper functions to the cache.', function() {
      var app = new Cache();

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

      assert.equal(Object.keys(app.cache).length, 4);
    });

    it('should load helpers from a function', function() {
      var app = new Cache();

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

      var actual = app.helpers(fn);
      assert(app.cache.hasOwnProperty('foo'));
      assert(app.cache.hasOwnProperty('bar'));
    });
  });

  describe('.helpers()', function() {
    it('should load helpers from a function', function() {
      var app = new Cache();

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

      var actual = app.helpers(fn);
      assert(app.cache.hasOwnProperty('foo'));
      assert(app.cache.hasOwnProperty('bar'));
    });

    it('should load helpers from an object', function() {
      var app = new Cache();

      var obj = require('./fixtures/wrapped/wrapped.js');
      app.helpers(obj);

      assert(app.cache.hasOwnProperty('wrapped'));
    });

    it('should load helpers from an object', function() {
      var app = new Cache();

      var obj = {
        foo: function() {
          return 'hi';
        }
      };
      app.helpers(obj);
      assert(app.cache.hasOwnProperty('foo'));
    });

    it('should load helpers from a function', function() {
      var app = new Cache();

      var fn = require('./fixtures/two.js');
      app.helpers({ 'two': fn });

      assert(app.cache.hasOwnProperty('two'));
    });
  });
});

describe('load functions:', function() {
  describe('.function():', function() {
    it('should load helpers from a function', function() {
      var app = new Cache();

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

      app.helpers(fn);

      app.cache.should.have.property('foo');
      app.cache.should.have.property('bar');

      var foo = app.helper('foo');
      assert.equal(typeof foo, 'function');
    });
  });
});

