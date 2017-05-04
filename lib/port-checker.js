'use strict';

const http = require('http');

var portInUse = function (port) { // eslint-disable-line no-unused-vars
  var promises = [];
  promises.push(new Promise(function (resolve, reject) {
    var httpTester = http.createServer();
    httpTester.once('error', function (err) {
      if (err.code !== 'EADDRINUSE') {
        reject(err);
      }
      resolve(true);
    });
    httpTester.once('listening', function () {
      httpTester.close();
      // tester.listen(port, '0.0.0.0');
      resolve(false);
    });
    httpTester.listen(port, 'localhost');
  }));
  promises.push(new Promise(function (resolve, reject) {
    var httpTester2 = http.createServer();
    httpTester2.once('error', function (err) {
      if (err.code !== 'EADDRINUSE') {
        reject(err);
      }
      resolve(true);
    });
    httpTester2.once('listening', function () {
      httpTester2.close();
      resolve(false);
    });
    httpTester2.listen(port, '0.0.0.0');
  }));
  return new Promise(function (resolve, reject) {
    Promise.all(promises).then((values) => {
      var portInUse = false;
      values.forEach((value) => {
        portInUse = portInUse || value;
      });
      resolve(portInUse);
    });
  });

};

exports = module.exports = portInUse;
