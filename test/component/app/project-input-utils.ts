'use strict';

import chai = require('chai');
import Sinon = require('sinon');

import projectInputUtils = require('../../../generators/app/project-input-utils');
import testUtils = require('../../test-utils');
// foo 1544307744
// date 1544307744484

const assert = chai.assert;

suite('projectInputUtils Tests:', () => {
    const generator = testUtils.generatorStub;
    const expErrorMessage = testUtils.fatalErrorMessage;
    const inputs = testUtils.projectInputs;

    teardown(() => {
        Sinon.restore();
    });

    suite('addGeneratorOptions Tests:', () => {
        let generatorOptionStub: Sinon.SinonStub;

        setup(() => {
            generatorOptionStub = Sinon.stub(generator, 'option');
        });

        test('Should throw error when generator is null', () => {
            assert.throws(() => projectInputUtils.addGeneratorOptions(null, null), expErrorMessage);
        });

        test('Should throw error when inputs list is null', () => {
            assert.throws(() => projectInputUtils.addGeneratorOptions(generator, null), expErrorMessage);
        });

        test('Should throw error when inputs list is empty', () => {
            assert.throws(() => projectInputUtils.addGeneratorOptions(generator, []), expErrorMessage);
        });

        test('Should throw error when internal error occurs', () => {
            generatorOptionStub.throws(new Error());
            assert.throws(() => projectInputUtils.addGeneratorOptions(generator, testUtils.projectInputs));
        });
    });

    suite('getDesiredProjectConfig Tests:', () => {
        setup(() => {
            Sinon.stub(generator, 'prompt').callsFake(() => testUtils.defaultPromptAnswersCopy());
        });

        test('Should throw error when generator is null', async () => {
            try {
                await projectInputUtils.getDesiredProjectConfig(null, null);
                assert.isFalse(true);
            } catch (err) {
                assert.deepEqual(err.message, expErrorMessage);
            }
        });

        test('Should throw error when scaffolders list is null', async () => {
            try {
                await projectInputUtils.getDesiredProjectConfig(generator, null);
                assert.isFalse(true);
            } catch (err) {
                assert.deepEqual(err.message, expErrorMessage);
            }
        });

        test('Should throw error when scaffolders list is empty', async () => {
            try {
                await projectInputUtils.getDesiredProjectConfig(generator, []);
                assert.isFalse(true);
            } catch (err) {
                assert.deepEqual(err.message, expErrorMessage);
            }
        });

        test('Should throw error when internal error occurs', async () => {
            Sinon.stub(testUtils.secondInput, 'tryExtractInputValue').throws(new Error());
            try {
                await projectInputUtils.getDesiredProjectConfig(generator, inputs);
                assert.isFalse(true);
            } catch (err) {
                assert.deepEqual(err.message, expErrorMessage);
            }
        });
    });
});
