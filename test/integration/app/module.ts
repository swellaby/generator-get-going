'use strict';

import chai = require('chai');
import helpers = require('yeoman-test');
import inquirer = require('inquirer');
import Sinon = require('sinon');

import moduleInput = require('../../../generators/app/inputs/module-input');
import nameInput = require('../../../generators/app/inputs/name-input');
import ownerInput = require('../../../generators/app/inputs/owner-input');
import testUtils = require('../../test-utils');
import intTestUtils = require('../int-test-utils');

const assert = chai.assert;

suite('module Tests:', () => {
    let prompts = testUtils.defaultPromptAnswersCopy();
    const expGoModFile = `${testUtils.defaultGeneratorName}/${intTestUtils.goModFileName}`;
    const modOptionName = moduleInput.optionName;
    const modPromptName = moduleInput.prompt.name;
    const namePromptName = nameInput.prompt.name;
    const ownerPromptName = ownerInput.prompt.name;
    const expDefaultModuleName = intTestUtils.moduleName;
    const prompt = <inquirer.InputQuestion<Record<string, unknown>>>moduleInput.prompt;
    let runResult: helpers.RunResult;

    suiteSetup(async () => {
        runResult = await helpers.create(intTestUtils.generatorRoot).withPrompts(prompts).run();
    });

    setup(() => {
        prompts = testUtils.defaultPromptAnswersCopy();
        intTestUtils.createGitInitStub();
     });

    teardown(() => {
        runResult.restore();
        Sinon.restore();
    });

    test('Should include go.mod file', () => {
        runResult.assertFile(expGoModFile);
    });

    test('Should include correct module name', () => {
        runResult.assertFileContent(expGoModFile, `module ${expDefaultModuleName}`);
    });

    test('Should use provided module name when valid prompt answer', async () => {
        const expModuleName = 'github.com/caleb/abc';
        prompts[modPromptName] = expModuleName;
        runResult = await helpers.create(intTestUtils.generatorRoot).withPrompts(prompts).run();
        runResult.assertFileContent(expGoModFile, `module ${expModuleName}`);
    });

    test('Should use provided module name based on name and owner answers', async () => {
        const expName = 'awesome';
        const expOwner = 'caleb';
        prompts[namePromptName] = expName;
        prompts[ownerPromptName] = expOwner;
        prompts[modPromptName] = '';
        const file = `${expName}/${intTestUtils.goModFileName}`;
        runResult = await helpers.create(intTestUtils.generatorRoot).withPrompts(prompts).run();
        runResult.assertFileContent(file, `module github.com/${expOwner}/${expName}`);
    });

    test('Should use prompt answer for module name when invalid option is provided', async () => {
        const options = intTestUtils.defaultOptionsCopy();
        options[modOptionName] = '';
        runResult = await helpers.create(intTestUtils.generatorRoot)
            .withOptions(options)
            .withPrompts(prompts)
            .run();
        runResult.assertFileContent(expGoModFile, `module ${expDefaultModuleName}`);
    });

    test('Should use option module name when valid option is provided', async () => {
        const expModuleName = 'github.com/swellaby/foo';
        const options = intTestUtils.defaultOptionsCopy();
        options[modOptionName] = expModuleName;
        runResult = await helpers.create(intTestUtils.generatorRoot)
            .withOptions(options)
            .withPrompts(prompts)
            .run();
        runResult.assertFileContent(expGoModFile, `module ${expModuleName}`);
    });

    test('Should return true when validate function called with valid value', () => {
        assert.isTrue(prompt.validate(expDefaultModuleName));
    });

    test('Should return correct error when validate function called with invalid value', () => {
        const invalidModuleName = 'abc';
        const expErrorMessage = testUtils.getModuleNameValidationErrorMessage(invalidModuleName);
        const msg = prompt.validate(invalidModuleName);
        assert.deepEqual(msg, expErrorMessage);
    });
});
