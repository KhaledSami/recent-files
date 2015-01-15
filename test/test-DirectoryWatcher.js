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
        fs.watch.restore();
        done();
    });

    test('file Watcher won\'t listen to a non existed Directory or file', function(done) {
        var fsSpy = sinon.spy(fs, "watch");
        directoryWatcher.startListen('.test_files1');
        assert.equal(0, fsSpy.callCount);
        fs.watch.restore();
        done();
    });

    test('file Watcher will stop listen to a Directory', function(done) {
        var fsWatcher = directoryWatcher.startListen('.test_files');
        var fsSpy = sinon.spy(fsWatcher, "close");
        directoryWatcher.stopListen(fsWatcher);
        assert(fsSpy.called);
        fsWatcher.close.restore();
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