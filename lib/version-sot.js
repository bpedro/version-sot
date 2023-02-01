const fs = require('fs');
const path = require('path');

module.exports = {
  version: undefined,

  getFrom: (sotFileName) => {
    switch (path.extname(sotFileName)) {
      case '.json':
        try {
          const doc = JSON.parse(fs.readFileSync(sotFileName, 'utf-8'));
          return doc.version || doc.info.version || undefined;
        } catch (Error) {
          return undefined;
        }
      case '.yaml':
      default:
        return undefined;
    }
  },

  pushTo: (destinationFileName, version) => {
    switch (path.extname(destinationFileName)) {
      case '.json':
        try {
          const doc = JSON.parse(fs.readFileSync(destinationFileName, 'utf-8'));
          doc.version && (doc.version = version) ||
          doc.info.version && (doc.info.version = version);
          fs.writeFileSync(destinationFileName, JSON.stringify(doc, null, 2));
          return version;
        } catch (Error) {
          return false;
        }
      case '.yaml':
      default:
        return false;
    }
  }
}