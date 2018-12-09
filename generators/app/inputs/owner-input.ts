'use strict';

import YeomanGenerator = require('yeoman-generator');

import IProjectConfig = require('../interfaces/project-config');
import IProjectInput = require('../interfaces/project-input');
import PromptType = require('../enums/prompt-type');

const name = 'owner';
const description = 'The owner/author of your app';

const isValid = (value: string): boolean => {
    if (!value) {
        return false;
    }
    return new RegExp('^[\\w-]+$').test(value);
};

const validatePromptInput = (value: string): string | boolean => {
    if (isValid(value)) {
        return true;
    }
    return `Invalid owner/author name: '${value}'`;
};

const prompt: YeomanGenerator.Question = {
    type: PromptType.input,
    name: name,
    message: 'Who is the owner/author of this app?',
    validate: validatePromptInput
};

const option: YeomanGenerator.OptionConfig = {
    type: String,
    description: description
};

const tryExtractInputValue = (value: unknown, projectConfig: IProjectConfig): boolean => {
    if (value === null || value === undefined) {
        return false;
    }
    const optionVal: string = String(value);

    if (isValid(optionVal)) {
        projectConfig.owner = optionVal;
        return true;
    }

    return false;
};

export = <IProjectInput>{
    name: name,
    optionName: name,
    option: option,
    prompt: prompt,
    tryExtractInputValue: tryExtractInputValue,
    isValid
};
