'use strict';

import ILinterConfig = require('./linter-config');
import ProjectType = require('../enums/project-type');
import TaskRunner = require('../enums/task-runner');

interface IProjectConfig {
    name: string;
    projectType: ProjectType;
    author: string;
    includeVSCode: boolean;
    taskRunner: TaskRunner;
    linterConfig: ILinterConfig;
    coverageReportDirectory: string;
    testResultsReportDirectory: string;
}

export = IProjectConfig;