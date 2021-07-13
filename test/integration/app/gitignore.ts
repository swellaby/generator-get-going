'use strict';

import helpers = require('yeoman-test');
import Sinon = require('sinon');
import yeomanAssert = require('yeoman-assert');

import nameInput = require('../../../generators/app/inputs/name-input');
import intTestUtils = require('../int-test-utils');
import testUtils = require('../../test-utils');

suite('gitignore Tests:', () => {
    const prompts = testUtils.defaultPromptAnswersCopy();
    const promptName = nameInput.prompt.name;
    const gitignoreFile = `${prompts[promptName]}/${intTestUtils.gitIgnoreFileName}`;
    let runResult: helpers.RunResult;

    suiteSetup(async () => {
        runResult = await helpers.create(intTestUtils.generatorRoot).withPrompts(prompts).run();
    });

    setup(() => {
        intTestUtils.createGitInitStub();
    });

    teardown(() => {
        runResult.restore();
        Sinon.restore();
    });

    test('Should include gitignore file', () => {
        runResult.assertFile(gitignoreFile);
    });

    test('Should include line to exclude coverage reports', () => {
        runResult.assertFileContent(gitignoreFile, '.coverage');
    });

    test('Should include line to exclude test results reports', () => {
        runResult.assertFileContent(gitignoreFile, '.testresults');
    });

    test('Should include line to exclude .exe files', () => {
        runResult.assertFileContent(gitignoreFile, '**/*.exe');
    });

    test('Should include line to exclude unix binary', async () => {
        const expName = 'awesomeness';
        prompts[promptName] = expName;
        const targetFile = `${expName}/${intTestUtils.gitIgnoreFileName}`;
        runResult = await helpers.create(intTestUtils.generatorRoot).withPrompts(prompts).run();
        runResult.assertFileContent(targetFile, `${expName}`);
        runResult.assertFileContent(targetFile, `!${expName}/`);
    });
});
