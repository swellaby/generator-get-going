'use strict';

import YeomanGenerator = require('yeoman-generator');

import ILinterConfig = require('../interfaces/linter-config');
import IProjectConfig = require('../interfaces/project-config');
import IProjectInput = require('../interfaces/project-input');
import Linter = require('../enums/linter');
import PromptType = require('../enums/prompt-type');

const inputName = 'linter';

const linterMap = new Map<Linter, ILinterConfig>();
linterMap.set(Linter.golint, {
    linterName: 'Golint',
    commandName: 'golint',
    linterType: Linter.golint,
    packageInstallPath: 'golang.org/x/lint/golint'
});

const prompt: YeomanGenerator.Question = {
    type: PromptType.list,
    name: inputName,
    message: 'Which linter do you want to use?',
    default: Linter.golint,
    choices: [
        {
            name: 'Golint - The default Go linter',
            value: Linter.golint
        }
    ]
};

const option: YeomanGenerator.OptionConfig = {
    type: String,
    description: 'The type of linter to use'
};

const tryExtractInputValue = (value: unknown, projectConfig: IProjectConfig): boolean => {
    if (!value) {
        return false;
    }

    const optionVal: string = String(value);
    const linter: Linter = Linter[optionVal.toLowerCase()];

    if (linter === undefined) {
        return false;
    }

    projectConfig.linterConfig = linterMap.get(linter);
    return true;
};

export = <IProjectInput>{
    name: inputName,
    optionName: inputName,
    option: option,
    prompt: prompt,
    tryExtractInputValue: tryExtractInputValue
};
