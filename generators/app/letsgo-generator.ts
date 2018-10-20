'use strict';

import YeomanGenerator = require('yeoman-generator');
import yosay = require('yosay');

import directory = require('./directory');
import IProjectConfig = require('./interfaces/project-config');
import projectInputUtils = require('./inputs/project-input-utils');
import projectInputs = require('./inputs/project-inputs');

class LetsGoGenerator {
    private config: IProjectConfig;
    private generator: YeomanGenerator;

    constructor(generator: YeomanGenerator) {
        this.generator = generator;
        projectInputUtils.addGeneratorOptions(this.generator, projectInputs);
    }

    public async createProject(): Promise<void> {
        this.generator.log(yosay('Welcome to the LetsGo Generator!'));

        try {
            this.config = await projectInputUtils.getDesiredProjectConfig(this.generator, projectInputs);
            directory.validateDirectoryName(this.generator, this.config);
        } catch (err) {
            let errMsg = 'Encountered an unexpected error while creating your ' +
            'new project. Please try again.';
            if (err && err.message) {
                errMsg += ` Error details: '${err.message}'`;
            }
            this.generator.log(errMsg);
        }
    }

}

export = LetsGoGenerator;