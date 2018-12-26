'use strict';

import fs = require('fs');
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

const boilerplateProjectName = 'b3';

const normalizeDirectoryPaths = originalPath => originalPath.replace(/\\/g, '/');
const functionalTestsRootDir = path.join(path.resolve('./'), 'test', 'functional');
const testContextRootDir = '.testcontext';
const fixturesRootDir = 'fixtures';
const testContextRootDirPath = path.join(functionalTestsRootDir, testContextRootDir);
const fixturesRootDirPath = path.join(functionalTestsRootDir, fixturesRootDir);
const boilerplateScaffoldedRootDirPath = path.join(testContextRootDirPath, boilerplateProjectName);
const boilerplateFixturesRootDirPath = path.join(fixturesRootDirPath, 'boilerplate');

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
    let command = 'yo lets-go';
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

const getFileContents = (filePath) => {
    return fs.readFileSync(filePath, 'utf8');
};

const getFilePath = (rootDir, filePath) => path.join(rootDir, filePath);

const vsCodeFixturesRootDirPath = path.join(fixturesRootDirPath, 'vscode');
const vsCodeCommonFixturesDirPath = path.join(vsCodeFixturesRootDirPath, 'common');

const vsCodeFixtures = {
    common: {
        cSpellContents: getFileContents(path.join(vsCodeCommonFixturesDirPath, 'cSpell.json')),
        extensionsContents: getFileContents(path.join(vsCodeCommonFixturesDirPath, 'extensions.json')),
        launchContents: getFileContents(path.join(vsCodeCommonFixturesDirPath, 'launch.json'))
    }
};

const scriptsFixturesRootDirPath = path.join(fixturesRootDirPath, 'scripts');
const scriptsDevSetupFixturesRootDirPath = path.join(scriptsFixturesRootDirPath, 'dev-setup');

const scriptsFixtures = {
    devSetup: {
        task: getFileContents(path.join(scriptsDevSetupFixturesRootDirPath, 'task', 'dev_setup.go'))
    }
};

const defaultDescription = 'save the world';
const defaultOwner = 'swellaby';
const defaultLinter = 'golint';
const defaultTaskRunner = 'task';
const defaultVsCode = true;

const boilerplateInputs = {
    b3: {
        name: 'b3',
        projectType: 'boilerplate',
        description: defaultDescription,
        owner: defaultOwner,
        moduleName: `github.com/${defaultOwner}/b3`,
        linter: defaultLinter,
        taskRunner: defaultTaskRunner,
        includeVsCode: defaultVsCode
    }
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
    },
    fixtures: {
        gitattributesContent: getFileContents(path.join(fixturesRootDirPath, '.gitattributes')),
        vsCodeFixtures,
        scriptsFixtures
    },
    inputConfigs: {
        boilerplateInputs
    },
    boilerplateProjectName,
    boilerplateScaffoldedRootDirPath,
    getFileContents,
    getScaffoldedFilePath: getFilePath,
    getScaffoldedBoilerplateFilePath: (filePath) => getFilePath(boilerplateScaffoldedRootDirPath, filePath),
    boilerplateFixturesRootDirPath,
    getFixturesBoilerplateFilePath: (filePath) => getFilePath(boilerplateFixturesRootDirPath, filePath)
};
