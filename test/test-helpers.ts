'use strict';

import path = require('path');
import YeomanGenerator = require('yeoman-generator');
import yosay = require('yosay');

import IProjectConfig = require('../generators/app/project-config');

const generatorRoot = path.join(__dirname, './../../../generators/app');
const expectedGreetingMessage = yosay('Welcome to the LetsGo Generator!');
const expectedErrorMessageBase = 'Encountered an unexpected error while creating your ' +
'new project. Please try again.';

const getExpectedErrorMessage = (errDetails: string): string => {
    return expectedErrorMessageBase + ` Error details: '${errDetails}'`;
};

const fsStats: YeomanGenerator.MemFsEditor = {
    commit: null,
    copy: null,
    copyTpl: () => null,
    delete: null,
    exists: null,
    extendJSON: () => null,
    move: () => null,
    read: null,
    readJSON: () => null,
    write: null,
    writeJSON: () => null
};

const generatorStub: YeomanGenerator = <YeomanGenerator> {
    fs: fsStats,
    // options: null,
    log: () => null,
    // composeWith: null,
    destinationPath: () => __dirname,
    destinationRoot: () => __dirname,
    // option: null,
    // eslint-disable-next-line
    prompt: (questions) => Promise.prototype,
    sourceRoot: () => __dirname,
    // desc: null,
    // help: null,
    // user: null,
    // eslint-disable-next-line
    spawnCommandSync: (command, args, opt) => null
};

const projectConfig: IProjectConfig = <IProjectConfig> {

};

export = {
    expectedGreetingMessage,
    expectedErrorMessageBase,
    getExpectedErrorMessage,
    generatorStub,
    generatorRoot,
    projectConfig
};