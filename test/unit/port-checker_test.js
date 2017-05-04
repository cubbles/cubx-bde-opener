'use strict';

const chai = require('chai');
const expect = chai.expect;
chai.config.includeStack = true;
// const should = chai.should();
const portinUse = require('../../lib/port-checker');
const path = require('path');
const fs = require('fs');
const http = require('http');
var tls = require('tls');

// Check if port in use manually: netstat -ano | findstr 8282

function createHttpsServer () {
  var privateKeyPath = path.join('test', 'etc', 'localhostKey.pem');
  console.log('privateKeyPath', privateKeyPath);
  var privateKey = fs.readFileSync(privateKeyPath).toString();
  var certKeyPath = path.join('test', 'etc', 'localhostCert.pem');
  console.log('certKeyPath', certKeyPath);
  var certificate = fs.readFileSync(certKeyPath).toString();
  var options = {
    key: privateKey,
    cert: certificate
  };

  return tls.createServer(options, function (s) {
    s.write('welcome!\n');
    s.pipe(s);
  });
}

function createHttpServer () {
  return http.createServer(function (s) {
    s.write('welcome!\n');
    s.pipe(s);
  });
}

describe('port-checker:', function () {
  var port;
  before(function () {
    port = 8282;
  });

  describe('No server runs on port 8282,', function () {
    var promise;
    beforeEach(function () {
      promise = portinUse(port);
    });
    afterEach(function () {
      promise = null;
    });
    it('the port 8282 is not in usage', function (done) {
      promise
        .then((value) => {
          console.log('value', value);
          expect(value).to.be.false;
        }).then(() => done(), error => done(error));
    });
  });

  describe('http server on localhost and port 8282', function () {
    var server;
    var promise;
    before(function (done) {
      server = createHttpServer((req, res) => {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Hello, world!\n');
      });
      server.listen(port, 'localhost');
      server.on('listening', () => {
        console.log('http server started');
        done();
      });
    });
    after(function () {
      server.close();
      console.log('http server stopped');
    });
    beforeEach(function () {
      promise = portinUse(port);
    });
    afterEach(function () {
      promise = null;
    });
    it('the port 8282 is in usage', function (done) {
      promise
        .then((value) => {
          expect(value).to.be.true;
        }).then(() => done(), error => done(error));
    });
  });
  describe('http server on "0.0.0.0" and port 8282', function () {
    var server;
    var promise;
    before(function (done) {
      server = createHttpServer((req, res) => {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Hello, world!\n');
      });
      server.listen(port, '0.0.0.0');
      server.on('listening', () => {
        console.log('http server started');
        done();
      });
    });
    after(function () {
      server.close();
      console.log('http server stopped');
    });
    beforeEach(function () {
      promise = portinUse(port);
    });
    afterEach(function () {
      promise = null;
    });
    it('the port 8282 is in usage', function (done) {
      promise
        .then((value) => {
          expect(value).to.be.true;
        }).then(() => done(), error => done(error));
    });
  });
  describe('https server on "0.0.0.0" port 8282', function () {
    var server;
    var promise;
    before(function (done) {
      server = createHttpsServer((req, res) => {
        console.log(req.url);
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Hello, world!\n');
      });
      server.listen(port, '0.0.0.0');
      server.on('listening', () => {
        console.log('https server started');
        done();
      });
    });
    after(function () {
      server.close();
      console.log('https server stopped');
    });
    beforeEach(function () {
      promise = portinUse(port);
    });
    afterEach(function () {
      promise = null;
    });
    it('the port 8282 is in usage', function (done) {
      promise.then((value) => {
        expect(value).to.be.true;
      }).then(() => done(), error => done(error));
    });
  });
});
