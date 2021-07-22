'use strict';

import helpers = require('yeoman-test');
import Sinon = require('sinon');

import intTestUtils = require('../../int-test-utils');
import testUtils = require('../../../test-utils');

suite('vscode settings Tests:', () => {
    let prompts;
    const defaultAppName = intTestUtils.name;
    const settingsFile = `${testUtils.defaultGeneratorName}/${intTestUtils.vscodeSettingsFile}`;
    let runResult: helpers.RunResult;

    suiteSetup(async () => {
        prompts = testUtils.defaultPromptAnswersCopy();
        runResult = await helpers.create(intTestUtils.generatorRoot).withPrompts(prompts).run();
    });

    setup(() => {
        intTestUtils.createGitInitStub();
     });

    teardown(() => {
        runResult.restore();
        Sinon.restore();
    });

    test('Should add correct exclusions configuration', () => {
        const exclusions = {
            '**/*.exe': true,
            '.coverage': true,
            '.testresults': true
        };
        exclusions[defaultAppName] = true;
        runResult.assertJsonFileContent(settingsFile, { 'files.exclude': exclusions });
    });

    test('Should enable cSpell extension', () => {
        runResult.assertJsonFileContent(settingsFile, { 'cSpell.enabled': true });
    });

    test('Should enable correct cSpell languages', () => {
        const expLanguageIds = [
            'asciidoc',
            'go',
            'html',
            'json',
            'markdown',
            'plaintext',
            'text',
            'yaml',
            'yml'
        ];
        runResult.assertJsonFileContent(settingsFile, { 'cSpell.enabledLanguageIds': expLanguageIds });
    });

    test('Should enable correct cSpell dictionaries', () => {
        const expDictionaries = [
            'companies',
            'en_us',
            'filetypes',
            'golang',
            'misc',
            'softwareTerms'
        ];
        runResult.assertJsonFileContent(settingsFile, { 'cSpell.dictionaries': expDictionaries });
    });

    test('Should include correct Go standard configuration', () => {
        runResult.assertJsonFileContent(settingsFile, {
            'go.autocompleteUnimportedPackages': false,
            'go.vetOnSave': 'workspace',
            'go.testOnSave': false,
            'go.formatTool': 'gofmt',
            'go.buildTags': 'vscode',
            '[go]': {
                'editor.formatOnSave': true
            }
        });
    });

    test('Should include correct Go coverage configuration', () => {
        runResult.assertJsonFileContent(settingsFile, {
            'go.coverageOptions': 'showBothCoveredAndUncoveredCode',
            'go.coverageDecorator': {
                'type': 'highlight',
                'coveredHighlightColor': 'rgba(64,128,128,0.5)',
                'uncoveredHighlightColor': 'rgba(128,64,64,0.25)',
                'coveredGutterStyle': 'blockblue',
                'uncoveredGutterStyle': 'slashyellow'
            }
        });
    });
});
