'use strict';

import path = require('path');
import Sinon = require('sinon');
import YeomanGenerator = require('yeoman-generator');

import descriptionInput = require('../../generators/app/inputs/description-input');
import linterInput = require('../../generators/app/inputs/linter-input');
import moduleInput = require('../../generators/app/inputs/module-input');
import nameInput = require('../../generators/app/inputs/name-input');
import ownerInput = require('../../generators/app/inputs/owner-input');
import taskRunnerInput = require('../../generators/app/inputs/task-runner-input');
import typeInput = require('../../generators/app/inputs/type-input');
import vscodeInput = require('../../generators/app/inputs/vscode-input');

import Linter = require('../../generators/app/enums/linter');
import ProjectType = require('../../generators/app/enums/project-type');
import TaskRunner = require('../../generators/app/enums/task-runner');

export const generatorRoot = path.join(__dirname, '../../generators/app');
export const devSetupGoScriptFileName = 'scripts/dev_setup.go';
export const goModFileName = 'go.mod';
export const gitIgnoreFileName = '.gitignore';
export const readmeFileName = 'README.md';

export const commonFiles = [
    gitIgnoreFileName,
    goModFileName,
    readmeFileName,
    devSetupGoScriptFileName
];

export const packageJson = 'package.json';
export const yoDestinationPathFunctionName = 'destinationPath';
export const description = 'awesome go awesomeness';
export const owner = 'swellaby';
export const name = 'captain-githook';
export const moduleName = `github.com/${owner}/${name}`;

export const defaultPromptAnswers = {};
defaultPromptAnswers[descriptionInput.input.prompt.name] = description;
defaultPromptAnswers[linterInput.input.prompt.name] = Linter.golint;
defaultPromptAnswers[moduleInput.input.prompt.name] = moduleName;
defaultPromptAnswers[ownerInput.input.prompt.name] = owner;
defaultPromptAnswers[nameInput.input.prompt.name] = name;
defaultPromptAnswers[taskRunnerInput.input.prompt.name] = TaskRunner.task;
defaultPromptAnswers[typeInput.input.prompt.name] = ProjectType.boilerplate;
defaultPromptAnswers[vscodeInput.input.prompt.name] = true;

export const defaultPromptAnswersCopy = () => JSON.parse(JSON.stringify(defaultPromptAnswers));

export const defaultOptions = {};
defaultOptions[descriptionInput.input.optionName] = description;
defaultOptions[linterInput.input.optionName] = Linter.golint;
defaultOptions[moduleInput.input.optionName] = moduleName;
defaultOptions[ownerInput.input.optionName] = owner;
defaultOptions[nameInput.input.optionName] = name;
defaultOptions[taskRunnerInput.input.optionName] = TaskRunner.task;
defaultOptions[typeInput.input.optionName] = ProjectType.boilerplate;
defaultOptions[vscodeInput.input.optionName] = true;

export const defaultOptionsCopy = () => JSON.parse(JSON.stringify(defaultOptions));

export const vscodeCSpellFile = '.vscode/cSpell.json';
export const vscodeExtensionsFile = '.vscode/extensions.json';
export const vscodeLaunchFile = '.vscode/launch.json';
export const vscodeSettingsFile = '.vscode/settings.json';
export const vscodeTasksFile = '.vscode/tasks.json';

export const vsCodeFiles = [
    vscodeCSpellFile,
    vscodeExtensionsFile,
    vscodeLaunchFile,
    vscodeSettingsFile,
    vscodeTasksFile
];

/**
 * Creates the Sinon stub of the spawnSync method to init a git repo on Yeoman Generator instances.
 *
 * @param sandbox
 */
export const createGitInitStub = (): Sinon.SinonStub => {
    return Sinon.stub(YeomanGenerator.prototype, 'spawnCommandSync').withArgs('git', ['init', '--quiet']);
};

export const createYoDestinationPathStub = (): Sinon.SinonStub => {
    return Sinon.stub(YeomanGenerator.prototype, yoDestinationPathFunctionName);
};

export const createConsoleErrorStub = (): Sinon.SinonStub => {
    return Sinon.stub(console, 'error');
};

export const createGeneratorLogSpy = (): Sinon.SinonSpy => {
    return Sinon.spy(YeomanGenerator.prototype, 'log');
};

export const getCwdAppNameSubDirectoryPath = (appName: string) => path.join(process.cwd(), appName);

export const getYeomanTmpCwd = () => process.cwd().replace('/private', '');

export const spaceRegex = '\\s*';

export const rootMainGoFileName = 'main.go';
let boilerplateMainGoFileContent = `package main${spaceRegex}`;
boilerplateMainGoFileContent += `import \\(${spaceRegex}"fmt"${spaceRegex}\\)${spaceRegex}`;
boilerplateMainGoFileContent += `func main\\(\\) \\{${spaceRegex}fmt\\.Println\\("Hello World\\!"\\)${spaceRegex}\\}${spaceRegex}`;

export const boilerplateProjectContent = {
    files: [
        rootMainGoFileName
    ],
    mainGoFileContentRegex: new RegExp(boilerplateMainGoFileContent)
};
