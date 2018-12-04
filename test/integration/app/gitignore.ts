'use strict';

import helpers = require('yeoman-test');
import Sinon = require('sinon');
import yeomanAssert = require('yeoman-assert');

import nameInput = require('../../../generators/app/inputs/name-input');
import intTestUtils = require('../int-test-utils');

suite('gitignore Tests:', () => {
    const prompts = intTestUtils.defaultPromptAnswersCopy();
    const gitignoreFile = intTestUtils.gitIgnoreFileName;
    const promptName = nameInput.prompt.name;

    suiteSetup(() => {
        return helpers.run(intTestUtils.generatorRoot).withPrompts(prompts).toPromise();
    });

    setup(() => {
        intTestUtils.createGitInitStub();
     });

    teardown(() => {
        Sinon.restore();
    });

    test('Should include gitignore file', () => {
        yeomanAssert.file(gitignoreFile);
    });

    test('Should include line to exclude coverage reports', () => {
        yeomanAssert.fileContent(gitignoreFile, '.coverage');
    });

    test('Should include line to exclude test results reports', () => {
        yeomanAssert.fileContent(gitignoreFile, '.testresults');
    });

    test('Should include line to exclude .exe files', () => {
        yeomanAssert.fileContent(gitignoreFile, '**/*.exe');
    });

    test('Should include line to exclude unix binary', async () => {
        const expName = 'awesomeness';
        prompts[promptName] = expName;
        await helpers.run(intTestUtils.generatorRoot).withPrompts(prompts).toPromise();
        yeomanAssert.fileContent(gitignoreFile, `${expName}`);
        yeomanAssert.fileContent(gitignoreFile, `!${expName}/`);
    });
});
