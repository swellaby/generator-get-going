'use strict';

import helpers = require('yeoman-test');
import Sinon = require('sinon');

import intTestUtils = require('../../int-test-utils');
import testUtils = require('../../../test-utils');

suite('vscode launch Tests:', () => {
    let prompts;
    const launchFile = `${testUtils.defaultGeneratorName}/${intTestUtils.vscodeLaunchFile}`;
    let runResult: helpers.RunResult;

    suiteSetup(async () => {
        prompts = testUtils.defaultPromptAnswersCopy();
        runResult = await helpers.create(intTestUtils.generatorRoot).withPrompts(prompts).run();
    });

    setup(() => {
        intTestUtils.createGitInitStub();
     });

    teardown(() => {
        runResult.restore();
        Sinon.restore();
    });

    test('Should add correct launch file', () => {
        runResult.assertJsonFileContent(launchFile, {
            version: '0.2.0',
            configurations: []
        });
    });
});
