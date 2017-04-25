'use strict';

const http = require('http');

var portInUse = function (port) { // eslint-disable-line no-unused-vars
  return new Promise(function (resolve, reject) {
    var tester = http.createServer();
    tester.once('error', function (err) {
      if (err.code !== 'EADDRINUSE') {
        reject(err);
      }
      resolve(true);
    });
    tester.once('listening', function () {
      tester.close();
      resolve(false);
    });
    tester.listen(port, 'localhost');
  });
};

exports = module.exports = portInUse;
