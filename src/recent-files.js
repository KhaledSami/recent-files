var RecentFilesHandler = function(maxLimit) {
    this.fileList = [];
    this.maxLimit = maxLimit || 6;
    this.dateFileMap = new Object();
}

RecentFilesHandler.prototype = {
    push: function(filePath) {
        if (this.fileList.indexOf(filePath) > -1) {
            this.fileList.splice(this.fileList.indexOf(filePath), 1);
        }
        if (this.fileList.length >= this.maxLimit) {
            this.fileList.splice(this.fileList.length - 1, 1);
        }
        this.fileList.unshift(filePath);
        this.dateFileMap[filePath] = this.getDate();
    },
    getDate: function() {
        return new Date();
    },
    printFiles: function() {
        var formattedArray = [];
        for (var i = 0; i < this.fileList.length; i++) {
            var fileName = this.fileList[i];
            var date = this.dateFileMap[fileName];
            formattedArray.push(formatDate(date) + ' - ' + fileName);
        }

        return formattedArray;
    }

}

function formatDate(date) {
    return date.getFullYear() + "-" + formatTwoDigits(date.getMonth() + 1) + "-" + formatTwoDigits(date.getDate()) + " " + formatTwoDigits(date.getHours()) + ":" + formatTwoDigits(date.getMinutes());
}

function formatTwoDigits(digit) {
    if (digit.toString().length < 2) return "0" + digit;
    else return digit;
}

module.exports.RecentFilesHandler = RecentFilesHandler;