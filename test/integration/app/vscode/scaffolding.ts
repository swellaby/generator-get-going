'use strict';

import helpers = require('yeoman-test');
import Sinon = require('sinon');

import intTestUtils = require('../../int-test-utils');
import testUtils = require('../../../test-utils');
import vscodeInput = require('../../../../generators/app/inputs/vscode-input');

suite('vscode scaffolding Tests:', () => {
    let prompts;
    let options;
    const vscodeFiles = intTestUtils.vsCodeFiles.map(f => `${testUtils.defaultGeneratorName}/${f}`);
    const promptName = vscodeInput.prompt.name;
    const optionName = vscodeInput.optionName;

    setup(() => {
        prompts = testUtils.defaultPromptAnswersCopy();
        options = intTestUtils.defaultOptionsCopy();
        intTestUtils.createGitInitStub();
     });

    teardown(() => {
        Sinon.restore();
    });

    test('Should add vscode files when prompt is answered in the affirmative', async () => {
        prompts[promptName] = true;
        const runResult = await helpers.create(intTestUtils.generatorRoot).withPrompts(prompts).run();
        runResult.assertFile(vscodeFiles);
    });

    test('Should not add vscode files when prompt is answered in the negative', async () => {
        prompts[promptName] = false;
        const runResult = await helpers.create(intTestUtils.generatorRoot).withPrompts(prompts).run();
        runResult.assertNoFile(vscodeFiles);
    });

    test('Should add vscode files when option is included', async () => {
        options[optionName] = true;
        const runResult = await helpers.run(intTestUtils.generatorRoot)
            .withOptions(options)
            .withPrompts(prompts)
            .toPromise();
        runResult.assertFile(vscodeFiles);
    });
});
