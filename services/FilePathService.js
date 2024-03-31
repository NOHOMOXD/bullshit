const path   = require('path')
class FilePathService {
    static getFrontPath() {
      return path.join(process.cwd(), 'public', 'front');
    }
}

module.exports = FilePathService;