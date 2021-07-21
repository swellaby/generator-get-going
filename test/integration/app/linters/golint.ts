'use strict';

import helpers = require('yeoman-test');
import Sinon = require('sinon');

import intTestUtils = require('../../int-test-utils');
import Linter = require('../../../../generators/app/enums/linter');
import linterInput = require('../../../../generators/app/inputs/linter-input');
import testUtils = require('../../../test-utils');

suite('golint Tests:', () => {
    const prompts = testUtils.defaultPromptAnswersCopy();
    let runResult: helpers.RunResult;

    suiteSetup(async () => {
        prompts[linterInput.prompt.name] = Linter.golint;
        runResult = await helpers.create(intTestUtils.generatorRoot).withPrompts(prompts).run();
    });

    setup(() => {
        intTestUtils.createGitInitStub();
     });

    teardown(() => {
        runResult.restore();
        Sinon.restore();
    });

    test('Should use prompt answer when option is invalid', async () => {
        const options = intTestUtils.defaultOptionsCopy();
        options[linterInput.optionName] = 'abc';
        runResult = await helpers.run(intTestUtils.generatorRoot).withOptions(options).withPrompts(prompts).toPromise();
        runResult.assertFile(intTestUtils.commonFiles.map(f =>
            `${testUtils.defaultGeneratorName}/${f}`
        ));
    });
});
