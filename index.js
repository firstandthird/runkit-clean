'use strict';
const RunKitTask = require('runkit-task');
const fs = require('fs-extra');

class CleanTask extends RunKitTask {
  get description() {
    return 'Cleans out the indicated directory';
  }

  process(input, filename, processDone) {
    fs.emptyDir(input, processDone);
  }
}

module.exports = CleanTask;
