#!/usr/bin/env node

'use strict';

var minimist = require('minimist');
var CubxBdeOpener = require('../lib/cubx-bde-opener');

var argv = minimist(process.argv.slice(2));

if (argv.h || argv.help) {
  help();
  process.exit();
}

var port = argv.p || argv.port || '8282';
var bdeUrl = argv.u || argv.url || 'https://www.cubbles.world/bde/bde@2.0.0';
var rootPath = argv._[0];

if (!rootPath) {
  console.error('Argument path missed. The path of the webpackage is a required argument.');
  help();
  process.exit();
}

var cubxBdeOpener = new CubxBdeOpener(port, bdeUrl, rootPath);
cubxBdeOpener.process();

function help () {
  console.log([
    'usage: cubx-bde-opener path [options]',
    '',
    'path:  the path of the webpackage',
    'options:',
    '  -p --port      Port of the http-server',
    '  -u --url       URL of the BDE'
  ].join('\n'));
}
