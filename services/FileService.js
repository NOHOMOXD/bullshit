const fs = require('fs');
class FileService {
    static getFileStats(filePath) {
        try {
         return fs.statSync(filePath); // Использование await для дожидания выполнения fs.stat
        } catch (err) {
          return false;
        }
      }
}

module.exports = FileService;