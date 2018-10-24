'use strict';

import YeomanGenerator = require('yeoman-generator');
import yosay = require('yosay');

import IProjectConfig = require('./interfaces/project-config');
import projectInputUtils = require('./inputs/project-input-utils');
import projectInputs = require('./inputs/project-inputs');
import projectScaffolders = require('./scaffolders/project-scaffolders');
import scaffoldEngine = require('./scaffold-engine');

class LetsGoGenerator {
    private generator: YeomanGenerator;

    constructor(generator: YeomanGenerator) {
        this.generator = generator;
        projectInputUtils.addGeneratorOptions(this.generator, projectInputs);
    }

    public async createProject(): Promise<void> {
        this.generator.log(yosay('Welcome to the LetsGo Generator!'));

        try {
            const config: IProjectConfig = await projectInputUtils.getDesiredProjectConfig(this.generator, projectInputs);
            scaffoldEngine.scaffoldNewProject(projectScaffolders, this.generator, config);
        } catch (err) {
            let errMsg = 'Encountered an unexpected error while creating your new project. Please try again.';
            if (err && err.message) {
                errMsg += ` Error details: '${err.message}'`;
            }
            this.generator.log(errMsg);
        }
    }

}

export = LetsGoGenerator;