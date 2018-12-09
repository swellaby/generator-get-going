'use strict';

import chai = require('chai');
import Sinon = require('sinon');

import scaffoldEngine = require('../../../generators/app/scaffold-engine');
import testUtils = require('../../test-utils');

const assert = chai.assert;

suite('scaffoldEngine Tests:', () => {
    const generator = testUtils.generatorStub;
    const expErrorMessage = testUtils.fatalErrorMessage;
    const scaffolders = testUtils.projectScaffolders;
    const config = testUtils.projectConfig;

    teardown(() => {
        Sinon.restore();
    });

    test('Should throw error when generator is null', () => {
        assert.throws(() => scaffoldEngine.scaffoldNewProject(null, null, config), expErrorMessage);
    });

    test('Should throw error when scaffolders list is null', () => {
        assert.throws(() => scaffoldEngine.scaffoldNewProject(null, generator, config), expErrorMessage);
    });

    test('Should throw error when scaffolders list is empty', () => {
        assert.throws(() => scaffoldEngine.scaffoldNewProject([], generator, config), expErrorMessage);
    });

    test('Should throw error when internal error occurs', () => {
        Sinon.stub(testUtils.secondScaffolder, 'scaffold').throws(new Error());
        assert.throws(() => scaffoldEngine.scaffoldNewProject(scaffolders, generator, config));
    });
});
