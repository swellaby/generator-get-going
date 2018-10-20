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
     * Attempts to apply the specified value to corresponding setting.
     * @param {any} value - The value provided..
     * @param {IProjectConfig} config - The project configuration.
     * @returns {boolean} - Returns true if the value was valid and added to the config, otherwise false.
     */
    tryExtractSettingValue(value: unknown, projectConfig: IProjectConfig): boolean;
}

export = IProjectSetting;