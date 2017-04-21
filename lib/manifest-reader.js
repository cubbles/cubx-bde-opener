'use strict';

var fs = require('fs-extra');
var path = require('path');

var ManifestReader = function (webpackagePath) {
  this.webpackagePath = webpackagePath;
}

ManifestReader.prototype.getManifest = function () {
  return new Promise((resolve, reject) => {
    var webpackagePath = path.join(this.webpackagePath, 'manifest.webpackage');
    fs.readJson(webpackagePath, (err, packageObj) => {
      if (err) {
        reject(err);
      }
      resolve(packageObj);
    });
  });
};
exports = module.exports = ManifestReader;
