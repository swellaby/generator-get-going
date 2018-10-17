'use strict';

import inquirer = require('inquirer');
import yeoman = require('yeoman-generator');

import IProjectConfig = require('../project-config');
import IProjectSetting = require('../settings/project-setting');
import PromptType = require('./prompt-type');

const settingName = 'vscode';
const settingDefault = true;
const settingDescription = 'Do you use Visual Studio Code?';

const prompt: inquirer.Question = {
    type: PromptType.confirm,
    name: settingName,
    message: settingDescription,
    default: settingDefault
};

const option: yeoman.OptionConfig = {
    type: Boolean,
    default: settingDefault,
    description: settingDescription
};

const tryConvertOptionValue = (value: unknown, projectConfig: IProjectConfig): boolean => {
    projectConfig = projectConfig || <IProjectConfig>{};
    if (value === null || value === undefined || typeof value !== 'boolean') {
        return false;
    }
    projectConfig.includeVSCode = Boolean(value);
    return true;
};

const setting: IProjectSetting = {
    name: settingName,
    optionName: settingName,
    option: option,
    prompt: prompt,
    tryExtractOptionValue: tryConvertOptionValue
};

export = {
    setting
};