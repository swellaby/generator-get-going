'use strict';

import helpers = require('yeoman-test');
import Sinon = require('sinon');

import intTestUtils = require('../../int-test-utils');
import ProjectType = require('../../../../generators/app/enums/project-type');
import projectTypeInput = require('../../../../generators/app/inputs/type-input');
import testUtils = require('../../../test-utils');

suite('lib project Tests:', () => {
    const prompts = testUtils.defaultPromptAnswersCopy();
    let runResult: helpers.RunResult;

    suiteSetup(async () => {
        prompts[projectTypeInput.prompt.name] = ProjectType.lib;
        runResult = await helpers.create(intTestUtils.generatorRoot).withPrompts(prompts).run();
    });

    setup(() => {
        intTestUtils.createGitInitStub();
     });

    teardown(() => {
        runResult.restore();
        Sinon.restore();
    });

    test('Should include common files', () => {
        runResult.assertFile(intTestUtils.commonFilePaths);
    });
});
