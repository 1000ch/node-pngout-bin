/*global afterEach, beforeEach, describe, it */
'use strict';

var assert = require('assert');
var binCheck = require('bin-check');
var execFile = require('child_process').execFile;
var fs = require('fs');
var path = require('path');
var rm = require('rimraf');

describe('advpng()', function () {
  afterEach(function (cb) {
    rm(path.join(__dirname, 'tmp'), cb);
  });

  beforeEach(function () {
    fs.mkdirSync(path.join(__dirname, 'tmp'));
  });

  it('should return path to binary and verify that it is working', function (cb) {
    var binPath = require('../').path;
    var args = [
      path.join(__dirname, 'fixtures/test.png'),
      path.join(__dirname, 'tmp/test.png'),
      '-s0'
    ];

    binCheck(binPath, args, function (err, works) {
      cb(assert.equal(works, true));
    });
  });

  it('should minify a PNG', function (cb) {
    var binPath = require('../').path;
    var args = [
      path.join(__dirname, 'fixtures/test.png'),
      path.join(__dirname, 'tmp/test.png'),
      '-s0'
    ];

    execFile(binPath, args, function () {
      var src = fs.statSync(path.join(__dirname, 'fixtures/test.png')).size;
      var dest = fs.statSync(path.join(__dirname, 'tmp/test.png')).size;

      cb(assert(dest < src));
    });
  });
});