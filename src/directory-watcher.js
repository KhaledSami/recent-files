var fs = require('fs');

var directoryWatcher = {
    startListen: function(directoryPath) {
        var fsWatcher = fs.watch(directoryPath);
    }
};

module.exports.directoryWatcher = directoryWatcher;