'use strict';

import PromptTypes = require('../inputs/prompt-type');
import inquirer = require('inquirer');

/**
 * Describes a setting for the project.
 */
interface IProjectSetting<T> {
    name: string;
    optionName: string;
    prompt: inquirer.Question;
    /**
     * Determines whether the provided option value is valid.
     * @param value [T] - The value provided for the option.
     */
    isOptionValueValid(value: T): boolean;
}

export = IProjectSetting;