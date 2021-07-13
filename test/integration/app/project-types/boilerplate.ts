'use strict';

import helpers = require('yeoman-test');
import Sinon = require('sinon');
import yeomanAssert = require('yeoman-assert');

import intTestUtils = require('../../int-test-utils');
import ProjectType = require('../../../../generators/app/enums/project-type');
import projectTypeInput = require('../../../../generators/app/inputs/type-input');
import testUtils = require('../../../test-utils');

suite('boilerplate project Tests:', () => {
    const prompts = testUtils.defaultPromptAnswersCopy();
    const boilerplateConfig = intTestUtils.boilerplateProjectContent;
    const commonFiles = intTestUtils.commonFiles.map(f =>
        `${testUtils.defaultGeneratorName}/${f}`
    );

    suiteSetup(() => {
        prompts[projectTypeInput.prompt.name] = ProjectType.boilerplate;
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
        options[projectTypeInput.optionName] = 'abc';
        await helpers.run(intTestUtils.generatorRoot).withOptions(options).withPrompts(prompts).toPromise();
        yeomanAssert.file(commonFiles);
    });

    test('Should include common files', () => {
        yeomanAssert.file(commonFiles);
    });

    test('Should include boilerplate specific files', () => {
        const files = boilerplateConfig.files.map(f =>
            `${testUtils.defaultGeneratorName}/${f}`
        );
        yeomanAssert.file(files);
    });

    test('Should include correct main.go file content', () => {
        const file = `${testUtils.defaultGeneratorName}/${intTestUtils.rootMainGoFileName}`;
        yeomanAssert.fileContent(file, boilerplateConfig.mainGoFileContentRegex);
    });
});
