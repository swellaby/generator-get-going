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

        test('Should have correct option description', () => {
            assert.deepEqual(input.option.description, 'The type of project to create');
        });

        test('Should have correct option default', () => {
            assert.deepEqual(input.option.default, undefined);
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
            assert.deepEqual(prompt.message, 'What type of project do you want?');
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
                assert.deepEqual(choice.name, 'New CLI App (with no Lib/Package)');
                assert.deepEqual(choice.value, ProjectType.cli);
            });
        });
    });

    suite('tryExtractInputValue Tests:', () => {
        let config: IProjectConfig;

        setup(() => {
            config = <IProjectConfig>{};
        });

        teardown(() => {
            config = null;
        });

        test('Should return false when value is null', () => {
            assert.isFalse(input.tryExtractInputValue(null, null));
        });

        test('Should return false when value is undefined', () => {
            assert.isFalse(input.tryExtractInputValue(undefined, config));
        });

        test('Should return false on unknown string input', () => {
            assert.isFalse(input.tryExtractInputValue('foobar', config));
        });

        test('Should return false on boolean input', () => {
            assert.isFalse(input.tryExtractInputValue(true, config));
        });

        test('Should return false on numeric input', () => {
            assert.isFalse(input.tryExtractInputValue(-7, config));
        });

        test('Should set config to boilerplate project type on lowercase key string input', () => {
            assert.isTrue(input.tryExtractInputValue('boilerplate', config));
            assert.deepEqual(config.projectType, ProjectType.boilerplate);
        });

        test('Should set config to boilerplate project type on uppercase key string input', () => {
            assert.isTrue(input.tryExtractInputValue('BOILERPLATE', config));
            assert.deepEqual(config.projectType, ProjectType.boilerplate);
        });

        test('Should set config to boilerplate project type on mixed case key string input', () => {
            assert.isTrue(input.tryExtractInputValue('bOiLeRpLaTe', config));
            assert.deepEqual(config.projectType, ProjectType.boilerplate);
        });

        test('Should set config to lib project type on lowercase key string input', () => {
            assert.isTrue(input.tryExtractInputValue('lib', config));
            assert.deepEqual(config.projectType, ProjectType.lib);
        });

        test('Should set config to lib project type on uppercase key string input', () => {
            assert.isTrue(input.tryExtractInputValue('LIB', config));
            assert.deepEqual(config.projectType, ProjectType.lib);
        });

        test('Should set config to lib project type on mixed case key string input', () => {
            assert.isTrue(input.tryExtractInputValue('LiB', config));
            assert.deepEqual(config.projectType, ProjectType.lib);
        });

        test('Should set config to libCli project type on lowercase key string input', () => {
            assert.isTrue(input.tryExtractInputValue('libcli', config));
            assert.deepEqual(config.projectType, ProjectType.libcli);
        });

        test('Should set config to libCli project type on uppercase key string input', () => {
            assert.isTrue(input.tryExtractInputValue('LIBCLI', config));
            assert.deepEqual(config.projectType, ProjectType.libcli);
        });

        test('Should set config to libCli project type on mixed case key string input', () => {
            assert.isTrue(input.tryExtractInputValue('LiBcLi', config));
            assert.deepEqual(config.projectType, ProjectType.libcli);
        });

        test('Should set config to cli project type on lowercase key string input', () => {
            assert.isTrue(input.tryExtractInputValue('cli', config));
            assert.deepEqual(config.projectType, ProjectType.cli);
        });

        test('Should set config to cli project type on uppercase key string input', () => {
            assert.isTrue(input.tryExtractInputValue('CLI', config));
            assert.deepEqual(config.projectType, ProjectType.cli);
        });

        test('Should set config to cli project type on mixed case key string input', () => {
            assert.isTrue(input.tryExtractInputValue('cLI', config));
            assert.deepEqual(config.projectType, ProjectType.cli);
        });
    });
});