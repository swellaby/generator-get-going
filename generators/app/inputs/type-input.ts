'use strict';

import inquirer = require('inquirer');

import IProjectConfig = require('../project-config');
import IProjectSetting = require('../settings/project-setting');
import ProjectType = require('../settings/project-type');
import PromptType = require('./prompt-type');

const settingName = 'projectType';

const prompt: inquirer.Question = {
    type: PromptType.list,
    name: settingName,
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
            name: 'New CLI App',
            value: ProjectType.cli
        }
    ]
};

const tryConvertOptionValue = (value: unknown, projectConfig: IProjectConfig): boolean => {
    projectConfig = projectConfig || <IProjectConfig>{};
    if (value === null || value === undefined) {
        return false;
    }

    const optionVal: string = String(value);
    const projType = ProjectType[optionVal.toLowerCase()];

    if (projType === undefined) {
        return false;
    }

    projectConfig.projectType = projType;
    return true;
};

const setting: IProjectSetting = {
    name: settingName,
    optionName: 'type',
    prompt: prompt,
    tryExtractOptionValue: tryConvertOptionValue
};

export = {
    setting
};