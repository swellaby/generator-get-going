'use strict';

import helpers = require('yeoman-test');
import Sinon = require('sinon');
import yeomanAssert = require('yeoman-assert');

import intTestUtils = require('../../int-test-utils');

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

    const tasksFile = intTestUtils.vscodeTasksFile;

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

    test('Should add correct task file version', () => {
        yeomanAssert.JSONFileContent(tasksFile, { version: '2.0.0' });
    });

    test('Should add correct tasks', () => {
        yeomanAssert.JSONFileContent(tasksFile, {
            tasks: [
                expLintTask,
                expTestTask,
                expOpenCovTask,
                expCleanTask
            ]
        });
    });
});
