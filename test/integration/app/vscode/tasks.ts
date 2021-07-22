'use strict';

import helpers = require('yeoman-test');
import Sinon = require('sinon');

import intTestUtils = require('../../int-test-utils');
import testUtils = require('../../../test-utils');

suite('vscode tasks Tests:', () => {
    let prompts;
    const expLintTask = {
        label: 'lint',
        command: 'task lint',
        type: 'shell'
    };
    const expTestTask = {
        label: 'test',
        command: 'task test',
        type: 'shell',
        group: {
            kind: 'test',
            isDefault: true
        }
    };
    const expOpenCovTask = {
        label: 'coverage:open',
        command: 'task open-cov',
        type: 'shell',
        group: 'test'
    };
    const expCleanTask = {
        label: 'clean',
        command: 'task clean',
        type: 'shell'
    };

    const tasksFile = `${testUtils.defaultGeneratorName}/${intTestUtils.vscodeTasksFile}`;
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

    test('Should add correct task file version', () => {
        runResult.assertJsonFileContent(tasksFile, { version: '2.0.0' });
    });

    test('Should add correct tasks', () => {
        runResult.assertJsonFileContent(tasksFile, {
            tasks: [
                expLintTask,
                expTestTask,
                expOpenCovTask,
                expCleanTask
            ]
        });
    });
});
