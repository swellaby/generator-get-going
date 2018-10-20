'use strict';

import fs = require('fs');
import path = require('path');
import YeomanGenerator = require('yeoman-generator');
import yosay = require('yosay');

import IProjectConfig = require('../generators/app/interfaces/project-config');
import IProjectInput = require('../generators/app/interfaces/project-input');

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
    options: {},
    log: () => null,
    // composeWith: null,
    destinationPath: () => __dirname,
    destinationRoot: () => __dirname,
    // eslint-disable-next-line
    option: (name: string, config: YeomanGenerator.OptionConfig) => null,
    // eslint-disable-next-line
    prompt: (questions) => Promise.prototype,
    sourceRoot: () => __dirname,
    // desc: null,
    // help: null,
    // user: null,
    // eslint-disable-next-line
    spawnCommandSync: (command, args, opt) => null
};

const fsStatStub: fs.Stats = <fs.Stats>{
    isDirectory: () => null,
    isFile: () => null
};

const projectConfig: IProjectConfig = <IProjectConfig> {

};

const firstInput: IProjectInput = <IProjectInput> {
    name: 'one',
    optionName: 'first',
    option: {
        type: String
    },
    prompt: {
        name: 'foo'
    },
    tryExtractSettingValue: () => true
};

const secondInput: IProjectInput = <IProjectInput> {
    name: 'two',
    optionName: 'second',
    option: {
        type: Boolean
    },
    prompt: {
        name: 'bar'
    },
    tryExtractSettingValue: () => true
};

const projectInputs = [ firstInput, secondInput ];

export = {
    expectedGreetingMessage,
    expectedErrorMessageBase,
    getExpectedErrorMessage,
    generatorStub,
    generatorRoot,
    projectConfig,
    fsStatStub,
    firstInput,
    secondInput,
    projectInputs
};