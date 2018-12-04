'use strict';

import YeomanGenerator = require('yeoman-generator');

import IProjectConfig = require('../interfaces/project-config');
import IProjectInput = require('../interfaces/project-input');
import nameInput = require('./name-input');
import ownerInput = require('./owner-input');
import PromptType = require('../enums/prompt-type');

const name = 'moduleName';
let config: IProjectConfig;

const isValid = (value: string): boolean => {
    if (!value) {
        return false;
    }
    return new RegExp('^[\\w-.]+\\/[\\w-.]+\\/([\\w-./]+)*$').test(value);
};

const validatePromptInput = (value: string): string | boolean => {
    if (isValid(value)) {
        return true;
    }
    let invalidMessage = `Invalid Go module name: '${value}'\n`;
    invalidMessage += 'Module name must follow the pattern of: host/owner/repo-path, like: ' +
        'github.com/foo/bar or github.com/foo/bar/x/y/z';
    return invalidMessage;
};

const getDefaultPromptValue = (answers: YeomanGenerator.Answers): string => {
    const appName = config.name || answers[nameInput.prompt.name];
    const ownerName = config.owner || answers[ownerInput.prompt.name];
    return `github.com/${ownerName}/${appName}`;
};

const prompt: YeomanGenerator.Question = {
    type: PromptType.input,
    name: name,
    message: 'What do you want to name of your Go module?',
    validate: validatePromptInput,
    default: getDefaultPromptValue
};

const option: YeomanGenerator.OptionConfig = {
    type: String,
    description: 'The name of your Go module'
};

const tryExtractInputValue = (value: unknown, projectConfig: IProjectConfig): boolean => {
    config = projectConfig;
    if (value === null || value === undefined) {
        return false;
    }
    const optionVal: string = String(value);

    if (isValid(optionVal)) {
        projectConfig.moduleName = optionVal;
        return true;
    }

    return false;
};

export = <IProjectInput>{
    name: name,
    optionName: 'module-path',
    option: option,
    prompt: prompt,
    tryExtractInputValue: tryExtractInputValue,
    isValid
};
