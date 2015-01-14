'use strict';

var assert = require('assert');
var chai = require('chai');
var sinon = require('sinon');
var fs = require('fs');

var directoryWatcher = require('../src/directory-watcher.js').directoryWatcher;

suite('Directory Watcher', function() {

    setup(function() {
        if (!fs.existsSync('.test_files')) {
            fs.mkdirSync(".test_files");
            fs.writeFileSync(".test_files/a", "");
            fs.writeFileSync(".test_files/b", "");
            fs.writeFileSync(".test_files/c", "");
            fs.writeFileSync(".test_files/d", "");
            fs.writeFileSync(".test_files/e", "");
        }
    });

    test('file Watcher listen to a Directory', function(done) {
        var fsSpy = sinon.spy(fs, "watch");
        directoryWatcher.startListen('.test_files');
        assert(fsSpy.called);
        done();
    });

    teardown(function() {
        fs.unlinkSync(".test_files/a");
        fs.unlinkSync(".test_files/b");
        fs.unlinkSync(".test_files/c");
        fs.unlinkSync(".test_files/d");
        fs.unlinkSync(".test_files/e");
        fs.rmdirSync(".test_files");
    });
});