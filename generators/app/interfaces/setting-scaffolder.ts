'use strict';

import YeomanGenerator = require('yeoman-generator');
import IProjectConfig = require('./project-config');

interface ISettingScaffolder {
    scaffold(generator: YeomanGenerator, config: IProjectConfig): Promise<void>;
}

export = ISettingScaffolder;