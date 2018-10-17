'use strict';

import inquirer = require('inquirer');
import yeoman = require('yeoman-generator');
import IProjectConfig = require('../project-config');

/**
 * Describes a setting for the project.
 */
interface IProjectSetting {
    name: string;
    optionName: string;
    option?: yeoman.OptionConfig;
    prompt: inquirer.Question;
    /**
     * Determines whether the provided option value is valid.
     * @param {any} value - The value provided for the option.
     * @param {IProjectConfig} config - The project configuration.
     * @returns {boolean}
     */
    // tslint:disable-next-line:no-any
    tryExtractOptionValue(value: any, projectConfig: IProjectConfig): boolean;
}

export = IProjectSetting;