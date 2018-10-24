'use strict';

import directoryScaffolder = require('./directory-scaffolder');
import gitScaffolder = require('./git-scaffolder');
import IProjectScaffolder = require('../interfaces/project-scaffolder');
import taskRunnerScaffolder = require('./task-runner-scaffolder');

const scaffolders: IProjectScaffolder[] = [
    directoryScaffolder,
    taskRunnerScaffolder,
    gitScaffolder
];
export = scaffolders;