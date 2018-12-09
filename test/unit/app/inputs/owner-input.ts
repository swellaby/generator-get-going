'use strict';

import chai = require('chai');

import IProjectConfig = require('../../../../generators/app/interfaces/project-config');
import PromptType = require('../../../../generators/app/enums/prompt-type');
import ownerInput = require('../../../../generators/app/inputs/owner-input');

const input = ownerInput;
const prompt = input.prompt;
const assert = chai.assert;

suite('OwnerInput Tests:', () => {
    const expSettingName = 'owner';

    test('Should have correct setting name', () => {
       assert.deepEqual(input.name, expSettingName);
    });

    suite('optionConfig Tests:', () => {
        const option = input.option;
        test('Should have correct option name', () => {
            assert.deepEqual(input.optionName, expSettingName);
        });

        test('Should have correct option description', () => {
            assert.deepEqual(option.description, 'The owner/author of your app');
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
            assert.deepEqual(prompt.message, 'Who is the owner/author of this app?');
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
            assert.deepEqual(config.owner, name);
        });

        test('Should set config name correctly on valid underscore string input', () => {
            const name = 'foo_bar';
            assert.isTrue(input.tryExtractInputValue(name, config));
            assert.deepEqual(config.owner, name);
        });

        test('Should set config name correctly on valid numeric string input', () => {
            const name = '-7';
            assert.isTrue(input.tryExtractInputValue(name, config));
            assert.deepEqual(config.owner, name);
        });
    });

    suite('promptValidate Tests:', () => {
        const getErrorMessage = (input: string): string => {
            return `Invalid owner/author name: '${input}'`;
        };

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
            assert.isTrue(prompt.validate('foo-bar'));
        });

        test('Should return true on valid underscore string input', () => {
            assert.isTrue(prompt.validate('foo_bar'));
        });

        test('Should return true on valid numeric string input', () => {
            assert.isTrue(prompt.validate('-7'));
        });
    });
});
