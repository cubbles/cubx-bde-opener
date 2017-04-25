'use strict';

const chai = require('chai');
const expect = chai.expect;
chai.config.includeStack = true;
chai.should();

const path = require('path');
const ManifestReader = require('./../../lib/manifest-reader');

describe('manifest-reader', function () {
  var webpackagePath;
  before(function () {
    webpackagePath = path.join('test', 'webpackages', 'my-package');
  });
  describe('constructor', function () {
    it('the webpackagePath should be set as a property', function () {
      var manifestReader = new ManifestReader(webpackagePath);
      manifestReader.should.have.property('webpackagePath', webpackagePath);
    });
  });
  describe('#getManifest', function () {
    var manifestReader;
    var promise;
    beforeEach(function () {
      manifestReader = new ManifestReader(webpackagePath);
      promise = manifestReader.getManifest();
    });
    afterEach(function () {
      promise = null;
    });
    it('read manifest should success', function (done) {
      promise.then((value) => {
        console.log('value', value);
        expect(value).to.be.an('object');
      }).then(() => done(), error => done(error));
    });
    it('the manifest name property is "my-package"', function (done) {
      promise.then((value) => {
        console.log('value', value);
        value.should.have.property('name', 'my-package');
      }).then(() => done(), error => done(error));
    });
  });
});
