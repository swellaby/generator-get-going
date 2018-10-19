'use strict';

import fs = require('fs');
import path = require('path');
import YeomanGenerator = require('yeoman-generator');
import yosay = require('yosay');

import IProjectConfig = require('../generators/app/project-config');
import IProjectSetting = require('../generators/app/settings/project-setting');

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

const firstSetting: IProjectSetting = <IProjectSetting> {
    name: 'one',
    optionName: 'first',
    option: {
        type: String
    },
    prompt: {
        name: 'foo'
    },
    tryExtractOptionValue: () => true
};

const secondSetting: IProjectSetting = <IProjectSetting> {
    name: 'two',
    optionName: 'second',
    option: {
        type: Boolean
    },
    prompt: {
        name: 'bar'
    },
    tryExtractOptionValue: () => true
};

const projectSettings = [ firstSetting, secondSetting ];

export = {
    expectedGreetingMessage,
    expectedErrorMessageBase,
    getExpectedErrorMessage,
    generatorStub,
    generatorRoot,
    projectConfig,
    fsStatStub,
    firstSetting,
    secondSetting,
    projectSettings
};