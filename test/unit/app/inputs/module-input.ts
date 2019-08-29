'use strict';

import chai = require('chai');
import YeomanGenerator = require('yeoman-generator');
import inquirer = require('inquirer');

import IProjectConfig = require('../../../../generators/app/interfaces/project-config');
import moduleInput = require('../../../../generators/app/inputs/module-input');
import nameInput = require('../../../../generators/app/inputs/name-input');
import ownerInput = require('../../../../generators/app/inputs/owner-input');
import PromptType = require('../../../../generators/app/enums/prompt-type');
import testUtils = require('../../../test-utils');

const input = moduleInput;
const prompt = <inquirer.InputQuestion<Record<string, unknown>>>input.prompt;
const assert = chai.assert;

suite('ModuleInput Tests:', () => {
    const expSettingName = 'moduleName';

    test('Should have correct setting name', () => {
       assert.deepEqual(input.name, expSettingName);
    });

    suite('optionConfig Tests:', () => {
        const option = input.option;
        test('Should have correct option name', () => {
            assert.deepEqual(input.optionName, 'module-path');
        });

        test('Should have correct option description', () => {
            assert.deepEqual(option.description, 'The name of your Go module');
        });
    });

    suite('promptConfig Tests:', () => {
        test('Should have correct prompt name', () => {
            assert.deepEqual(prompt.name, expSettingName);
        });

        test('Should have correct prompt type', () => {
            assert.deepEqual(prompt.type, PromptType.input);
        });

        test('Should have correct prompt display message', () => {
            assert.deepEqual(prompt.message, 'What do you want to name of your Go module?');
        });

        suite('getDefaultPromptValue Tests:', () => {
            let answers: YeomanGenerator.Answers;
            let config: IProjectConfig;
            const owner = 'swellaby';
            const name = 'captain-githook';
            const host = 'github.com';

            const getExpModuleName = (owner: string, name: string) => `${host}/${owner}/${name}`;
            const expModuleName = getExpModuleName(owner, name);

            setup(() => {
                answers = <YeomanGenerator.Answers>{};
                config = JSON.parse(JSON.stringify(testUtils.projectConfig));
                config.name = name;
                config.owner = owner;
            });

            teardown(() => {
                config = null;
            });

            test('Should return correct module name when config has name and owner', () => {
                input.tryExtractInputValue(null, config);
                assert.deepEqual(prompt.default(answers), expModuleName);
            });

            test('Should return correct module name when config has name and does not have owner', () => {
                const ownerAnswer = 'caleb';
                answers[ownerInput.prompt.name] = ownerAnswer;
                config.owner = undefined;
                input.tryExtractInputValue(null, config);
                assert.deepEqual(prompt.default(answers), getExpModuleName(ownerAnswer, name));
            });

            test('Should return correct module name when config does not have name and does have owner', () => {
                const nameAnswer = 'ci-detective';
                answers[nameInput.prompt.name] = nameAnswer;
                config.name = undefined;
                input.tryExtractInputValue(null, config);
                assert.deepEqual(prompt.default(answers), getExpModuleName(owner, nameAnswer));
            });

            test('Should return correct module name when config does not have name nor owner', () => {
                const nameAnswer = 'foo';
                answers[nameInput.prompt.name] = nameAnswer;
                config.name = undefined;
                const ownerAnswer = 'bar';
                answers[ownerInput.prompt.name] = ownerAnswer;
                config.owner = undefined;
                input.tryExtractInputValue(null, config);
                assert.deepEqual(prompt.default(answers), getExpModuleName(ownerAnswer, nameAnswer));
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

        test('Should return false on empty string input', () => {
            assert.isFalse(input.tryExtractInputValue('', config));
        });

        test('Should return false on invalid string input', () => {
            assert.isFalse(input.tryExtractInputValue('foo/bar', config));
        });

        test('Should set config name correctly on valid dash string input', () => {
            const name = 'github.com/foo/swell-gen';
            assert.isTrue(input.tryExtractInputValue(name, config));
            assert.deepEqual(config.moduleName, name);
        });

        test('Should set config name correctly on valid underscore string input', () => {
            const name = 'github.com/swellaby/gen_lets';
            assert.isTrue(input.tryExtractInputValue(name, config));
            assert.deepEqual(config.moduleName, name);
        });

        test('Should set config name correctly on valid numeric string input', () => {
            const name = 'github.com/swellaby/gen-7lets';
            assert.isTrue(input.tryExtractInputValue(name, config));
            assert.deepEqual(config.moduleName, name);
        });

        test('Should set config name correctly on valid dot string input', () => {
            const name = 'github.com/swellaby/gen/v.2';
            assert.isTrue(input.tryExtractInputValue(name, config));
            assert.deepEqual(config.moduleName, name);
        });
    });

    suite('promptValidate Tests:', () => {
        const getErrorMessage = testUtils.getModuleNameValidationErrorMessage;
        test('Should return correct error message when value is null', () => {
            const expMessage = getErrorMessage(null);
            assert.deepEqual(prompt.validate(null), expMessage);
        });

        test('Should return correct error message when value is undefined', () => {
            const expMessage = getErrorMessage(undefined);
            assert.deepEqual(prompt.validate(undefined), expMessage);
        });

        test('Should return correct error message on empty string input', () => {
            const expMessage = getErrorMessage('');
            assert.deepEqual(prompt.validate(''), expMessage);
        });

        test('Should return correct error message on invalid string input', () => {
            const name = 'foo/bar';
            const expMessage = getErrorMessage(name);
            const actMessage = prompt.validate(name);
            assert.deepEqual(actMessage, expMessage);
        });

        test('Should return true on valid dash string input', () => {
            assert.isTrue(prompt.validate('git.com/swell/foo-bar'));
        });

        test('Should return true on valid underscore string input', () => {
            assert.isTrue(prompt.validate('github.com/cool/beans_bar'));
        });

        test('Should return true on valid numeric string input', () => {
            assert.isTrue(prompt.validate('bitbucket.com/hello/world/-7'));
        });
    });
});
