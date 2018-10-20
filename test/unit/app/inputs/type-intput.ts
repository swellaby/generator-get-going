'use strict';

import chai = require('chai');

import IProjectConfig = require('../../../../generators/app/interfaces/project-config');
import ProjectType = require('../../../../generators/app/enums/project-type');
import PromptType = require('../../../../generators/app/enums/prompt-type');
import typeInput = require('../../../../generators/app/inputs/type-input');

const input = typeInput.input;
const prompt = input.prompt;
const assert = chai.assert;

suite('TypeInput Tests:', () => {
    const expSettingName = 'projectType';

    test('Should have correct setting name', () => {
       assert.deepEqual(input.name, expSettingName);
    });

    suite('optionConfig Tests:', () => {
        test('Should have correct option name', () => {
            assert.deepEqual(input.optionName, 'type');
        });
    });

    suite('promptConfig Tests:', () => {
        test('Should have correct prompt name', () => {
            assert.deepEqual(prompt.name, expSettingName);
        });

        test('Should have correct prompt type', () => {
            assert.deepEqual(prompt.type, PromptType.list);
        });

        test('Should have correct prompt display message', () => {
            assert.deepEqual(prompt.message, 'The type of project your app will be');
        });

        test('Should have correct default value', () => {
            assert.deepEqual(prompt.default, ProjectType.boilerplate);
        });

        suite('choices Tests:', () => {
            const choices = prompt.choices;

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

    suite('tryExtractSettingValue Tests:', () => {
        let config: IProjectConfig;

        setup(() => {
            config = <IProjectConfig>{};
        });

        teardown(() => {
            config = null;
        });

        test('Should return false when value is null', () => {
            assert.isFalse(input.tryExtractSettingValue(null, null));
        });

        test('Should return false when value is undefined', () => {
            assert.isFalse(input.tryExtractSettingValue(undefined, config));
        });

        test('Should return false on unknown string input', () => {
            assert.isFalse(input.tryExtractSettingValue('foobar', config));
        });

        test('Should return false on boolean input', () => {
            assert.isFalse(input.tryExtractSettingValue(true, config));
        });

        test('Should return false on numeric input', () => {
            assert.isFalse(input.tryExtractSettingValue(-7, config));
        });

        test('Should set config to boilerplate project type on lowercase key string input', () => {
            assert.isTrue(input.tryExtractSettingValue('boilerplate', config));
            assert.deepEqual(config.projectType, ProjectType.boilerplate);
        });

        test('Should set config to boilerplate project type on uppercase key string input', () => {
            assert.isTrue(input.tryExtractSettingValue('BOILERPLATE', config));
            assert.deepEqual(config.projectType, ProjectType.boilerplate);
        });

        test('Should set config to boilerplate project type on mixed case key string input', () => {
            assert.isTrue(input.tryExtractSettingValue('bOiLeRpLaTe', config));
            assert.deepEqual(config.projectType, ProjectType.boilerplate);
        });

        test('Should set config to lib project type on lowercase key string input', () => {
            assert.isTrue(input.tryExtractSettingValue('lib', config));
            assert.deepEqual(config.projectType, ProjectType.lib);
        });

        test('Should set config to lib project type on uppercase key string input', () => {
            assert.isTrue(input.tryExtractSettingValue('LIB', config));
            assert.deepEqual(config.projectType, ProjectType.lib);
        });

        test('Should set config to lib project type on mixed case key string input', () => {
            assert.isTrue(input.tryExtractSettingValue('LiB', config));
            assert.deepEqual(config.projectType, ProjectType.lib);
        });

        test('Should set config to libCli project type on lowercase key string input', () => {
            assert.isTrue(input.tryExtractSettingValue('libcli', config));
            assert.deepEqual(config.projectType, ProjectType.libcli);
        });

        test('Should set config to libCli project type on uppercase key string input', () => {
            assert.isTrue(input.tryExtractSettingValue('LIBCLI', config));
            assert.deepEqual(config.projectType, ProjectType.libcli);
        });

        test('Should set config to libCli project type on mixed case key string input', () => {
            assert.isTrue(input.tryExtractSettingValue('LiBcLi', config));
            assert.deepEqual(config.projectType, ProjectType.libcli);
        });

        test('Should set config to cli project type on lowercase key string input', () => {
            assert.isTrue(input.tryExtractSettingValue('cli', config));
            assert.deepEqual(config.projectType, ProjectType.cli);
        });

        test('Should set config to cli project type on uppercase key string input', () => {
            assert.isTrue(input.tryExtractSettingValue('CLI', config));
            assert.deepEqual(config.projectType, ProjectType.cli);
        });

        test('Should set config to cli project type on mixed case key string input', () => {
            assert.isTrue(input.tryExtractSettingValue('cLI', config));
            assert.deepEqual(config.projectType, ProjectType.cli);
        });
    });
});