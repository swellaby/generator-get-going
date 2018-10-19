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

    suite('optionConfig Tests:', () => {
        test('Should have correct option name', () => {
            assert.deepEqual(setting.optionName, 'type');
        });
    });

    suite('promptConfig Tests:', () => {
        test('Should have correct prompt name', () => {
            assert.deepEqual(settingPrompt.name, expSettingName);
        });

        test('Should have correct prompt type', () => {
            assert.deepEqual(settingPrompt.type, PromptType.list);
        });

        test('Should have correct prompt display message', () => {
            assert.deepEqual(settingPrompt.message, 'The type of project your app will be');
        });

        test('Should have correct default value', () => {
            assert.deepEqual(settingPrompt.default, ProjectType.boilerplate);
        });

        suite('choices Tests:', () => {
            const choices = settingPrompt.choices;

            test('Should have correct number of choices', () => {
                assert.deepEqual(choices.length, 4);
            });

            test('Should have correct boilerplate choice', () => {
                const choice = choices[0];
                assert.deepEqual(choice.name, 'New App with just the boilerplate');
                assert.deepEqual(choice.value, ProjectType.boilerplate);
            });

            test('Should have correct lib choice', () => {
                const choice = choices[1];
                assert.deepEqual(choice.name, 'New Lib/Package App');
                assert.deepEqual(choice.value, ProjectType.lib);
            });

            test('Should have correct lib/cli choice', () => {
                const choice = choices[2];
                assert.deepEqual(choice.name, 'New Lib/Package with a CLI App');
                assert.deepEqual(choice.value, ProjectType.libcli);
            });

            test('Should have correct cli choice', () => {
                const choice = choices[3];
                assert.deepEqual(choice.name, 'New CLI App');
                assert.deepEqual(choice.value, ProjectType.cli);
            });
        });
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

        test('Should set config to boilerplate project type on lowercase key string input', () => {
            assert.isTrue(setting.tryExtractOptionValue('boilerplate', config));
            assert.deepEqual(config.projectType, ProjectType.boilerplate);
        });

        test('Should set config to boilerplate project type on uppercase key string input', () => {
            assert.isTrue(setting.tryExtractOptionValue('BOILERPLATE', config));
            assert.deepEqual(config.projectType, ProjectType.boilerplate);
        });

        test('Should set config to boilerplate project type on mixed case key string input', () => {
            assert.isTrue(setting.tryExtractOptionValue('bOiLeRpLaTe', config));
            assert.deepEqual(config.projectType, ProjectType.boilerplate);
        });

        test('Should set config to lib project type on lowercase key string input', () => {
            assert.isTrue(setting.tryExtractOptionValue('lib', config));
            assert.deepEqual(config.projectType, ProjectType.lib);
        });

        test('Should set config to lib project type on uppercase key string input', () => {
            assert.isTrue(setting.tryExtractOptionValue('LIB', config));
            assert.deepEqual(config.projectType, ProjectType.lib);
        });

        test('Should set config to lib project type on mixed case key string input', () => {
            assert.isTrue(setting.tryExtractOptionValue('LiB', config));
            assert.deepEqual(config.projectType, ProjectType.lib);
        });

        test('Should set config to libCli project type on lowercase key string input', () => {
            assert.isTrue(setting.tryExtractOptionValue('libcli', config));
            assert.deepEqual(config.projectType, ProjectType.libcli);
        });

        test('Should set config to libCli project type on uppercase key string input', () => {
            assert.isTrue(setting.tryExtractOptionValue('LIBCLI', config));
            assert.deepEqual(config.projectType, ProjectType.libcli);
        });

        test('Should set config to libCli project type on mixed case key string input', () => {
            assert.isTrue(setting.tryExtractOptionValue('LiBcLi', config));
            assert.deepEqual(config.projectType, ProjectType.libcli);
        });

        test('Should set config to cli project type on lowercase key string input', () => {
            assert.isTrue(setting.tryExtractOptionValue('cli', config));
            assert.deepEqual(config.projectType, ProjectType.cli);
        });

        test('Should set config to cli project type on uppercase key string input', () => {
            assert.isTrue(setting.tryExtractOptionValue('CLI', config));
            assert.deepEqual(config.projectType, ProjectType.cli);
        });

        test('Should set config to cli project type on mixed case key string input', () => {
            assert.isTrue(setting.tryExtractOptionValue('cLI', config));
            assert.deepEqual(config.projectType, ProjectType.cli);
        });
    });
});