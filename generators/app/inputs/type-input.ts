'use strict';

import YeomanGenerator = require('yeoman-generator');

import IProjectConfig = require('../interfaces/project-config');
import IProjectInput = require('../interfaces/project-input');
import ProjectType = require('../enums/project-type');
import PromptType = require('../enums/prompt-type');

const name = 'projectType';

const prompt: YeomanGenerator.Question = {
    type: PromptType.list,
    name: name,
    message: 'The type of project your app will be',
    default: ProjectType.boilerplate,
    choices: [
        {
            name: 'New App with just the boilerplate',
            value: ProjectType.boilerplate
        },
        {
            name: 'New Lib/Package App',
            value: ProjectType.lib
        },
        {
            name: 'New Lib/Package with a CLI App',
            value: ProjectType.libcli
        },
        {
            name: 'New CLI App (with no Lib/Package)',
            value: ProjectType.cli
        }
    ]
};

const setConfigValues = (projectConfig: IProjectConfig, projectType: ProjectType) => {
    projectConfig.projectType = projectType;
    projectConfig.testTarget = './...';
};

const tryExtractInputValue = (value: unknown, projectConfig: IProjectConfig): boolean => {
    projectConfig = projectConfig || <IProjectConfig>{};
    if (value === null || value === undefined) {
        return false;
    }

    const optionVal: string = String(value);
    const projType = ProjectType[optionVal.toLowerCase()];

    if (projType === undefined) {
        return false;
    }

    setConfigValues(projectConfig, projType);
    return true;
};

const input: IProjectInput = {
    name: name,
    optionName: 'type',
    prompt: prompt,
    tryExtractInputValue: tryExtractInputValue
};

export = {
    input
};