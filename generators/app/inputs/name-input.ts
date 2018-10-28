'use strict';

import YeomanGenerator = require('yeoman-generator');

import IProjectConfig = require('../interfaces/project-config');
import IProjectInput = require('../interfaces/project-input');
import PromptType = require('../enums/prompt-type');

const name = 'name';
const description = 'The name of your app';

const isValid = (value: string): boolean => {
    if (!value) {
        return false;
    }
    return new RegExp('^[\\w-]+$').test(value);
};

// eslint-disable-next-line no-unused-vars
const validatePromptInput = (value: string, answers?: YeomanGenerator.Answers): string | boolean => {
    if (isValid(value)) {
        return true;
    }
    return `Invalid app name: '${value}'`;
};

const prompt: YeomanGenerator.Question = {
    type: PromptType.input,
    name: name,
    message: description,
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
        projectConfig.name = optionVal;
        return true;
    }

    return false;
};

const input: IProjectInput = {
    name: name,
    optionName: name,
    option: option,
    prompt: prompt,
    tryExtractInputValue: tryExtractInputValue
};

export = {
    input,
    isValid
};