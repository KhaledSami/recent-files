'use strict';

var assert = require('assert');
var chai = require('chai');
var sinon = require('sinon');

var RecentFilesHandler = require('../src/recent-files.js').RecentFilesHandler;

suite('Recent Files', function() {
    var recentFilesHandler;

    setup(function() {
        recentFilesHandler = new RecentFilesHandler(5);
    });

    test('Adding to empty list', function() {
        recentFilesHandler.push("file1.txt");
        assert.deepEqual(recentFilesHandler.fileList, ["file1.txt"]);
    });

    test('Adding to the top of a not empty not full list', function() {
        recentFilesHandler.push("file1.txt");
        recentFilesHandler.push("file2.txt");
        assert.deepEqual(recentFilesHandler.fileList, ["file2.txt", "file1.txt"]);
    });

    test('Adding already existing file to the list', function() {
        recentFilesHandler.push("file1.txt");
        recentFilesHandler.push("file2.txt");
        recentFilesHandler.push("file1.txt");
        assert.deepEqual(recentFilesHandler.fileList, ["file1.txt", "file2.txt"]);
    });

    test('Adding to a full list', function() {
        recentFilesHandler.fileList = ["file1.txt", "file2.txt", "file3.txt", "file4.txt", "file5.txt"];
        recentFilesHandler.push("file6.txt");
        assert.deepEqual(recentFilesHandler.fileList, ["file6.txt", "file1.txt", "file2.txt", "file3.txt", "file4.txt"]);
    });

    test('Store last access date', function() {
        recentFilesHandler.fileList = ["file1.txt", "file2.txt", "file3.txt", "file4.txt", "file5.txt"];
        var dateSpy = sinon.spy(recentFilesHandler, "getDate");
        recentFilesHandler.push("file6.txt");
        assert(dateSpy.called);
    });

    test('Retruns formatted strings', function() {
        var dateStub = sinon.stub(recentFilesHandler, "getDate");
        dateStub.onFirstCall().returns(new Date("2015-01-04 14:00"));
        dateStub.onSecondCall().returns(new Date("2015-01-01 12:20"));
        dateStub.onThirdCall().returns(new Date("2015-01-01 09:20"));
        recentFilesHandler.push("file1.txt");
        recentFilesHandler.push("file2.txt");
        recentFilesHandler.push("file3.txt");
        var formattedArray = recentFilesHandler.printFiles();
        assert.deepEqual(formattedArray, ["2015-01-01 09:20 - file3.txt", "2015-01-01 12:20 - file2.txt", "2015-01-04 14:00 - file1.txt"]);
    });

});