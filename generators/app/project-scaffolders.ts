'use strict';

import directoryScaffolder = require('./scaffolders/directory-scaffolder');
import gitScaffolder = require('./scaffolders/git-scaffolder');
import IProjectScaffolder = require('./interfaces/project-scaffolder');
import taskRunnerScaffolder = require('./scaffolders/task-runner-scaffolder');
import typeScaffolder = require('./scaffolders/type-scaffolder');

const scaffolders: IProjectScaffolder[] = [
    directoryScaffolder,
    typeScaffolder,
    taskRunnerScaffolder,
    gitScaffolder
];
export = scaffolders;