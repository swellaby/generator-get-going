'use strict';

import mkdirp = require('mkdirp');
import path = require('path');
import shell = require('shelljs');

import descriptionInput = require('../../generators/app/inputs/description-input');
import linterInput = require('../../generators/app/inputs/linter-input');
import moduleInput = require('../../generators/app/inputs/module-input');
import nameInput = require('../../generators/app/inputs/name-input');
import ownerInput = require('../../generators/app/inputs/owner-input');
import taskRunnerInput = require('../../generators/app/inputs/task-runner-input');
import typeInput = require('../../generators/app/inputs/type-input');
import vscodeInput = require('../../generators/app/inputs/vscode-input');

const normalizeDirectoryPaths = originalPath => originalPath.replace(/\\/g, '/');
const functionalTestsRootDir = path.join(path.resolve('./'), 'test', 'functional');
const testContextRootDir = '.testcontext';
const fixturesRootDir = 'fixtures';
const testContextRootDirPath = path.join(functionalTestsRootDir, testContextRootDir);
const fixturesRootDirPath = path.join(functionalTestsRootDir, fixturesRootDir);

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

const buildGeneratorCommand = (options: string): string => {
    let command = 'yo --no-insight lets-go';
    if (options) {
        command = `${command} ${options}`;
    }

    return `${command}`;
};

const createTestContextDir = () => {
    mkdirp.sync(testContextRootDirPath);
};

const runGenerator = (options: string, isSilent = true) => {
    createTestContextDir();
    const command = buildGeneratorCommand(options);
    return shell.exec(command, { silent: isSilent, cwd: testContextRootDirPath });
};

const runGeneratorWithCallback = (options, isSilent = true, callback) => {
    createTestContextDir();
    const command = buildGeneratorCommand(options);
    return shell.exec(command, { silent: isSilent, cwd: testContextRootDirPath }, callback);
};

export = {
    successfulReturnCode: 0,
    testContextRootDir,
    testContextRootDirPath,
    fixturesRootDir,
    fixturesRootDirPath,
    normalizeDirectoryPaths,
    runGenerator,
    runGeneratorWithCallback,
    optionUtils: {
        aggregateOptions,
        addDescriptionOption,
        addLinterOption,
        addModuleOption,
        addNameOption,
        addOwnerOption,
        addTaskRunnerOption,
        addTypeOption,
        addVSCodeOption
    }
};
