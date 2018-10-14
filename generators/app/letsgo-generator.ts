'use strict';

import YeomanGenerator = require('yeoman-generator');
import yosay = require('yosay');

import IProjectConfig = require('./project-config');
import projectConfigUtils = require('./inputs/project-config-utils');

class LetsGoGenerator {
    private config: IProjectConfig;
    private generator: YeomanGenerator;

    constructor(generator: YeomanGenerator) {
        this.generator = generator;
    }

    public async createProject(): Promise<void> {
        this.generator.log(yosay('Welcome to the LetsGo Generator!'));

        return projectConfigUtils.getDesiredProjectConfig(this.generator).then(config => {
            this.config = config;
        }).catch(err => {
            let errMsg = 'Encountered an unexpected error while creating your ' +
            'new project. Please try again.';
            if (err && err.message) {
                errMsg += ` Error details: '${err.message}'`;
            }
            this.generator.log(errMsg);
        });
    }

}

export = LetsGoGenerator;