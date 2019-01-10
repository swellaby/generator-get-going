'use strict';

import helpers = require('yeoman-test');
import Sinon = require('sinon');
import yeomanAssert = require('yeoman-assert');

import intTestUtils = require('../../int-test-utils');
import Linter = require('../../../../generators/app/enums/linter');
import linterInput = require('../../../../generators/app/inputs/linter-input');
import testUtils = require('../../../test-utils');

suite('golint Tests:', () => {
    const prompts = testUtils.defaultPromptAnswersCopy();

    suiteSetup(() => {
        prompts[linterInput.prompt.name] = Linter.golint;
        return helpers.run(intTestUtils.generatorRoot).withPrompts(prompts).toPromise();
    });

    setup(() => {
        intTestUtils.createGitInitStub();
     });

    teardown(() => {
        Sinon.restore();
    });

    test('Should use prompt answer when option is invalid', async () => {
        const options = intTestUtils.defaultOptionsCopy();
        options[linterInput.optionName] = 'abc';
        await helpers.run(intTestUtils.generatorRoot).withOptions(options).withPrompts(prompts).toPromise();
        yeomanAssert.file(intTestUtils.commonFiles);
    });
});
