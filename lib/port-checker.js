'use strict';

var portastic = require('portastic');
// var net = require('net');

var portInUse = function (port) { // eslint-disable-line no-unused-vars
  return new Promise(function (resolve, reject) {
    portastic.test(port).then((isOpen) => {
      resolve(isOpen);
    }).catch(err => {
      reject(err);
    });
  });
};

exports = module.exports = portInUse;
