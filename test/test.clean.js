const async = require('async');
const test = require('tape');
const path = require('path');
const fs = require('fs');
const CleanTask = require('../index.js');

const fixtureDir = path.join(__dirname, 'fixtureDirectory');

test('can clean a directory', (t) => {
  t.plan(3);
  async.autoInject({
    createFixtureDir(done) {
      if (!fs.existsSync(fixtureDir)) {
        fs.mkdir(fixtureDir, done);
        return;
      }
      done();
    },
    fillDir(createFixtureDir, done) {
      fs.writeFile(path.join(fixtureDir, 'temp1.txt'), 'not a thing really', (err) => {
        if (err) {
          throw err;
        }
        fs.mkdir(path.join(fixtureDir, 'subDir'), (err2) => {
          if (err2) {
            throw err2;
          }
          fs.writeFile(path.join(fixtureDir, 'subDir', 'temp2.txt'), 'also not really a thing', done);
        });
      });
    },
    emptyIt(fillDir, done) {
      const task = new CleanTask('clean', { files: [fixtureDir] }, {});
      task.execute(done);
    },
    verifyEmpty(emptyIt, done) {
      fs.exists(path.join(fixtureDir, 'subDir'), (exists) => {
        t.equal(exists, false);
      });
      fs.exists(path.join(fixtureDir, 'subDir', 'temp2.txt'), (exists) => {
        t.equal(exists, false);
      });
      fs.exists(path.join(fixtureDir, 'temp1.txt'), (exists) => {
        t.equal(exists, false);
      });
    }
  }, (err) => {
    t.equal(err, null, 'no errors');
  });
});
