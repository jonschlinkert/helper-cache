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
  it('should helper cache', function () {
    var actual = helperCache('foo');
    assert(actual);
  });
});