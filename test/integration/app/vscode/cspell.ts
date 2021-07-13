'use strict';

import helpers = require('yeoman-test');
import Sinon = require('sinon');
import yeomanAssert = require('yeoman-assert');

import intTestUtils = require('../../int-test-utils');
import testUtils = require('../../../test-utils');

suite('vscode cSpell Tests:', () => {
    const prompts = testUtils.defaultPromptAnswersCopy();
    const cSpellFile = `${testUtils.defaultGeneratorName}/${intTestUtils.vscodeCSpellFile}`;
    const expWords = [
        'circleci',
        'cmds',
        'cobertura',
        'codecov',
        'coverprofile',
        'deps',
        'githook',
        'gitignore',
        'gocov',
        'godoc',
        'gofmt',
        'golint',
        'gotest',
        'gotestsum',
        'govet',
        'jsonfile',
        'junit',
        'junitfile',
        'matm',
        'nospace',
        'letsgo',
        'opensource',
        'repo',
        'semver',
        'sonarqube',
        'swellaby',
        'testresults'
    ];

    suiteSetup(() => {
        return helpers.run(intTestUtils.generatorRoot).withPrompts(prompts).toPromise();
    });

    setup(() => {
        intTestUtils.createGitInitStub();
     });

    teardown(() => {
        Sinon.restore();
    });

    test('Should add correct cSpell configuration', () => {
        yeomanAssert.JSONFileContent(cSpellFile, {
            'version': '0.1',
            'language': 'en',
            'words': expWords,
            'flagWords': [ ]
        });
    });
});
