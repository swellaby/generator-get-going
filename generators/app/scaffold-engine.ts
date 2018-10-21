'use strict';

import YeomanGenerator = require('yeoman-generator');

import IProjectConfig = require('./interfaces/project-config');
import IProjectScaffolder = require('./interfaces/project-scaffolder');

export const scaffoldNewProject = (scaffolders: IProjectScaffolder[], generator: YeomanGenerator, config: IProjectConfig) => {
    if (!generator || !scaffolders || scaffolders.length === 0) {
        throw new Error('Something awful happened! Please open an issue on GitHub');
    }

    scaffolders.forEach(scaffolder => {
        scaffolder.scaffold(generator, config);
    });
};