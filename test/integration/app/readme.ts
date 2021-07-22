'use strict';

import helpers = require('yeoman-test');
import Sinon = require('sinon');

import testUtils = require('../../test-utils');
import intTestUtils = require('../int-test-utils');

suite('readme Tests:', () => {
    const prompts = testUtils.defaultPromptAnswersCopy();
    const readmeFile = `${testUtils.defaultGeneratorName}/${intTestUtils.readmeFileName}`;
    const spaceRegex = intTestUtils.spaceRegex;
    let runResult: helpers.RunResult;

    suiteSetup(async () => {
        runResult = await helpers.create(intTestUtils.generatorRoot).withPrompts(prompts).run();
    });

    setup(() => {
        intTestUtils.createGitInitStub();
     });

    teardown(() => {
        runResult.restore();
        Sinon.restore();
    });

    test('Should include correct name in readme header', () => {
        runResult.assertFileContent(readmeFile, `# ${intTestUtils.name}`);
    });

    test('Should include description in readme', () => {
        runResult.assertFileContent(readmeFile, `${intTestUtils.description}`);
    });

    test('Should include parent generator anchor', () => {
        const readmeGeneratorOriginText = `Initially created by this \\[swell generator\\]\\[parent-generator-url\\]\\!`;
        const readmeGeneratorUrlVariableText = `\\[parent-generator-url\\]: https://github.com/swellaby/generator-get-going`;
        let regex = `### Generator${spaceRegex}`;
        regex += `${readmeGeneratorOriginText}${spaceRegex}${readmeGeneratorUrlVariableText}`;
        runResult.assertFileContent(readmeFile, new RegExp(regex));
    });
});
