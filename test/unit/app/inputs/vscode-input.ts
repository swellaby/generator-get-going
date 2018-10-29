'use strict';

import chai = require('chai');

import IProjectConfig = require('../../../../generators/app/interfaces/project-config');
import PromptType = require('../../../../generators/app/enums/prompt-type');
import vscodeInput = require('../../../../generators/app/inputs/vscode-input');

const input = vscodeInput.input;
const prompt = input.prompt;
const assert = chai.assert;

suite('VSCodeInput Tests:', () => {
    const expSettingName = 'vscode';
    const expSettingMessage = 'Do you use Visual Studio Code?';
    const expSettingDefault = true;

    test('Should have correct setting name', () => {
       assert.deepEqual(input.name, expSettingName);
    });

    suite('optionConfig Tests:', () => {
        test('Should have correct option name', () => {
            assert.deepEqual(input.optionName, expSettingName);
        });

        test('Should have correct option description', () => {
            assert.deepEqual(input.option.description, expSettingMessage);
        });

        test('Should have correct option type', () => {
            assert.deepEqual(input.option.type, Boolean);
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
            assert.deepEqual(prompt.type, PromptType.confirm);
        });

        test('Should have correct prompt display message', () => {
            assert.deepEqual(prompt.message, expSettingMessage);
        });

        test('Should have correct prompt default', () => {
            assert.deepEqual(prompt.default, expSettingDefault);
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

        test('Should return false on string input', () => {
            assert.isFalse(input.tryExtractInputValue('foobar', config));
        });

        test('Should set config vscode correctly on false input', () => {
            assert.isTrue(input.tryExtractInputValue(false, config));
            assert.isFalse(config.includeVSCode);
        });

        test('Should set config vscode correctly on true input', () => {
            assert.isTrue(input.tryExtractInputValue(true, config));
            assert.isTrue(config.includeVSCode);
        });
    });
});