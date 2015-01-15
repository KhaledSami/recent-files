var directoryWatcher = require('./src/directory-watcher.js').directoryWatcher;
var RecentFilesHandler = require('./src/recent-files.js').RecentFilesHandler;
var fs = require('fs');


var directoryPath = process.argv[2];

if (directoryPath === undefined) {
    console.log('ERROR! Parameter missing [ Directory path to watch ]');
    return;
}

if (!fs.existsSync(directoryPath)) {
    console.log('ERROR! Invalid Directory Path');
    return;
}

console.log("Now Recent Files List is watching : [ " + directoryPath + " ]");

var recentFilesHandler = new RecentFilesHandler();
var fsWatcher = directoryWatcher.startListen(directoryPath);
directoryWatcher.recordChanges(fsWatcher, recentFilesHandler, function() {
    console.log("\nRecent Files : ");
    console.log(recentFilesHandler.fileList);
});