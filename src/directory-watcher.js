var fs = require('fs');

var directoryWatcher = {
    startListen: function(directoryPath) {
        if (fs.existsSync(directoryPath)) {
            return fs.watch(directoryPath);
        }
    },
    stopListen: function(fsWatcher) {
        fsWatcher.close();
    },
    recordChanges: function(fsWatcher, recentFilesHandler, callback) {
        fsWatcher.on('change', function(event, filename) {
            if (filename) {
                recentFilesHandler.push(filename);
                callback();
            } else {
                throw new Error('filename not provided');
            }
        });
    }
};

module.exports.directoryWatcher = directoryWatcher;