'use strict';

import helpers = require('yeoman-test');
import Sinon = require('sinon');
import yeomanAssert = require('yeoman-assert');

import intTestUtils = require('../int-test-utils');
import taskRunnerInput = require('../../../generators/app/inputs/task-runner-input');
import TaskRunner = require('../../../generators/app/enums/task-runner');

suite('task-runner Tests:', () => {
    let prompts;
    suite('task Tests:', () => {
        const expTaskfile = 'Taskfile.yml';
        suiteSetup(() => {
            prompts = intTestUtils.defaultPromptAnswersCopy;
            prompts.taskRunner = TaskRunner.task;
            return helpers.run(intTestUtils.generatorRoot).withPrompts(prompts).toPromise();
        });

        setup(() => {
            intTestUtils.createGitInitStub();
         });

        teardown(() => {
            Sinon.restore();
        });

        test('Should use prompt answer when option is invalid', async () => {
            const options = intTestUtils.defaultOptionsCopy;
            options[taskRunnerInput.input.optionName] = 'abc';
            await helpers.run(intTestUtils.generatorRoot).withOptions(options).withPrompts(prompts).toPromise();
            yeomanAssert.file(expTaskfile);
        });

        test('Should create Taskfile', () => {
            yeomanAssert.file(expTaskfile);
        });
    });
});
