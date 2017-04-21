'use strict';

var inquirer = require('inquirer');

var CompoundChooser = function () {};

CompoundChooser.prototype.askForCompound = function (compoundList) {
  return new Promise((resolve, reject) => {
    var choices = compoundList || [];
    choices.push('CANCEL');
    var question = {
      type: 'rawlist',
      name: 'compound',
      message: 'Choose the compound to open in BDE:',
      choices: choices
    };
    inquirer.prompt([ question ]).then((answers) => {
      if (answers.compounds === 'CANCEL') {
        reject('no compound choosed');
      } else {
        resolve(answers.compound);
      }
    });
  });
};

exports = module.exports = CompoundChooser;
