'use strict';
const TaskKitTask = require('taskkit-task');
const fs = require('fs-extra');
const path = require('path');
class CleanTask extends TaskKitTask {
  get description() {
    return 'Cleans out the indicated directory';
  }
  // returns the module to load when running in a separate process:
  get classModule() {
    return path.join(__dirname, 'index.js');
  }

  process(input, filename, processDone) {
    fs.emptyDir(input, processDone);
  }
}

module.exports = CleanTask;
