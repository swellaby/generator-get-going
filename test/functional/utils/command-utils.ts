'use strict';

import shell = require('shelljs');

import fileSystemUtils = require('./filesystem-utils');

import descriptionInput = require('../../../generators/app/inputs/description-input');
import linterInput = require('../../../generators/app/inputs/linter-input');
import moduleInput = require('../../../generators/app/inputs/module-input');
import nameInput = require('../../../generators/app/inputs/name-input');
import ownerInput = require('../../../generators/app/inputs/owner-input');
import taskRunnerInput = require('../../../generators/app/inputs/task-runner-input');
import typeInput = require('../../../generators/app/inputs/type-input');
import vscodeInput = require('../../../generators/app/inputs/vscode-input');

const addDescriptionOption = (description: string) => {
    return `--${descriptionInput.optionName} "${description}"`;
};

const addLinterOption = (linter: string) => {
    return `--${linterInput.optionName} "${linter}"`;
};

const addModuleOption = (moduleName: string) => {
    return `--${moduleInput.optionName} "${moduleName}"`;
};

const addNameOption = (name: string) => {
    return `--${nameInput.optionName} "${name}"`;
};

const addOwnerOption = (owner: string) => {
    return `--${ownerInput.optionName} "${owner}"`;
};

const addTaskRunnerOption = (taskRunner: string) => {
    return `--${taskRunnerInput.optionName} "${taskRunner}"`;
};

const addTypeOption = (projectType: string) => {
    return `--${typeInput.optionName} "${projectType}"`;
};

const addVSCodeOption = (vscode: boolean) => {
    return `--${vscodeInput.optionName} "${vscode}"`;
};

const aggregateOptions = (options: string[]): string => {
    let opts = '';
    options.forEach(option => {
        opts += `${option} `;
    });
    return opts;
};

const addFreeformInputs = (inputConfig, opts: string[], name?: string) => {
    if (name) {
        opts.push(addNameOption(name));
    } else if (inputConfig.name) {
        opts.push(addNameOption(inputConfig.name));
    }
    if (inputConfig.description) {
        opts.push(addDescriptionOption(inputConfig.description));
    }
    if (inputConfig.moduleName) {
        opts.push(addModuleOption(inputConfig.moduleName));
    }
    if (inputConfig.owner) {
        opts.push(addOwnerOption(inputConfig.owner));
    }
};

const buildInputOptions = (inputConfig, name?: string ): string => {
    const opts: string[] = [];
    addFreeformInputs(inputConfig, opts, name);
    if (inputConfig.projectType) {
        opts.push(addTypeOption(inputConfig.projectType));
    }
    if (inputConfig.linter) {
        opts.push(addLinterOption(inputConfig.linter));
    }
    if (inputConfig.taskRunner) {
        opts.push(addTaskRunnerOption(inputConfig.taskRunner));
    }
    if (inputConfig.includeVsCode) {
        opts.push(addVSCodeOption(inputConfig.includeVsCode));
    }
    return aggregateOptions(opts);
};

const buildGeneratorCommand = (options: string): string => {
    let command = 'yo lets-go';
    if (options) {
        command = `${command} ${options}`;
    }

    return `${command}`;
};

const runGenerator = (options: string, isSilent = true) => {
    fileSystemUtils.createTestContextDir();
    const command = buildGeneratorCommand(options);
    return shell.exec(command, { silent: isSilent, cwd: fileSystemUtils.testContextRootDirPath });
};

const runGeneratorWithCallback = (options: string, isSilent = true, callback) => {
    fileSystemUtils.createTestContextDir();
    const command = buildGeneratorCommand(options);
    return shell.exec(command, { silent: isSilent, cwd: fileSystemUtils.testContextRootDirPath }, callback);
};

export = {
    successfulReturnCode: 0,
    runGenerator,
    runGeneratorWithCallback,
    buildInputOptions,
    aggregateOptions,
    addDescriptionOption,
    addLinterOption,
    addModuleOption,
    addNameOption,
    addOwnerOption,
    addTaskRunnerOption,
    addTypeOption,
    addVSCodeOption
};
