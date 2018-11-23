'use strict';

import helpers = require('yeoman-test');
import Sinon = require('sinon');
import yeomanAssert = require('yeoman-assert');

import intTestUtils = require('../int-test-utils');

suite('readme Tests:', () => {
    const prompts = intTestUtils.defaultPromptAnswersCopy();
    const readmeFile = intTestUtils.readmeFileName;
    const spaceRegex = intTestUtils.spaceRegex;

    suiteSetup(() => {
        return helpers.run(intTestUtils.generatorRoot).withPrompts(prompts).toPromise();
    });

    setup(() => {
        intTestUtils.createGitInitStub();
     });

    teardown(() => {
        Sinon.restore();
    });

    test('Should include correct name in readme header', () => {
        yeomanAssert.fileContent(readmeFile, `# ${intTestUtils.name}`);
    });

    test('Should include description in readme', () => {
        yeomanAssert.fileContent(readmeFile, `${intTestUtils.description}`);
    });

    test('Should include parent generator anchor', () => {
        const readmeGeneratorOriginText = `Initially created by this \\[swell generator\\]\\[parent-generator-url\\]\\!`;
        const readmeGeneratorUrlVariableText = `\\[parent-generator-url\\]: https://github.com/swellaby/generator-lets-go`;
        let regex = `### Generator${spaceRegex}`;
        regex += `${readmeGeneratorOriginText}${spaceRegex}${readmeGeneratorUrlVariableText}`;
        yeomanAssert.fileContent(readmeFile, new RegExp(regex));
    });
});
