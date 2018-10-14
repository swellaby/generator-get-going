'use strict';

import ProjectTypes = require('./project-types');

interface IProjectConfig {
    name: string;
    projectType: ProjectTypes;
    author: string;
    includeVSCode: boolean;
}

export = IProjectConfig;