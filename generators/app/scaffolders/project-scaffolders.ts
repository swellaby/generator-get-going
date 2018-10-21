'use strict';

import directoryScaffolder = require('./directory');
import gitScaffolder = require('./git');
import IProjectScaffolder = require('../interfaces/project-scaffolder');

const scaffolders: IProjectScaffolder[] = [
    directoryScaffolder,
    gitScaffolder
];
export = scaffolders;