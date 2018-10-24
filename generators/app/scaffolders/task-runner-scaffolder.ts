'use strict';

import YeomanGenerator = require('yeoman-generator');

import IProjectConfig = require('../interfaces/project-config');
import IProjectScaffolder = require('../interfaces/project-scaffolder');
import ITaskRunnerConfig = require('../interfaces/task-runner-config');
import TaskRunner = require('../enums/task-runner');
import utils = require('../utils');

const taskRunnerTemplateRoot = utils.taskRunnerTemplatesRootPath;
const fromPatternMap = new Map<TaskRunner, string>();
fromPatternMap.set(TaskRunner.task, `${taskRunnerTemplateRoot}/task/**/*`);

/**
 * Scaffolds the Task Runner content.
 *
 * @param {YeomanGenerator} generator - The yeoman generator instance.
 * @param {IProjectConfig} config - The project configuration.
 * @private
 */
const scaffoldTaskRunnerContent = (generator: YeomanGenerator, config: IProjectConfig) => {
    const taskRunnerConfig: ITaskRunnerConfig = config.taskRunnerConfig;
    const taskRunner = taskRunnerConfig.taskRunner;
    const fromPattern = fromPatternMap.get(taskRunner);
    generator.fs.copyTpl(fromPattern, generator.destinationRoot(), config);
};

export = <IProjectScaffolder>{
    scaffold: scaffoldTaskRunnerContent
};