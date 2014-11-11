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


describe('resolve async helpers', function () {
  describe('.resolve():', function () {
    it('should resolve async helpers in a string.', function (done) {
      var helper = cache();

      helper.addAsyncHelper('lower', function (str, callback) {
        callback(null, str.toLowerCase());
      });
      helper.addAsyncHelper('upper', function (str, callback) {
        callback(null, str.toUpperCase());
      });
      helper.addAsyncHelper('sleep', function (ms, msg, callback) {
        var start = new Date();
        setTimeout(function () {
          var end = new Date();
          var elapsed = end - start;
          callback(null, elapsed + ' ' + msg);
        }, ms);
      });

      var template = [
        'Elapsed: <%= sleep(50, "milliseconds") %>',
        'Lower: <%= lower(name) %>',
        'Upper: <%= upper(name) %>'
      ].join('\n');

      var content = _.template(template, {name: 'Brian Woodward'}, { imports: helper.getHelper() });
      helper.resolve(content, function (err, content) {
        if (err) return done(err);
        // /Elapsed: 51/.test(content).should.be.true;
        /Lower: brian woodward/.test(content).should.be.true;
        /Upper: BRIAN WOODWARD/.test(content).should.be.true;
        done();
      });
    });

    it('should handle an error.', function (done) {
      var helper = cache();

      helper.addAsyncHelper('lower', function (str, callback) {
        callback(null, str.toLowerCase());
      });
      helper.addAsyncHelper('upper', function (str, callback) {
        callback(null, str.toUpperCase());
      });
      helper.addAsyncHelper('error', function (ms, msg, callback) {
        var start = new Date();
        setTimeout(function () {
          var end = new Date();
          var elapsed = end - start;
          callback(new Error('Something bad happened'));
        }, ms);
      });

      var template = [
        'Elapsed: <%= error(50, "milliseconds") %>',
        'Lower: <%= lower(name) %>',
        'Upper: <%= upper(name) %>'
      ].join('\n');

      var content = _.template(template, {name: 'Brian Woodward'}, { imports: helper.getHelper() });
      helper.resolve(content, function (err, content) {
        if (err) return done();
        done(new Error('Expected an error to be thrown.'));
      });
    });

  });
});