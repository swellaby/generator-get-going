'use strict';

import Linter = require('./settings/linter');
import ProjectType = require('./settings/project-type');
import TaskRunner = require('./settings/task-runner');

interface IProjectConfig {
    name: string;
    projectType: ProjectType;
    author: string;
    includeVSCode: boolean;
    taskRunner: TaskRunner;
    primaryLinter: Linter;
}

export = IProjectConfig;