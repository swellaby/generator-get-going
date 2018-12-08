'use strict';

import chai = require('chai');
import helpers = require('yeoman-test');
import Sinon = require('sinon');

import intTestUtils = require('../int-test-utils');
import projectInputUtils = require('../../../generators/app/project-input-utils');
import scaffoldEngine = require('../../../generators/app/scaffold-engine');
import testUtils = require('../../test-utils');

const assert = chai.assert;

suite('app Tests:', () => {
    const prompts = testUtils.defaultPromptAnswersCopy();

    setup(() => {
        intTestUtils.createGitInitStub();
    });

    teardown(() => {
        Sinon.restore();
    });

    test('Should handle error with no inner message', async () => {
        Sinon.stub(projectInputUtils, 'getDesiredProjectConfig').throws(new Error());
        await helpers.run(intTestUtils.generatorRoot).withPrompts(prompts).toPromise();
    });

    test('Should have error path for empty project input list on option add', async () => {
        try {
            await projectInputUtils.addGeneratorOptions(null, null);
            assert.isFalse(true);
        } catch (err) {
            assert.deepEqual(err.message, testUtils.fatalErrorMessage);
        }
    });

    test('Should have error path for empty project input list on project config', async () => {
        try {
            await projectInputUtils.getDesiredProjectConfig(null, null);
            assert.isFalse(true);
        } catch (err) {
            assert.deepEqual(err.message, testUtils.fatalErrorMessage);
        }
    });

    test('Should have error path for unexpected error during config extraction', async () => {
        Sinon.stub(testUtils.firstInput, 'tryExtractInputValue').callsFake(() => { throw new Error(); });

        try {
            await projectInputUtils.getDesiredProjectConfig(testUtils.generatorStub, testUtils.projectInputs);
            assert.isFalse(true);
        } catch (err) {
            assert.deepEqual(err.message, testUtils.fatalErrorMessage);
        }
    });

    test('Should not prompt when all options are specified', async () => {
        Sinon.stub(testUtils.firstInput, 'tryExtractInputValue').callsFake(() => true);
        Sinon.stub(testUtils.secondInput, 'tryExtractInputValue').callsFake(() => true);
        await projectInputUtils.getDesiredProjectConfig(testUtils.generatorStub, testUtils.projectInputs);
    });

    test('Should have error path for empty scaffolder list', async () => {
        try {
            await scaffoldEngine.scaffoldNewProject([], null, null);
            assert.isFalse(true);
        } catch (err) {
            assert.deepEqual(err.message, testUtils.fatalErrorMessage);
        }
    });
});
