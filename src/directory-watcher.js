var fs = require('fs');

var directoryWatcher = {
    startListen: function(directoryPath) {
        if (fs.existsSync(directoryPath)) {
            var fsWatcher = fs.watch(directoryPath);
        }
    },
    stopListen: function(directoryPath) {
        fs.unwatchFile(directoryPath);
    }
};

module.exports.directoryWatcher = directoryWatcher;