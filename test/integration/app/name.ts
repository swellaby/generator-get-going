'use strict';

import chai = require('chai');
import helpers = require('yeoman-test');
import Sinon = require('sinon');
import yeomanAssert = require('yeoman-assert');

import nameInput = require('../../../generators/app/inputs/name-input');
import intTestUtils = require('../int-test-utils');

const assert = chai.assert;

suite('name Tests:', () => {
    let prompts = intTestUtils.defaultPromptAnswersCopy();
    const promptName = nameInput.prompt.name;
    const optionName = nameInput.optionName;
    const readmeFile = intTestUtils.readmeFileName;

    suiteSetup(() => {
        return helpers.run(intTestUtils.generatorRoot).withPrompts(prompts).toPromise();
    });

    setup(() => {
        prompts = intTestUtils.defaultPromptAnswersCopy();
        intTestUtils.createGitInitStub();
     });

    teardown(() => {
        Sinon.restore();
    });

    test('Should include correct name in readme header', () => {
        yeomanAssert.fileContent(readmeFile, `# ${intTestUtils.name}`);
    });

    test('Should use provided name when valid prompt answer', async () => {
        const expName = 'awesomeness';
        prompts[promptName] = expName;
        await helpers.run(intTestUtils.generatorRoot).withPrompts(prompts).toPromise();
        yeomanAssert.fileContent(readmeFile, `# ${expName}`);
    });

    test('Should use prompt answer for module name when invalid option is provided', async () => {
        const options = intTestUtils.defaultOptionsCopy();
        options[optionName] = '';
        await helpers.run(intTestUtils.generatorRoot)
            .withOptions(options)
            .withPrompts(prompts)
            .toPromise();
        yeomanAssert.fileContent(readmeFile, `# ${intTestUtils.name}`);
    });

    test('Should use option module name when valid option is provided', async () => {
        const expName = 'go-getter';
        const options = intTestUtils.defaultOptionsCopy();
        options[optionName] = expName;
        await helpers.run(intTestUtils.generatorRoot)
            .withOptions(options)
            .withPrompts(prompts)
            .toPromise();
        yeomanAssert.fileContent(readmeFile, `# ${expName}`);
    });

    test('Should return true when validate function called with valid value', () => {
        assert.isTrue(nameInput.prompt.validate(intTestUtils.name));
    });

    test('Should return correct error when validate function called with invalid value', () => {
        const invalidAppName = '(*^&$&^*//)\\6ad7_/*&';
        const msg = nameInput.prompt.validate(invalidAppName);
        assert.deepEqual(msg, `Invalid app name: '${invalidAppName}'`);
    });
});
