'use strict';

import helpers = require('yeoman-test');
import Sinon = require('sinon');
import yeomanAssert = require('yeoman-assert');

import intTestUtils = require('../../int-test-utils');
import testUtils = require('../../../test-utils');

suite('vscode launch Tests:', () => {
    let prompts;
    const launchFile = `${testUtils.defaultGeneratorName}/${intTestUtils.vscodeLaunchFile}`;

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

    test('Should add correct launch file', () => {
        yeomanAssert.JSONFileContent(launchFile, {
            version: '0.2.0',
            configurations: []
        });
    });
});
