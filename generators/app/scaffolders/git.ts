'use strict';

import fs = require('fs');
import path = require('path');
import YeomanGenerator = require('yeoman-generator');

import IProjectConfig = require('../interfaces/project-config');
import IProjectScaffolder = require('../interfaces/project-scaffolder');

/**
 * Initializes a git repository in the created project.
 *
 * @param {YeomanGenerator} generator - The yeoman generator instance.
 * @private
 */
// eslint-disable-next-line no-unused-vars
const initializeGitRepository = (generator: YeomanGenerator, config: IProjectConfig) => {
    generator.log('I see that you don\'t have a git repo in the target directory. I\'ll initialize it for you now, and then ' +
        'you can add your remote later on via a \'git remote add origin <<insert your remote url here>>\'. For example: ' +
        '\'git remote add origin https://github.com/me/my-repo.git\'');
    try {
        generator.spawnCommandSync('git', ['init', '--quiet']);
    } catch (err) {
        generator.log('Encountered an error while trying to initialize the git repository. ' +
            'You may not have git installed. Please consult the internet for information on how to install git');
    }
};

/**
 * Validates that the new project has a git repository.
 *
 * @param {YeomanGenerator} generator - The yeoman generator instance.
 * @param {IProjectConfig} config - The project configuration.
 * @private
 */
const validateGitRepository = (generator: YeomanGenerator, config: IProjectConfig) => {
    try {
        const gitPath = path.join(path.resolve(generator.destinationRoot()), '.git');

        if (fs.statSync(gitPath).isFile()) {
            generator.log('Are you being mischievous? You have a file in the target directory named \'.git\' with' +
                'the same name as the directory git uses. I am deleting this because it will cause errors and you' +
                'absolutely do not need it. :)');
            fs.unlinkSync(gitPath);

            initializeGitRepository(generator, config);
        }
    } catch (err) {
        // fs.statSync will throw an exception when the directory does not exist so need to init
        initializeGitRepository(generator, config);
    }
};

export = <IProjectScaffolder>{
    scaffold: validateGitRepository
};