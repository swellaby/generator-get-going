'use strict';

import chai = require('chai');

import IProjectConfig = require('../../../../generators/app/project-config');
import ProjectType = require('../../../../generators/app/settings/project-type');
import PromptType = require('../../.././../generators/app/inputs/prompt-type');
import typeInput = require('../../../../generators/app/inputs/type-input');

const setting = typeInput.setting;
const settingPrompt = setting.prompt;
const assert = chai.assert;

suite('TypeInput Tests:', () => {
    const expSettingName = 'projectType';

    test('Should have correct setting name', () => {
       assert.deepEqual(setting.name, expSettingName);
    });

    test('Should have correct option name', () => {
        assert.deepEqual(setting.optionName, 'type');
    });

    test('Should have correct prompt name', () => {
        assert.deepEqual(settingPrompt.name, expSettingName);
    });

    test('Should have correct prompt type', () => {
        assert.deepEqual(settingPrompt.type, PromptType.list);
    });

    test('Should have correct prompt display message', () => {
        assert.deepEqual(settingPrompt.message, 'The type of project your app will be');
    });

    suite('tryConvertOptionValue Tests:', () => {
        let config: IProjectConfig;

        setup(() => {
            config = <IProjectConfig>{};
        });

        teardown(() => {
            config = null;
        });

        test('Should return false when value is null', () => {
            assert.isFalse(setting.tryExtractOptionValue(null, null));
        });

        test('Should return false when value is undefined', () => {
            assert.isFalse(setting.tryExtractOptionValue(undefined, config));
        });

        test('Should return false on unknown string input', () => {
            assert.isFalse(setting.tryExtractOptionValue('foobar', config));
        });

        test('Should return false on boolean input', () => {
            assert.isFalse(setting.tryExtractOptionValue(true, config));
        });

        test('Should return false on numeric input', () => {
            assert.isFalse(setting.tryExtractOptionValue(-7, config));
        });

        test('Should return boilerplate project type on lowercase key string input', () => {
            assert.isTrue(setting.tryExtractOptionValue('boilerplate', config));
            assert.deepEqual(config.projectType, ProjectType.boilerplate);
        });

        test('Should return boilerplate project type on uppercase key string input', () => {
            assert.isTrue(setting.tryExtractOptionValue('BOILERPLATE', config));
            assert.deepEqual(config.projectType, ProjectType.boilerplate);
        });

        test('Should return boilerplate project type on mixed case key string input', () => {
            assert.isTrue(setting.tryExtractOptionValue('bOiLeRpLaTe', config));
            assert.deepEqual(config.projectType, ProjectType.boilerplate);
        });

        test('Should return lib project type on lowercase key string input', () => {
            assert.isTrue(setting.tryExtractOptionValue('lib', config));
            assert.deepEqual(config.projectType, ProjectType.lib);
        });

        test('Should return lib project type on uppercase key string input', () => {
            assert.isTrue(setting.tryExtractOptionValue('LIB', config));
            assert.deepEqual(config.projectType, ProjectType.lib);
        });

        test('Should return lib project type on mixed case key string input', () => {
            assert.isTrue(setting.tryExtractOptionValue('LiB', config));
            assert.deepEqual(config.projectType, ProjectType.lib);
        });

        test('Should return cli project type on lowercase key string input', () => {
            assert.isTrue(setting.tryExtractOptionValue('cli', config));
            assert.deepEqual(config.projectType, ProjectType.cli);
        });

        test('Should return cli project type on uppercase key string input', () => {
            assert.isTrue(setting.tryExtractOptionValue('CLI', config));
            assert.deepEqual(config.projectType, ProjectType.cli);
        });

        test('Should return cli project type on mixed case key string input', () => {
            assert.isTrue(setting.tryExtractOptionValue('cLI', config));
            assert.deepEqual(config.projectType, ProjectType.cli);
        });
    });
});