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
var _ = require('lodash');


describe('resolve async helpers - nested', function () {
  describe('.resolve():', function () {
    it('should resolve async helpers in a string.', function (done) {
      var helper = cache();

      var partials = {
        foo: {
          data: { 'bar': 'baz' },
          content: 'Hi there <%= bar %>'
        },
        bar: {
          data: { 'baz': 'bang' },
          content: 'This is <%= baz %>'
        }
      };

      function render (content, options, cb) {
        content = _.template(content, options, { imports: helper.getHelper() });
        return helper.resolve(content, function (err, content) {
          if (err) return cb(err);
          return cb(null, content);
        });
      }

      helper.addHelperAsync('lower', function (str, callback) {
        callback(null, str.toLowerCase());
      });
      helper.addHelperAsync('upper', function (str, callback) {
        callback(null, str.toUpperCase());
      });
      helper.addHelperAsync('sleep', function (ms, msg, callback) {
        var start = new Date();
        setTimeout(function () {
          var end = new Date();
          var elapsed = end - start;
          callback(null, elapsed + ' ' + msg);
        }, ms);
      });

      helper.addHelperAsync('partial', function (name, locals, callback) {
        var partial = partials[name];
        if (!partial) return callback(null, '');
        if (typeof locals === 'function') {
          callback = locals;
          locals = {};
        }
        render(partial.content, _.extend({}, partial.data, locals), callback);
      });

      var template = [
        'Elapsed: <%= sleep(50, "milliseconds") %>',
        'Lower: <%= lower(name) %>',
        'Upper: <%= upper(name) %>',
        'Partial-1: <%= partial("foo") %>',
        'Partial-2: <%= partial("bar", { baz: "beep boop bop" }) %>'
      ].join('\n');

      var content = render(template, {name: 'Brian Woodward'}, function (err, content) {
        if (err) return done(err);
        // /Elapsed: 51/.test(content).should.be.true;
        /Lower: brian woodward/.test(content).should.be.true;
        /Upper: BRIAN WOODWARD/.test(content).should.be.true;
        /Partial-1: Hi there baz/.test(content).should.be.true;
        /Partial-2: This is beep boop bop/.test(content).should.be.true;
        done();
      });

    });

  });
});