'use strict';
const TaskKitTask = require('taskkit-task');
const fs = require('fs-extra');

class CleanTask extends TaskKitTask {
  get description() {
    return 'Cleans out the indicated directory';
  }

  process(input, filename, processDone) {
    fs.emptyDir(input, processDone);
  }
}

module.exports = CleanTask;
