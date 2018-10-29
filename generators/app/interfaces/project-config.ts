'use strict';

import IGoContentConfig = require('./go-content-config');
import ILinterConfig = require('./linter-config');
import ITaskRunnerConfig = require('./task-runner-config');
import ITestConfig = require('./test-config');
import ProjectType = require('../enums/project-type');

interface IProjectConfig {
    name: string;
    owner: string;
    description: string;
    moduleName: string;
    projectType: ProjectType;
    goContentConfig: IGoContentConfig;
    testConfig: ITestConfig;
    linterConfig: ILinterConfig;
    taskRunnerConfig: ITaskRunnerConfig;
    includeVSCode: boolean;
}

export = IProjectConfig;