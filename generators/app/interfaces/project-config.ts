'use strict';

import ILinterConfig = require('./linter-config');
import ITaskRunnerConfig = require('./task-runner-config');
import ProjectType = require('../enums/project-type');

interface IProjectConfig {
    name: string;
    projectType: ProjectType;
    author: string;
    includeVSCode: boolean;
    linterConfig: ILinterConfig;
    taskRunnerConfig: ITaskRunnerConfig;
    coverageReportDirectory: string;
    testResultsReportDirectory: string;
    testTarget: string;
}

export = IProjectConfig;