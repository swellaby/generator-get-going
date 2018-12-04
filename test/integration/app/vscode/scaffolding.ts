'use strict';

import helpers = require('yeoman-test');
import Sinon = require('sinon');
import yeomanAssert = require('yeoman-assert');

import intTestUtils = require('../../int-test-utils');
import vscodeInput = require('../../../../generators/app/inputs/vscode-input');

suite('vscode scaffolding Tests:', () => {
    let prompts;
    let options;
    const vscodeFiles = intTestUtils.vsCodeFiles;
    const promptName = vscodeInput.prompt.name;
    const optionName = vscodeInput.optionName;

    setup(() => {
        prompts = intTestUtils.defaultPromptAnswersCopy();
        options = intTestUtils.defaultOptionsCopy();
        intTestUtils.createGitInitStub();
     });

    teardown(() => {
        Sinon.restore();
    });

    test('Should add vscode files when prompt is answered in the affirmative', async () => {
        prompts[promptName] = true;
        await helpers.run(intTestUtils.generatorRoot).withPrompts(prompts).toPromise();
        yeomanAssert.file(vscodeFiles);
    });

    test('Should not add vscode files when prompt is answered in the negative', async () => {
        prompts[promptName] = false;
        await helpers.run(intTestUtils.generatorRoot).withPrompts(prompts).toPromise();
        yeomanAssert.noFile(vscodeFiles);
    });

    test('Should add vscode files when option is included', async () => {
        options[optionName] = true;
        await helpers.run(intTestUtils.generatorRoot)
            .withOptions(options)
            .withPrompts(prompts)
            .toPromise();
        yeomanAssert.file(vscodeFiles);
    });
});
