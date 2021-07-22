'use strict';

import chai = require('chai');
import helpers = require('yeoman-test');
import inquirer = require('inquirer');
import Sinon = require('sinon');

import nameInput = require('../../../generators/app/inputs/name-input');
import intTestUtils = require('../int-test-utils');
import testUtils = require('../../test-utils');

const assert = chai.assert;

suite('name Tests:', () => {
    let prompts = testUtils.defaultPromptAnswersCopy();
    const promptName = nameInput.prompt.name;
    const optionName = nameInput.optionName;
    const readmeFile = `${testUtils.defaultGeneratorName}/${intTestUtils.readmeFileName}`;
    const prompt = <inquirer.InputQuestion<Record<string, unknown>>>nameInput.prompt;
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

    test('Should include correct name in readme header', () => {
        runResult.assertFileContent(readmeFile, `# ${intTestUtils.name}`);
    });

    test('Should use provided name when valid prompt answer', async () => {
        const expName = 'awesomeness';
        prompts[promptName] = expName;
        const file = `${expName}/${intTestUtils.readmeFileName}`;
        runResult = await helpers.create(intTestUtils.generatorRoot).withPrompts(prompts).run();
        runResult.assertFileContent(file, `# ${expName}`);
    });

    test('Should use prompt answer for module name when invalid option is provided', async () => {
        const options = intTestUtils.defaultOptionsCopy();
        options[optionName] = '';
        runResult = await helpers.create(intTestUtils.generatorRoot)
            .withOptions(options)
            .withPrompts(prompts)
            .run();
        runResult.assertFileContent(readmeFile, `# ${intTestUtils.name}`);
    });

    test('Should use option module name when valid option is provided', async () => {
        const expName = 'go-getter';
        const options = intTestUtils.defaultOptionsCopy();
        options[optionName] = expName;
        const file = `${expName}/${intTestUtils.readmeFileName}`;
        runResult = await helpers.create(intTestUtils.generatorRoot)
            .withOptions(options)
            .withPrompts(prompts)
            .run();
        runResult.assertFileContent(file, `# ${expName}`);
    });

    test('Should return true when validate function called with valid value', () => {
        assert.isTrue(prompt.validate(intTestUtils.name));
    });

    test('Should return correct error when validate function called with invalid value', () => {
        const invalidAppName = '(*^&$&^*//)\\6ad7_/*&';
        const msg = prompt.validate(invalidAppName);
        assert.deepEqual(msg, `Invalid app name: '${invalidAppName}'`);
    });
});
