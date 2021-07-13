'use strict';

import helpers = require('yeoman-test');
import Sinon = require('sinon');
import yeomanAssert = require('yeoman-assert');

import intTestUtils = require('../../int-test-utils');
import ProjectType = require('../../../../generators/app/enums/project-type');
import projectTypeInput = require('../../../../generators/app/inputs/type-input');
import testUtils = require('../../../test-utils');

suite('lib project Tests:', () => {
    const prompts = testUtils.defaultPromptAnswersCopy();

    suiteSetup(() => {
        prompts[projectTypeInput.prompt.name] = ProjectType.lib;
        return helpers.run(intTestUtils.generatorRoot).withPrompts(prompts).toPromise();
    });

    setup(() => {
        intTestUtils.createGitInitStub();
     });

    teardown(() => {
        Sinon.restore();
    });

    test('Should include common files', () => {
        yeomanAssert.file(intTestUtils.commonFilePaths);
    });
});
