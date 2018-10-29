'use strict';

import chai = require('chai');

import ITaskRunnerConfig = require('../../../../generators/app/interfaces/task-runner-config');
import IProjectConfig = require('../../../../generators/app/interfaces/project-config');
import TaskRunner = require('../../../../generators/app/enums/task-runner');
import taskRunnerInput = require('../../../../generators/app/inputs/task-runner-input');
import PromptType = require('../../../../generators/app/enums/prompt-type');

const input = taskRunnerInput.input;
const prompt = input.prompt;
const assert = chai.assert;

suite('TaskRunnerInput Tests:', () => {
    const expSettingName = 'taskRunner';

    test('Should have correct setting name', () => {
       assert.deepEqual(input.name, expSettingName);
    });

    suite('optionConfig Tests:', () => {
        test('Should have correct option name', () => {
            assert.deepEqual(input.optionName, expSettingName);
        });

        test('Should have correct option description', () => {
            assert.deepEqual(input.option.description, 'The type of task runner to use');
        });

        test('Should have correct option default', () => {
            assert.deepEqual(input.option.default, undefined);
        });
    });

    suite('promptConfig Tests:', () => {
        test('Should have correct prompt name', () => {
            assert.deepEqual(prompt.name, expSettingName);
        });

        test('Should have correct prompt type', () => {
            assert.deepEqual(prompt.type, PromptType.list);
        });

        test('Should have correct prompt display message', () => {
            assert.deepEqual(prompt.message, 'Which task runner do you want to use?');
        });

        test('Should have correct default value', () => {
            assert.deepEqual(prompt.default, TaskRunner.task);
        });

        suite('choices Tests:', () => {
            const choices = prompt.choices;

            test('Should have correct number of choices', () => {
                assert.deepEqual(choices.length, 1);
            });

            test('Should have correct task choice', () => {
                const choice = choices[0];
                assert.deepEqual(choice.name, 'task - A task runner/simpler Make alternative written in Go');
                assert.deepEqual(choice.value, TaskRunner.task);
            });
        });
    });

    suite('tryExtractInputValue Tests:', () => {
        let config: IProjectConfig;
        const task = 'task';
        const expTaskPackageInstallPath = 'github.com/go-task/task/cmd/task';
        const expTaskTaskRunnerConfig = <ITaskRunnerConfig>{
            name: task,
            commandName: task,
            taskRunner: TaskRunner.task,
            packageInstallPath: expTaskPackageInstallPath,
            taskScriptNames: {
                ci: 'ci',
                clean: 'clean',
                coverage: 'coverage',
                format: 'fmt',
                install: 'install',
                lint: 'lint',
                openCoverage: 'open-cov',
                setup: 'setup',
                test: 'test',
                vet: 'vet'
            }
        };

        setup(() => {
            config = <IProjectConfig>{};
        });

        teardown(() => {
            config = null;
        });

        test('Should return false when value is null', () => {
            assert.isFalse(input.tryExtractInputValue(null, null));
        });

        test('Should return false when value is undefined', () => {
            assert.isFalse(input.tryExtractInputValue(undefined, config));
        });

        test('Should return false on unknown string input', () => {
            assert.isFalse(input.tryExtractInputValue('foobar', config));
        });

        test('Should return false on boolean input', () => {
            assert.isFalse(input.tryExtractInputValue(true, config));
        });

        test('Should return false on numeric input', () => {
            assert.isFalse(input.tryExtractInputValue(-7, config));
        });

        test('Should set config to boilerplate project type on lowercase key string input', () => {
            assert.isTrue(input.tryExtractInputValue(task, config));
            assert.deepEqual(config.taskRunnerConfig, expTaskTaskRunnerConfig);
        });

        test('Should set config to boilerplate project type on uppercase key string input', () => {
            assert.isTrue(input.tryExtractInputValue('TASK', config));
            assert.deepEqual(config.taskRunnerConfig, expTaskTaskRunnerConfig);
        });

        test('Should set config to boilerplate project type on mixed case key string input', () => {
            assert.isTrue(input.tryExtractInputValue('tAsK', config));
            assert.deepEqual(config.taskRunnerConfig, expTaskTaskRunnerConfig);
        });
    });
});