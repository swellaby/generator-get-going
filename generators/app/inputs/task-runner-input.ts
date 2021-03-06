'use strict';

import YeomanGenerator = require('yeoman-generator');

import ITaskRunnerConfig = require('../interfaces/task-runner-config');
import IProjectConfig = require('../interfaces/project-config');
import IProjectInput = require('../interfaces/project-input');
import TaskRunner = require('../enums/task-runner');
import PromptType = require('../enums/prompt-type');

const inputName = 'taskRunner';

const taskRunnerMap = new Map<TaskRunner, ITaskRunnerConfig>();
taskRunnerMap.set(TaskRunner.task, {
    name: 'task',
    commandName: 'task',
    taskRunner: TaskRunner.task,
    packageInstallPath: 'github.com/go-task/task/cmd/task',
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
});

const prompt: YeomanGenerator.Question = {
    type: PromptType.list,
    name: inputName,
    message: 'Which task runner do you want to use?',
    default: TaskRunner.task,
    choices: [
        {
            name: 'task - A task runner/simpler Make alternative written in Go',
            value: TaskRunner.task
        }
    ]
};

const option: YeomanGenerator.OptionConfig = {
    type: String,
    description: 'The type of task runner to use'
};

const tryExtractInputValue = (value: unknown, projectConfig: IProjectConfig): boolean => {
    if (!value) {
        return false;
    }

    const val: string = String(value);
    const taskRunner: TaskRunner = TaskRunner[val.toLowerCase()];

    if (taskRunner === undefined) {
        return false;
    }

    projectConfig.taskRunnerConfig = taskRunnerMap.get(taskRunner);
    return true;
};

export = <IProjectInput>{
    name: inputName,
    optionName: inputName,
    option: option,
    prompt: prompt,
    tryExtractInputValue: tryExtractInputValue
};
