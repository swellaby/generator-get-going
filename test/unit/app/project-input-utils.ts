'use strict';

import Chai = require('chai');
import Sinon = require('sinon');
import YeomanGenerator = require('yeoman-generator');

import projectInputUtils = require('../../../generators/app/project-input-utils');
import testUtils = require('../../test-utils');

const assert = Chai.assert;

suite('projectInputUtils Tests:', () => {
    const errMessage = 'Something awful happened! Please open an issue on GitHub';
    const generatorStub: YeomanGenerator = testUtils.generatorStub;
    const projectInputs = testUtils.projectInputs;
    const firstInput = testUtils.firstInput;
    const secondInput = testUtils.secondInput;

    suite('addGeneratorOptions Tests:', () => {
        let generatorOptionStub: Sinon.SinonStub;

        setup(() => {
            generatorOptionStub = Sinon.stub(generatorStub, 'option');
        });

        teardown(() => {
            Sinon.restore();
        });

        test('Should throw correct error when generator is null and settings is null', () => {
            assert.throws(() => projectInputUtils.addGeneratorOptions(null, null), errMessage);
        });

        test('Should throw correct error when generator is null and settings is undefined', () => {
            assert.throws(() => projectInputUtils.addGeneratorOptions(null, undefined), errMessage);
        });

        test('Should throw correct error when generator is null and settings is empty', () => {
            assert.throws(() => projectInputUtils.addGeneratorOptions(null, []), errMessage);
        });

        test('Should throw correct error when generator is null and valid settings', () => {
            assert.throws(() => projectInputUtils.addGeneratorOptions(null, projectInputs), errMessage);
        });

        test('Should throw correct error when generator is undefined and settings is null', () => {
            assert.throws(() => projectInputUtils.addGeneratorOptions(undefined, null), errMessage);
        });

        test('Should throw correct error when generator is undefined and settings is undefined', () => {
            assert.throws(() => projectInputUtils.addGeneratorOptions(undefined, undefined), errMessage);
        });

        test('Should throw correct error when generator is undefined and settings is empty', () => {
            assert.throws(() => projectInputUtils.addGeneratorOptions(undefined, []), errMessage);
        });

        test('Should throw correct error when generator is undefined and valid settings', () => {
            assert.throws(() => projectInputUtils.addGeneratorOptions(undefined, projectInputs), errMessage);
        });

        test('Should throw correct error when generator is valid and settings is null', () => {
            assert.throws(() => projectInputUtils.addGeneratorOptions(generatorStub, null), errMessage);
        });

        test('Should throw correct error when generator is valid and settings is undefined', () => {
            assert.throws(() => projectInputUtils.addGeneratorOptions(generatorStub, undefined), errMessage);
        });

        test('Should throw correct error when generator is valid and settings is empty', () => {
            assert.throws(() => projectInputUtils.addGeneratorOptions(generatorStub, []), errMessage);
        });

        test('Should add all options when generator is valid and valid settings', () => {
            projectInputUtils.addGeneratorOptions(generatorStub, projectInputs);
            assert.isTrue(generatorOptionStub.firstCall.calledWithExactly(firstInput.optionName, firstInput.option));
            assert.isTrue(generatorOptionStub.secondCall.calledWithExactly(secondInput.optionName, secondInput.option));
        });
    });

    suite('getDesiredProjectConfig Tests:', () => {
        let firstTryExtractInputValueStub: Sinon.SinonStub;
        let secondTryExtractInputValueStub: Sinon.SinonStub;
        let generatorPromptStub: Sinon.SinonStub;
        let answers;

        setup(() => {
            answers = {};
            generatorPromptStub = Sinon.stub(generatorStub, 'prompt').callsFake(() => answers);
            firstTryExtractInputValueStub = Sinon.stub(firstInput, 'tryExtractInputValue').callsFake(() => true);
            secondTryExtractInputValueStub = Sinon.stub(secondInput, 'tryExtractInputValue').callsFake(() => true);
            generatorStub.options = {};
        });

        teardown(() => {
            Sinon.restore();
        });

        test('Should reject with correct error when generator is null and settings is null', async () => {
            try {
                await projectInputUtils.getDesiredProjectConfig(null, null);
                assert.isFalse(true);
            } catch (err) {
                assert.deepEqual(err.message, errMessage);
            }
        });

        test('Should reject with correct error when generator is null and settings is undefined', async () => {
            try {
                await projectInputUtils.getDesiredProjectConfig(null, undefined);
                assert.isFalse(true);
            } catch (err) {
                assert.deepEqual(err.message, errMessage);
            }
         });

        test('Should reject with correct error when generator is null and settings is empty', async () => {
            try {
                await projectInputUtils.getDesiredProjectConfig(null, []);
                assert.isFalse(true);
            } catch (err) {
                assert.deepEqual(err.message, errMessage);
            }
        });

        test('Should reject with correct error when generator is null and valid settings', async () => {
            try {
                await projectInputUtils.getDesiredProjectConfig(null, projectInputs);
                assert.isFalse(true);
            } catch (err) {
                assert.deepEqual(err.message, errMessage);
            }
        });

        test('Should reject with correct error when generator is undefined and settings is null', async () => {
            try {
                await projectInputUtils.getDesiredProjectConfig(undefined, null);
                assert.isFalse(true);
            } catch (err) {
                assert.deepEqual(err.message, errMessage);
            }
        });

        test('Should reject with correct error when generator is undefined and settings is undefined', async () => {
            try {
                await projectInputUtils.getDesiredProjectConfig(undefined, undefined);
                assert.isFalse(true);
            } catch (err) {
                assert.deepEqual(err.message, errMessage);
            }
        });

        test('Should reject with correct error when generator is undefined and settings is empty', async () => {
            try {
                await projectInputUtils.getDesiredProjectConfig(undefined, []);
                assert.isFalse(true);
            } catch (err) {
                assert.deepEqual(err.message, errMessage);
            }
        });

        test('Should reject with correct error when generator is undefined and valid settings', async () => {
            try {
                await projectInputUtils.getDesiredProjectConfig(undefined, projectInputs);
                assert.isFalse(true);
            } catch (err) {
                assert.deepEqual(err.message, errMessage);
            }
        });

        test('Should reject with correct error when generator is valid and settings is null', async () => {
            try {
                await projectInputUtils.getDesiredProjectConfig(generatorStub, null);
                assert.isFalse(true);
            } catch (err) {
                assert.deepEqual(err.message, errMessage);
            }
        });

        test('Should reject with correct error when generator is valid and settings is undefined', async () => {
            try {
                await projectInputUtils.getDesiredProjectConfig(generatorStub, undefined);
                assert.isFalse(true);
            } catch (err) {
                assert.deepEqual(err.message, errMessage);
            }
        });

        test('Should reject with correct error when generator is valid and settings is empty', async () => {
            try {
                await projectInputUtils.getDesiredProjectConfig(generatorStub, []);
                assert.isFalse(true);
            } catch (err) {
                assert.deepEqual(err.message, errMessage);
            }
        });

        test('Should reject with correct error when setting check throws an error', async () => {
            firstTryExtractInputValueStub.callsFake(() => { throw new Error(); });
            try {
                await projectInputUtils.getDesiredProjectConfig(generatorStub, projectInputs);
                assert.isFalse(true);
            } catch (err) {
                assert.deepEqual(err.message, errMessage);
            }
        });

        test('Should not prompt when generator options are set correctly', async () => {
            await projectInputUtils.getDesiredProjectConfig(generatorStub, projectInputs);
            assert.isFalse(generatorPromptStub.called);
        });

        test('Should add all options when generator is valid and valid settings', async () => {
            firstTryExtractInputValueStub.callsFake(() => false);
            secondTryExtractInputValueStub.callsFake(() => false);
            const firstOptVal = 'foobar';
            const firstPromptAnswer = 'barFoo';
            const secondOptVal = true;
            const secondPromptAnswer = false;
            generatorStub.options[firstInput.optionName] = firstOptVal;
            generatorStub.options[secondInput.optionName] = secondOptVal;
            answers[firstInput.prompt.name] = firstPromptAnswer;
            answers[secondInput.prompt.name] = secondPromptAnswer;
            await projectInputUtils.getDesiredProjectConfig(generatorStub, projectInputs);
            assert.isTrue(firstTryExtractInputValueStub.firstCall.calledWith(firstOptVal));
            assert.isTrue(generatorPromptStub.firstCall.calledWithExactly([firstInput.prompt, secondInput.prompt]));
            assert.isTrue(firstTryExtractInputValueStub.secondCall.calledWith(firstPromptAnswer));
            assert.isTrue(secondTryExtractInputValueStub.firstCall.calledWith(secondOptVal));
            assert.isTrue(secondTryExtractInputValueStub.secondCall.calledWith(secondPromptAnswer));
        });
    });
});