'use strict';

import inquirer = require('inquirer');

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

const prompt: inquirer.Question = {
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

const tryExtractInputValue = (value: unknown, projectConfig: IProjectConfig): boolean => {
    projectConfig = projectConfig || <IProjectConfig>{};
    if (!value) {
        return false;
    }

    const optionVal: string = String(value);
    const linter: Linter = Linter[optionVal.toLowerCase()];

    if (linter === undefined) {
        return false;
    }

    const linterConfig = linterMap.get(linter);

    if (linterConfig === undefined) {
        return false;
    }

    projectConfig.linterConfig = linterConfig;
    return true;
};

const input: IProjectInput = {
    name: inputName,
    optionName: inputName,
    prompt: prompt,
    tryExtractInputValue: tryExtractInputValue
};

export = {
    input,
    linterMap
};