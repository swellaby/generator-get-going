'use strict';

import mkdirp = require('mkdirp');
import path = require('path');
import YeomanGenerator = require('yeoman-generator');

import IProjectConfig = require('../interfaces/project-config');
import IProjectScaffolder = require('../interfaces/project-scaffolder');

const validateDirectoryName = (generator: YeomanGenerator, config: IProjectConfig) => {
    const appName = config.name;

    if (path.basename(generator.destinationPath()) !== appName) {
        generator.log('Your generator must be inside a directory with the same name ' +
            `as your project name '${appName}'\nI'll automatically create this directory for you.`);

        mkdirp.sync(appName, null);
        generator.destinationRoot(generator.destinationPath(appName));
    }
};

export = <IProjectScaffolder>{
    scaffold: validateDirectoryName
};