'use strict';

import helpers = require('yeoman-test');
import Sinon = require('sinon');

import intTestUtils = require('../../int-test-utils');
import testUtils = require('../../../test-utils');

suite('vscode extensions Tests:', () => {
    let prompts;
    const extensionsFile = `${testUtils.defaultGeneratorName}/${intTestUtils.vscodeExtensionsFile}`;
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

    test('Should add correct recommended extensions', () => {
        runResult.assertJsonFileContent(extensionsFile, {
            'recommendations': [
                'ms-vscode.Go',
                'GuardRex.status-bar-tasks',
                'streetsidesoftware.code-spell-checker',
                'eamodio.gitlens'
            ]
        });
    });
});
