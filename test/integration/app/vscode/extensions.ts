'use strict';

import helpers = require('yeoman-test');
import Sinon = require('sinon');
import yeomanAssert = require('yeoman-assert');

import intTestUtils = require('../../int-test-utils');
import testUtils = require('../../../test-utils');

suite('vscode extensions Tests:', () => {
    let prompts;
    const extensionsFile = intTestUtils.vscodeExtensionsFile;

    suiteSetup(() => {
        prompts = testUtils.defaultPromptAnswersCopy();
        return helpers.run(intTestUtils.generatorRoot).withPrompts(prompts).toPromise();
    });

    setup(() => {
        intTestUtils.createGitInitStub();
     });

    teardown(() => {
        Sinon.restore();
    });

    test('Should add correct recommended extensions', () => {
        yeomanAssert.JSONFileContent(extensionsFile, {
            'recommendations': [
                'ms-vscode.Go',
                'GuardRex.status-bar-tasks',
                'streetsidesoftware.code-spell-checker',
                'eamodio.gitlens'
            ]
        });
    });
});
