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
        let generatorPromptStub: Sinon.SinonStub;

        setup(() => {
            generatorPromptStub = Sinon.stub(generatorStub, 'prompt');
            generatorStub.options = {};
        });

        teardown(() => {
            Sinon.restore();
        });

        test('Should throw correct error when generator is null and settings is null', async () => {
            try {
                await projectConfigUtils.getDesiredProjectConfig(null, null);
                assert.isFalse(true);
            } catch (err) {
                assert.deepEqual(err.message, errMessage);
            }
        });

        test('Should throw correct error when generator is null and settings is undefined', async () => {
            try {
                await projectConfigUtils.getDesiredProjectConfig(null, undefined);
                assert.isFalse(true);
            } catch (err) {
                assert.deepEqual(err.message, errMessage);
            }
         });

        test('Should throw correct error when generator is null and settings is empty', async () => {
            try {
                await projectConfigUtils.getDesiredProjectConfig(null, []);
                assert.isFalse(true);
            } catch (err) {
                assert.deepEqual(err.message, errMessage);
            }
        });

        test('Should throw correct error when generator is null and valid settings', async () => {
            try {
                await projectConfigUtils.getDesiredProjectConfig(null, projectSettings);
                assert.isFalse(true);
            } catch (err) {
                assert.deepEqual(err.message, errMessage);
            }
        });

        test('Should throw correct error when generator is undefined and settings is null', async () => {
            try {
                await projectConfigUtils.getDesiredProjectConfig(undefined, null);
                assert.isFalse(true);
            } catch (err) {
                assert.deepEqual(err.message, errMessage);
            }
        });

        test('Should throw correct error when generator is undefined and settings is undefined', async () => {
            try {
                await projectConfigUtils.getDesiredProjectConfig(undefined, undefined);
                assert.isFalse(true);
            } catch (err) {
                assert.deepEqual(err.message, errMessage);
            }
        });

        test('Should throw correct error when generator is undefined and settings is empty', async () => {
            try {
                await projectConfigUtils.getDesiredProjectConfig(undefined, []);
                assert.isFalse(true);
            } catch (err) {
                assert.deepEqual(err.message, errMessage);
            }
        });

        test('Should throw correct error when generator is undefined and valid settings', async () => {
            try {
                await projectConfigUtils.getDesiredProjectConfig(undefined, projectSettings);
                assert.isFalse(true);
            } catch (err) {
                assert.deepEqual(err.message, errMessage);
            }
        });

        test('Should throw correct error when generator is valid and settings is null', async () => {
            try {
                await projectConfigUtils.getDesiredProjectConfig(generatorStub, null);
                assert.isFalse(true);
            } catch (err) {
                assert.deepEqual(err.message, errMessage);
            }
        });

        test('Should throw correct error when generator is valid and settings is undefined', async () => {
            try {
                await projectConfigUtils.getDesiredProjectConfig(generatorStub, undefined);
                assert.isFalse(true);
            } catch (err) {
                assert.deepEqual(err.message, errMessage);
            }
        });

        test('Should throw correct error when generator is valid and settings is empty', async () => {
            try {
                await projectConfigUtils.getDesiredProjectConfig(generatorStub, []);
                assert.isFalse(true);
            } catch (err) {
                assert.deepEqual(err.message, errMessage);
            }
        });

        test('Should not prompt when generator options are set correctly', async () => {
            // options
        });

        // test('Should add all options when generator is valid and valid settings', async () => {
        //     projectConfigUtils.getDesiredProjectConfig(generatorStub, projectSettings);
        //     assert.isTrue(generatorPromptStub.firstCall.calledWithExactly(firstSetting.optionName, firstSetting.option));
        //     assert.isTrue(generatorPromptStub.secondCall.calledWithExactly(secondSetting.optionName, secondSetting.option));
        // });
    });
});