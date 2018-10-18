'use strict';

import inquirer = require('inquirer');
import yeoman = require('yeoman-generator');

import IProjectConfig = require('../project-config');
import IProjectSetting = require('../settings/project-setting');
import PromptType = require('./prompt-type');

const settingName = 'name';
const settingDescription = 'The name of your app';

const isValid = (value: string): boolean => {
    if (!value) {
        return false;
    }
    return new RegExp('^[\\w-]+$').test(value);
};

const validatePromptInput = (value: string, answers: inquirer.Answers): string | boolean => {
    if (isValid(value)) {
        return true;
    }
    return `Invalid app name: '${value}'`;
};

const prompt: inquirer.Question = {
    type: PromptType.input,
    name: settingName,
    message: settingDescription,
    validate: validatePromptInput
};

const option: yeoman.OptionConfig = {
    type: String,
    description: settingDescription
};

const tryConvertOptionValue = (value: unknown, projectConfig: IProjectConfig): boolean => {
    projectConfig = projectConfig || <IProjectConfig>{};
    if (value === null || value === undefined) {
        return false;
    }
    const optionVal: string = String(value);

    if (isValid(optionVal)) {
        projectConfig.name = optionVal;
        return true;
    }

    return false;
};

const setting: IProjectSetting = {
    name: settingName,
    optionName: settingName,
    option: option,
    prompt: prompt,
    tryExtractOptionValue: tryConvertOptionValue
};

export = {
    setting,
    isValid
};