'use strict';

import helpers = require('yeoman-test');
import Sinon = require('sinon');

import intTestUtils = require('../../int-test-utils');
import ProjectType = require('../../../../generators/app/enums/project-type');
import projectTypeInput = require('../../../../generators/app/inputs/type-input');
import testUtils = require('../../../test-utils');

suite('boilerplate project Tests:', () => {
    const prompts = testUtils.defaultPromptAnswersCopy();
    const boilerplateConfig = intTestUtils.boilerplateProjectContent;
    const commonFiles = intTestUtils.commonFilePaths;

    let runResult: helpers.RunResult;

    suiteSetup(async() => {
        prompts[projectTypeInput.prompt.name] = ProjectType.boilerplate;
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
        options[projectTypeInput.optionName] = 'abc';
        runResult = await helpers.run(intTestUtils.generatorRoot).withOptions(options).withPrompts(prompts).toPromise();
        runResult.assertFile(commonFiles);
    });

    test('Should include common files', () => {
        runResult.assertFile(commonFiles);
    });

    test('Should include boilerplate specific files', () => {
        const files = boilerplateConfig.files.map(f =>
            `${testUtils.defaultGeneratorName}/${f}`
        );
        runResult.assertFile(files);
    });

    test('Should include correct main.go file content', () => {
        const file = `${testUtils.defaultGeneratorName}/${intTestUtils.rootMainGoFileName}`;
        runResult.assertFileContent(file, boilerplateConfig.mainGoFileContentRegex);
    });
});
