'use strict';

import YeomanGenerator = require('yeoman-generator');
import yosay = require('yosay');

import IProjectConfig = require('./interfaces/project-config');
import projectInputUtils = require('./project-input-utils');
import projectInputs = require('./project-inputs');
import projectScaffolders = require('./project-scaffolders');
import scaffoldEngine = require('./scaffold-engine');

class GetGoingGenerator extends YeomanGenerator {
    // tslint:disable-next-line:no-any
    constructor(args: string | string[], opts?: any) {
        super(args, opts);
        projectInputUtils.addGeneratorOptions(this, projectInputs);
    }

    public async createProject(): Promise<void> {
        this.log(yosay('Welcome to the Get-Going Generator!'));

        try {
            const config: IProjectConfig = await projectInputUtils.getDesiredProjectConfig(this, projectInputs);
            scaffoldEngine.scaffoldNewProject(projectScaffolders, this, config);
        } catch (err) {
            let errMsg = 'Encountered an unexpected error while creating your new project. Please try again.';
            if (err && err.message) {
                errMsg += ` Error details: '${err.message}'`;
            }
            this.log(errMsg);
        }
    }

}

export = GetGoingGenerator;
