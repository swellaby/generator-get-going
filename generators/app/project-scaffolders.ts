'use strict';

import directoryScaffolder = require('./scaffolders/directory-scaffolder');
import gitScaffolder = require('./scaffolders/git-scaffolder');
import IProjectScaffolder = require('./interfaces/project-scaffolder');
import taskRunnerScaffolder = require('./scaffolders/task-runner-scaffolder');
import typeScaffolder = require('./scaffolders/type-scaffolder');
import vsCodeScaffolder = require('./scaffolders/vscode-scaffolder');

const scaffolders: IProjectScaffolder[] = [
    directoryScaffolder,
    typeScaffolder,
    taskRunnerScaffolder,
    vsCodeScaffolder,
    gitScaffolder
];
export = scaffolders;