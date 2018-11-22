'use strict';

import helpers = require('yeoman-test');
import Sinon = require('sinon');
import yeomanAssert = require('yeoman-assert');

import intTestUtils = require('../../int-test-utils');

suite('vscode settings Tests:', () => {
    let prompts;
    const defaultAppName = intTestUtils.name;

    const settingsFile = intTestUtils.vscodeSettingsFile;

    suiteSetup(() => {
        prompts = intTestUtils.defaultPromptAnswersCopy();
        return helpers.run(intTestUtils.generatorRoot).withPrompts(prompts).toPromise();
    });

    setup(() => {
        intTestUtils.createGitInitStub();
     });

    teardown(() => {
        Sinon.restore();
    });

    test('Should add correct exclusions configuration', () => {
        const exclusions = {
            '**/*.exe': true,
            '.coverage': true,
            '.testresults': true
        };
        exclusions[defaultAppName] = true;
        yeomanAssert.JSONFileContent(settingsFile, { 'files.exclude': exclusions });
    });

    test('Should enable cSpell extension', () => {
        yeomanAssert.JSONFileContent(settingsFile, { 'cSpell.enabled': true });
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
        yeomanAssert.JSONFileContent(settingsFile, { 'cSpell.enabledLanguageIds': expLanguageIds });
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
        yeomanAssert.JSONFileContent(settingsFile, { 'cSpell.dictionaries': expDictionaries });
    });

    test('Should include correct Go standard configuration', () => {
        yeomanAssert.JSONFileContent(settingsFile, {
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
        yeomanAssert.JSONFileContent(settingsFile, {
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
