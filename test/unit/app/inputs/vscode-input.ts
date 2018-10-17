'use strict';

import chai = require('chai');

import IProjectConfig = require('../../../../generators/app/project-config');
import PromptType = require('../../.././../generators/app/inputs/prompt-type');
import vscodeInput = require('../../../../generators/app/inputs/vscode-input');

const setting = vscodeInput.setting;
const settingPrompt = setting.prompt;
const assert = chai.assert;

suite('VSCodeInput Tests:', () => {
    const expSettingName = 'vscode';
    const expSettingMessage = 'Do you use Visual Studio Code?';
    const expSettingDefault = true;

    test('Should have correct setting name', () => {
       assert.deepEqual(setting.name, expSettingName);
    });

    suite('optionConfig Tests:', () => {
        test('Should have correct option name', () => {
            assert.deepEqual(setting.optionName, expSettingName);
        });

        test('Should have correct option description', () => {
            assert.deepEqual(setting.option.description, expSettingMessage);
        });

        test('Should have correct option type', () => {
            assert.deepEqual(setting.option.type, Boolean);
        });

        test('Should have correct option default', () => {
            assert.deepEqual(setting.option.default, expSettingDefault);
        });
    });

    suite('promptConfig Tests:', () => {
        test('Should have correct prompt name', () => {
            assert.deepEqual(settingPrompt.name, expSettingName);
        });

        test('Should have correct prompt type', () => {
            assert.deepEqual(settingPrompt.type, PromptType.confirm);
        });

        test('Should have correct prompt display message', () => {
            assert.deepEqual(settingPrompt.message, expSettingMessage);
        });

        test('Should have correct prompt default', () => {
            assert.deepEqual(settingPrompt.default, expSettingDefault);
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

        test('Should return false on empty string input', () => {
            assert.isFalse(setting.tryExtractOptionValue('', config));
        });

        test('Should return false on string input', () => {
            assert.isFalse(setting.tryExtractOptionValue('foobar', config));
        });

        test('Should set config vscode correctly on false input', () => {
            assert.isTrue(setting.tryExtractOptionValue(false, config));
            assert.isFalse(config.includeVSCode);
        });

        test('Should set config vscode correctly on true input', () => {
            assert.isTrue(setting.tryExtractOptionValue(true, config));
            assert.isTrue(config.includeVSCode);
        });
    });
});