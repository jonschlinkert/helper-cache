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

      helper.addHelperAsync('lower', function (str, callback) {
        callback(null, str.toLowerCase());
      });
      helper.addHelperAsync('upper', function (str, callback) {
        callback(null, str.toUpperCase());
      });
      helper.addHelperAsync('sleep', function (ms, callback) {
        var start = new Date();
        setTimeout(function () {
          var end = new Date();
          var elapsed = end - start;
          callback(null, elapsed);
        }, ms);
      });

      var template = [
        'Elapsed: <%= sleep(50) %>',
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

  });
});