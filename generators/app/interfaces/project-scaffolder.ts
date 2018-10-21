'use strict';

import YeomanGenerator = require('yeoman-generator');
import IProjectConfig = require('./project-config');

interface IProjectScaffolder {
    scaffold(generator: YeomanGenerator, config: IProjectConfig);
}

export = IProjectScaffolder;