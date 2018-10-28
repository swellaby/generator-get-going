'use strict';

import YeomanGenerator = require('yeoman-generator');

import IProjectConfig = require('../interfaces/project-config');
import IProjectInput = require('../interfaces/project-input');
import PromptType = require('../enums/prompt-type');

const name = 'description';

const prompt: YeomanGenerator.Question = {
    type: PromptType.input,
    name: name,
    message: 'What is the description/purpose of your app?'
};

const option: YeomanGenerator.OptionConfig = {
    type: String,
    description: 'The description of your app'
};

const tryExtractInputValue = (value: unknown, projectConfig: IProjectConfig): boolean => {
    if (value === null || value === undefined) {
        return false;
    }
    projectConfig.description = String(value);
    return true;
};

const input: IProjectInput = {
    name: name,
    optionName: name,
    option: option,
    prompt: prompt,
    tryExtractInputValue: tryExtractInputValue
};

export = {
    input
};