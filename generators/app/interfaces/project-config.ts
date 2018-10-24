'use strict';

import IGoContentConfig = require('./go-content-config');
import ILinterConfig = require('./linter-config');
import ITaskRunnerConfig = require('./task-runner-config');
import ProjectType = require('../enums/project-type');

interface IProjectConfig {
    name: string;
    projectType: ProjectType;
    author: string;
    goContentConfig: IGoContentConfig;
    linterConfig: ILinterConfig;
    taskRunnerConfig: ITaskRunnerConfig;
    coverageReportDirectory: string;
    testResultsReportDirectory: string;
    includeVSCode: boolean;
}

export = IProjectConfig;