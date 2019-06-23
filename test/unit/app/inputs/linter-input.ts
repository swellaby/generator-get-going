'use strict';

import chai = require('chai');
import inquirer = require('inquirer');

import ILinterConfig = require('../../../../generators/app/interfaces/linter-config');
import IProjectConfig = require('../../../../generators/app/interfaces/project-config');
import Linter = require('../../../../generators/app/enums/linter');
import linterInput = require('../../../../generators/app/inputs/linter-input');
import PromptType = require('../../../../generators/app/enums/prompt-type');

const input = linterInput;
const prompt = <inquirer.ListQuestion<Record<string, unknown>>>input.prompt;
const assert = chai.assert;

suite('LinterInput Tests:', () => {
    const expInputName = 'linter';

    test('Should have correct input name', () => {
       assert.deepEqual(input.name, expInputName);
    });

    suite('optionConfig Tests:', () => {
        test('Should have correct option name', () => {
            assert.deepEqual(input.optionName, expInputName);
        });

        test('Should have correct option type', () => {
            assert.deepEqual(input.option.type, String);
        });

        test('Should have correct option description', () => {
            const option = input.option;
            assert.deepEqual(option.description, 'The type of linter to use');
        });
    });

    suite('promptConfig Tests:', () => {
        test('Should have correct prompt name', () => {
            assert.deepEqual(prompt.name, expInputName);
        });

        test('Should have correct prompt type', () => {
            assert.deepEqual(prompt.type, PromptType.list);
        });

        test('Should have correct prompt display message', () => {
            assert.deepEqual(prompt.message, 'Which linter do you want to use?');
        });

        test('Should have correct default value', () => {
            assert.deepEqual(prompt.default, Linter.golint);
        });

        suite('choices Tests:', () => {
            const choices = prompt.choices;

            test('Should have correct number of choices', () => {
                assert.deepEqual(choices.length, 1);
            });

            test('Should have correct golint choice', () => {
                const choice = choices[0];
                assert.deepEqual(choice.name, 'Golint - The default Go linter');
                assert.deepEqual(choice.value, Linter.golint);
            });
        });
    });

    suite('tryExtractInputValue Tests:', () => {
        let config: IProjectConfig;
        const golint = 'golint';
        const expGoLintPackageInstallPath = 'golang.org/x/lint/golint';
        const expGoLintLinterConfig = <ILinterConfig>{
            linterName: 'Golint',
            linterType: Linter.golint,
            commandName: golint,
            packageInstallPath: expGoLintPackageInstallPath
        };

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
            assert.isTrue(input.tryExtractInputValue(golint, config));
            assert.deepEqual(config.linterConfig, expGoLintLinterConfig);
        });

        test('Should set config to boilerplate project type on uppercase key string input', () => {
            assert.isTrue(input.tryExtractInputValue('GOLINT', config));
            assert.deepEqual(config.linterConfig, expGoLintLinterConfig);
        });

        test('Should set config to boilerplate project type on mixed case key string input', () => {
            assert.isTrue(input.tryExtractInputValue('gOlInT', config));
            assert.deepEqual(config.linterConfig, expGoLintLinterConfig);
        });
    });
});
