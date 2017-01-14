'use strict';
const RunKitTask = require('runkit-task');
const async = require('async');
const fs = require('fs-extra');

class CleanTask extends RunKitTask {
  get description() {
    return 'Cleans out the indicated directory';
  }

  process(input, filename, processDone) {
    console.log('+')
    console.log(input)
    console.log(filename)
    fs.emptyDir(input, processDone);
  }
}

module.exports = CleanTask;
