'use strict';

import chai = require('chai');

import descriptionInput = require('../../../../generators/app/inputs/description-input');
import IProjectConfig = require('../../../../generators/app/interfaces/project-config');
import PromptType = require('../../../../generators/app/enums/prompt-type');

const input = descriptionInput.input;
const prompt = input.prompt;
const assert = chai.assert;

suite('DescriptionInput Tests:', () => {
    const expSettingName = 'description';

    test('Should have correct setting name', () => {
       assert.deepEqual(input.name, expSettingName);
    });

    suite('optionConfig Tests:', () => {
        test('Should have correct option name', () => {
            assert.deepEqual(input.optionName, expSettingName);
        });

        test('Should have correct option description', () => {
            assert.deepEqual(input.option.description, 'The description of your app');
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
            assert.deepEqual(prompt.message, 'What is the description/purpose of your app?');
        });

        test('Should have correct default value', () => {
            assert.deepEqual(prompt.default, undefined);
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

        test('Should return true on any string input', () => {
            assert.isTrue(input.tryExtractInputValue('rule the world!', config));
        });
    });
});