'use strict';

var assert = require('assert');
var chai = require('chai');
var sinon = require('sinon');
var fs = require('fs');

var directoryWatcher = require('../src/directory-watcher.js').directoryWatcher;
var RecentFilesHandler = require('../src/recent-files.js').RecentFilesHandler;

suite('Integration between DirectoryWatcher and RecentFilesHandler', function() {
    test('file Watcher will record changes on watched Directory', function(done) {

        var recentFilesHandler = new RecentFilesHandler(3);

        fs.mkdirSync(".testFiles");

        var watcher = directoryWatcher.startListen('.testFiles', recentFilesHandler);

        fs.writeFileSync(".testFiles/a", "abc");
        fs.writeFileSync(".testFiles/b", "");
        fs.writeFileSync(".testFiles/c", "");

        directoryWatcher.recordChanges(watcher, recentFilesHandler, function() {
            if (recentFilesHandler.fileList.length === 3) {
                assert.deepEqual(['c', 'b', 'a'], recentFilesHandler.fileList);
                directoryWatcher.stopListen(watcher);
                done();
            }
        });
    });

    teardown(function() {
        fs.unlinkSync(".testFiles/a");
        fs.unlinkSync('.testFiles/b');
        fs.unlinkSync('.testFiles/c');
        fs.rmdirSync(".testFiles");
    });
});