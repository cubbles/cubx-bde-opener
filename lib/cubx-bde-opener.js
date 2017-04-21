'use strict';

var portInUse = require('./port-checker');
var ManifestReader = require('./manifest-reader');
var CompoundChooser = require('./compound-chooser');
var opener = require('opener');

var CubxBDEOpener = function (port, bdeUrl, path) {
  this.port = port;
  this.bdeUrl = bdeUrl;
  this.path = path;
};

CubxBDEOpener.prototype.process = function () {
  var manifestReader = new ManifestReader(this.path);
  manifestReader.getManifest().then((manifestObj) => {
    this._openUrl(manifestObj);
  }).catch((err) => {
    console.error(err);
    process.exit(1);
  });
};

CubxBDEOpener.prototype._openUrl = function (manifestObj) {
  var promises = [];
  // Check if http server run
  var promisePortChecker = portInUse(this.port);
  promises.push(promisePortChecker);
  // Choose compound
  var compoundChooser = new CompoundChooser(this.path);
  var compoundList = [];
  manifestObj.artifacts.compoundComponents.forEach((item) => {
    compoundList.push(item.artifactId);
  });
  promises.push(compoundChooser.askForCompound(compoundList));

  Promise.all(promises)
    .then(values => {
      var portInUse = values[ 0 ];
      if (portInUse) {
        //             localhost with port               virtual store     webpackageId +                             artifactId
        var urlParam = 'https://localhost:' + this.port + '/localstore/' + this._getWebpackageId(manifestObj) + '/' + values[ 1 ];
        var url = this.bdeUrl + '?url=' + urlParam;
        opener(url);
      } else {
        process.exit(1);
      }
      // TODO open the BDE
    })
    .catch((err) => {
      console.error('Process end with error', err);
      process.exit(1);
    });
};
CubxBDEOpener.prototype._getWebpackageId = function (manifestObj) {
  var webpackageId = manifestObj.name + '@' + manifestObj.version;
  if (manifestObj.groupId && manifestObj.groupId.length > 0) {
    webpackageId = manifestObj.groupId + '.' + webpackageId;
  }
  return webpackageId;
};
exports = module.exports = CubxBDEOpener;
