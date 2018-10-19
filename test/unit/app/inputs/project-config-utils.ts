'use strict';

import Chai = require('chai');
import Sinon = require('sinon');
import YeomanGenerator = require('yeoman-generator');

import projectConfigUtils = require('../../../../generators/app/inputs/project-config-utils');
import testUtils = require('../../../test-utils');

const assert = Chai.assert;

suite('projectConfigUtils Tests:', () => {
    const errMessage = 'Something awful happened! Please open an issue on GitHub';
    const generatorStub: YeomanGenerator = testUtils.generatorStub;
    const projectSettings = testUtils.projectSettings;
    const firstSetting = testUtils.firstSetting;
    const secondSetting = testUtils.secondSetting;

    suite('addGeneratorOptions Tests:', () => {
        let generatorOptionStub: Sinon.SinonStub;

        setup(() => {
            generatorOptionStub = Sinon.stub(generatorStub, 'option');
        });

        teardown(() => {
            Sinon.restore();
        });

        test('Should throw correct error when generator is null and settings is null', () => {
            assert.throws(() => projectConfigUtils.addGeneratorOptions(null, null), errMessage);
        });

        test('Should throw correct error when generator is null and settings is undefined', () => {
            assert.throws(() => projectConfigUtils.addGeneratorOptions(null, undefined), errMessage);
        });

        test('Should throw correct error when generator is null and settings is empty', () => {
            assert.throws(() => projectConfigUtils.addGeneratorOptions(null, []), errMessage);
        });

        test('Should throw correct error when generator is null and valid settings', () => {
            assert.throws(() => projectConfigUtils.addGeneratorOptions(null, projectSettings), errMessage);
        });

        test('Should throw correct error when generator is undefined and settings is null', () => {
            assert.throws(() => projectConfigUtils.addGeneratorOptions(undefined, null), errMessage);
        });

        test('Should throw correct error when generator is undefined and settings is undefined', () => {
            assert.throws(() => projectConfigUtils.addGeneratorOptions(undefined, undefined), errMessage);
        });

        test('Should throw correct error when generator is undefined and settings is empty', () => {
            assert.throws(() => projectConfigUtils.addGeneratorOptions(undefined, []), errMessage);
        });

        test('Should throw correct error when generator is undefined and valid settings', () => {
            assert.throws(() => projectConfigUtils.addGeneratorOptions(undefined, projectSettings), errMessage);
        });

        test('Should throw correct error when generator is valid and settings is null', () => {
            assert.throws(() => projectConfigUtils.addGeneratorOptions(generatorStub, null), errMessage);
        });

        test('Should throw correct error when generator is valid and settings is undefined', () => {
            assert.throws(() => projectConfigUtils.addGeneratorOptions(generatorStub, undefined), errMessage);
        });

        test('Should throw correct error when generator is valid and settings is empty', () => {
            assert.throws(() => projectConfigUtils.addGeneratorOptions(generatorStub, []), errMessage);
        });

        test('Should add all options when generator is valid and valid settings', () => {
            projectConfigUtils.addGeneratorOptions(generatorStub, projectSettings);
            assert.isTrue(generatorOptionStub.firstCall.calledWithExactly(firstSetting.optionName, firstSetting.option));
            assert.isTrue(generatorOptionStub.secondCall.calledWithExactly(secondSetting.optionName, secondSetting.option));
        });
    });

    suite('getDesiredProjectConfig Tests:', () => {
        let firstSettingExtractValStub: Sinon.SinonStub;
        let secondSettingExtractValStub: Sinon.SinonStub;
        let generatorPromptStub: Sinon.SinonStub;
        let answers;

        setup(() => {
            answers = {};
            generatorPromptStub = Sinon.stub(generatorStub, 'prompt').callsFake(() => answers);
            firstSettingExtractValStub = Sinon.stub(firstSetting, 'tryExtractOptionValue').callsFake(() => true);
            secondSettingExtractValStub = Sinon.stub(secondSetting, 'tryExtractOptionValue').callsFake(() => true);
            generatorStub.options = {};
        });

        teardown(() => {
            Sinon.restore();
        });

        test('Should reject with correct error when generator is null and settings is null', async () => {
            try {
                await projectConfigUtils.getDesiredProjectConfig(null, null);
                assert.isFalse(true);
            } catch (err) {
                assert.deepEqual(err.message, errMessage);
            }
        });

        test('Should reject with correct error when generator is null and settings is undefined', async () => {
            try {
                await projectConfigUtils.getDesiredProjectConfig(null, undefined);
                assert.isFalse(true);
            } catch (err) {
                assert.deepEqual(err.message, errMessage);
            }
         });

        test('Should reject with correct error when generator is null and settings is empty', async () => {
            try {
                await projectConfigUtils.getDesiredProjectConfig(null, []);
                assert.isFalse(true);
            } catch (err) {
                assert.deepEqual(err.message, errMessage);
            }
        });

        test('Should reject with correct error when generator is null and valid settings', async () => {
            try {
                await projectConfigUtils.getDesiredProjectConfig(null, projectSettings);
                assert.isFalse(true);
            } catch (err) {
                assert.deepEqual(err.message, errMessage);
            }
        });

        test('Should reject with correct error when generator is undefined and settings is null', async () => {
            try {
                await projectConfigUtils.getDesiredProjectConfig(undefined, null);
                assert.isFalse(true);
            } catch (err) {
                assert.deepEqual(err.message, errMessage);
            }
        });

        test('Should reject with correct error when generator is undefined and settings is undefined', async () => {
            try {
                await projectConfigUtils.getDesiredProjectConfig(undefined, undefined);
                assert.isFalse(true);
            } catch (err) {
                assert.deepEqual(err.message, errMessage);
            }
        });

        test('Should reject with correct error when generator is undefined and settings is empty', async () => {
            try {
                await projectConfigUtils.getDesiredProjectConfig(undefined, []);
                assert.isFalse(true);
            } catch (err) {
                assert.deepEqual(err.message, errMessage);
            }
        });

        test('Should reject with correct error when generator is undefined and valid settings', async () => {
            try {
                await projectConfigUtils.getDesiredProjectConfig(undefined, projectSettings);
                assert.isFalse(true);
            } catch (err) {
                assert.deepEqual(err.message, errMessage);
            }
        });

        test('Should reject with correct error when generator is valid and settings is null', async () => {
            try {
                await projectConfigUtils.getDesiredProjectConfig(generatorStub, null);
                assert.isFalse(true);
            } catch (err) {
                assert.deepEqual(err.message, errMessage);
            }
        });

        test('Should reject with correct error when generator is valid and settings is undefined', async () => {
            try {
                await projectConfigUtils.getDesiredProjectConfig(generatorStub, undefined);
                assert.isFalse(true);
            } catch (err) {
                assert.deepEqual(err.message, errMessage);
            }
        });

        test('Should reject with correct error when generator is valid and settings is empty', async () => {
            try {
                await projectConfigUtils.getDesiredProjectConfig(generatorStub, []);
                assert.isFalse(true);
            } catch (err) {
                assert.deepEqual(err.message, errMessage);
            }
        });

        test('Should reject with correct error when setting check throws an error', async () => {
            firstSettingExtractValStub.callsFake(() => { throw new Error(); });
            try {
                await projectConfigUtils.getDesiredProjectConfig(generatorStub, projectSettings);
                assert.isFalse(true);
            } catch (err) {
                assert.deepEqual(err.message, errMessage);
            }
        });

        test('Should not prompt when generator options are set correctly', async () => {
            await projectConfigUtils.getDesiredProjectConfig(generatorStub, projectSettings);
            assert.isFalse(generatorPromptStub.called);
        });

        test('Should add all options when generator is valid and valid settings', async () => {
            firstSettingExtractValStub.callsFake(() => false);
            secondSettingExtractValStub.callsFake(() => false);
            const firstOptVal = 'foobar';
            const firstPromptAnswer = 'barFoo';
            const secondOptVal = true;
            const secondPromptAnswer = false;
            generatorStub.options[firstSetting.optionName] = firstOptVal;
            generatorStub.options[secondSetting.optionName] = secondOptVal;
            answers[firstSetting.prompt.name] = firstPromptAnswer;
            answers[secondSetting.prompt.name] = secondPromptAnswer;
            await projectConfigUtils.getDesiredProjectConfig(generatorStub, projectSettings);
            assert.isTrue(firstSettingExtractValStub.firstCall.calledWith(firstOptVal));
            assert.isTrue(generatorPromptStub.firstCall.calledWithExactly([firstSetting.prompt, secondSetting.prompt]));
            assert.isTrue(firstSettingExtractValStub.secondCall.calledWith(firstPromptAnswer));
            assert.isTrue(secondSettingExtractValStub.firstCall.calledWith(secondOptVal));
            assert.isTrue(secondSettingExtractValStub.secondCall.calledWith(secondPromptAnswer));
        });
    });
});