'use strict';

const chai = require('chai');
// const expect = chai.expect;
chai.config.includeStack = true;
chai.should();

const bddStdIn = require('bdd-stdin');

const CompoundChooser = require('../../lib/compound-chooser');

describe('#askForCompound', function () {
  var compoundChooser;
  var promise;
  beforeEach(function () {
    compoundChooser = new CompoundChooser();
  });
  afterEach(function () {
    promise = null;
  });
  it('should be get "first" if the answer is "1"', function () {
    bddStdIn('1');
    promise = compoundChooser.askForCompound([ 'first', 'second' ]);
    promise
      .then((value) => {
        expect(value).to.be.a.string;
        value.should.be.equal('first');
      })
      .catch((err) => {
        console.log(err);
        expect(err).to.be.not.exist;
      });
  });
});
