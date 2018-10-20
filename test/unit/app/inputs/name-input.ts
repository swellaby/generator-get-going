'use strict';

import chai = require('chai');
import inquirer = require('inquirer');

import IProjectConfig = require('../../../../generators/app/interfaces/project-config');
import PromptType = require('../../../../generators/app/enums/prompt-type');
import nameInput = require('../../../../generators/app/inputs/name-input');

const input = nameInput.input;
const prompt = input.prompt;
const assert = chai.assert;

suite('NameInput Tests:', () => {
    const expSettingName = 'name';

    test('Should have correct setting name', () => {
       assert.deepEqual(input.name, expSettingName);
    });

    test('Should have correct option name', () => {
        assert.deepEqual(input.optionName, expSettingName);
    });

    test('Should have correct prompt name', () => {
        assert.deepEqual(prompt.name, expSettingName);
    });

    test('Should have correct prompt type', () => {
        assert.deepEqual(prompt.type, PromptType.input);
    });

    test('Should have correct prompt display message', () => {
        assert.deepEqual(prompt.message, 'The name of your app');
    });

    suite('isValid Tests:', () => {
        test('Should return false on null input', () => {
            assert.isFalse(nameInput.isValid(null));
        });

        test('Should return false on undefined input', () => {
            assert.isFalse(nameInput.isValid(undefined));
        });

        test('Should return false on empty string input', () => {
            assert.isFalse(nameInput.isValid(''));
        });

        test('Should return false on invalid string input', () => {
            assert.isFalse(nameInput.isValid('foo/bar'));
        });

        test('Should return true on valid dash string input', () => {
            assert.isTrue(nameInput.isValid('foo-bar'));
        });

        test('Should return true on valid underscore string input', () => {
            assert.isTrue(nameInput.isValid('foo_bar'));
        });

        test('Should return true on valid numeric string input', () => {
            assert.isTrue(nameInput.isValid('-7'));
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
            const name = 'foo-bar';
            assert.isTrue(input.tryExtractInputValue(name, config));
            assert.deepEqual(config.name, name);
        });

        test('Should set config name correctly on valid underscore string input', () => {
            const name = 'foo_bar';
            assert.isTrue(input.tryExtractInputValue(name, config));
            assert.deepEqual(config.name, name);
        });

        test('Should set config name correctly on valid numeric string input', () => {
            const name = '-7';
            assert.isTrue(input.tryExtractInputValue(name, config));
            assert.deepEqual(config.name, name);
        });
    });

    suite('promptValidate Tests:', () => {
        const answers: inquirer.Answers = {};
        const getErrorMessage = (input: string): string => {
            return `Invalid app name: '${input}'`;
        };

        test('Should return correct error message when value is null', () => {
            const expMessage = getErrorMessage(null);
            assert.deepEqual(prompt.validate(null, answers), expMessage);
        });

        test('Should return correct error message when value is undefined', () => {
            const expMessage = getErrorMessage(undefined);
            assert.deepEqual(prompt.validate(undefined, answers), expMessage);
        });

        test('Should return correct error message on empty string input', () => {
            const expMessage = getErrorMessage('');
            assert.deepEqual(prompt.validate('', answers), expMessage);
        });

        test('Should return correct error message on invalid string input', () => {
            const name = 'foo/bar';
            const expMessage = getErrorMessage(name);
            const actMessage = prompt.validate('foo/bar', answers);
            assert.deepEqual(actMessage, expMessage);
        });

        test('Should return true on valid dash string input', () => {
            assert.isTrue(prompt.validate('foo-bar', answers));
        });

        test('Should return true on valid underscore string input', () => {
            assert.isTrue(prompt.validate('foo_bar', answers));
        });

        test('Should return true on valid numeric string input', () => {
            assert.isTrue(prompt.validate('-7', answers));
        });
    });
});