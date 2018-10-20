'use strict';

import Linter = require('../enums/linter');
import ProjectType = require('../enums/project-type');
import TaskRunner = require('../enums/task-runner');

interface IProjectConfig {
    name: string;
    projectType: ProjectType;
    author: string;
    includeVSCode: boolean;
    taskRunner: TaskRunner;
    primaryLinter: Linter;
}

export = IProjectConfig;