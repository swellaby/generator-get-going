'use strict';

import YeomanGenerator = require('yeoman-generator');
import IProjectConfig = require('../project-config');

const getDesiredProjectConfig = async (generator: YeomanGenerator): Promise<IProjectConfig> => {
    return Promise.resolve(null);
};

export {
    getDesiredProjectConfig
};