'use strict';

import chai = require('chai');
import helpers = require('yeoman-test');
import Sinon = require('sinon');
import yeomanAssert = require('yeoman-assert');

import moduleInput = require('../../../generators/app/inputs/module-input');
import ownerInput = require('../../../generators/app/inputs/owner-input');

import testUtils = require('../../test-utils');
import intTestUtils = require('../int-test-utils');

const assert = chai.assert;

suite('owner Tests:', () => {
    let prompts = testUtils.defaultPromptAnswersCopy();
    const promptName = ownerInput.prompt.name;
    const optionName = ownerInput.optionName;
    const modPromptName = moduleInput.prompt.name;
    const modOptionName = moduleInput.optionName;
    const goModFile = intTestUtils.goModFileName;

    const buildGoModuleName = (owner: string) => {
        return `github.com/${owner}/${intTestUtils.name}`;
    };

    suiteSetup(() => {
        return helpers.run(intTestUtils.generatorRoot).withPrompts(prompts).toPromise();
    });

    setup(() => {
        prompts = testUtils.defaultPromptAnswersCopy();
        intTestUtils.createGitInitStub();
     });

    teardown(() => {
        Sinon.restore();
    });

    test('Should use provided owner in module name when valid prompt answer', async () => {
        const owner = 'caleb';
        prompts[promptName] = owner;
        prompts[modPromptName] = '';
        const expModuleName = buildGoModuleName(owner);
        await helpers.run(intTestUtils.generatorRoot).withPrompts(prompts).toPromise();
        yeomanAssert.fileContent(goModFile, `module ${expModuleName}`);
    });

    test('Should use prompt answer for owner name when invalid option is provided', async () => {
        const options = intTestUtils.defaultOptionsCopy();
        options[optionName] = '';
        await helpers.run(intTestUtils.generatorRoot)
            .withOptions(options)
            .withPrompts(prompts)
            .toPromise();
        yeomanAssert.fileContent(goModFile, `module ${intTestUtils.moduleName}`);
    });

    test('Should use option module name when valid option is provided', async () => {
        const owner = 'google';
        const options = intTestUtils.defaultOptionsCopy();
        options[optionName] = owner;
        options[modOptionName] = '';
        prompts[modPromptName] = '';
        const expModuleName = buildGoModuleName(owner);
        await helpers.run(intTestUtils.generatorRoot)
            .withOptions(options)
            .withPrompts(prompts)
            .toPromise();
        yeomanAssert.fileContent(goModFile, `module ${expModuleName}`);
    });

    test('Should return true when validate function called with valid value', () => {
        assert.isTrue(ownerInput.prompt.validate(intTestUtils.owner));
    });

    test('Should return correct error when validate function called with invalid value', () => {
        const invalidOwnerName = '/)\\345had7_/*&';
        const msg = ownerInput.prompt.validate(invalidOwnerName);
        assert.deepEqual(msg, `Invalid owner/author name: '${invalidOwnerName}'`);
    });
});
