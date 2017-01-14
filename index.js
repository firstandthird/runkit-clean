'use strict';
const RunKitTask = require('runkit-task');
const path = require('path');
const async = require('async');
const fs = require('fs-extra');

class CleanTask extends RunKitTask {
  get description() {
    return 'Cleans out the indicated directory';
  }

  // save the filename:hashname map to file:
  execute(allDone) {
    const dirsToClean = Array.isArray(this.options.directories) ? this.options.directories : [this.options.directories];
    async.each(dirsToClean, (directory, done) => {
      fs.emptyDir(directory, done);
    }, allDone);
  }
}

module.exports = CleanTask;
