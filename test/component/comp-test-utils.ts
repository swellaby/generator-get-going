'use strict';

import path = require('path');
import Sinon = require('sinon');
import YeomanGenerator = require('yeoman-generator');

export const generatorRoot = path.join(__dirname, '../../generators/app');
export const readmeFileName = 'README.md';
export const readmeGeneratorOriginHeader = '### Generator';
export const readmeGeneratorOriginText = 'Initially created by this [swell generator][parent-generator-url]!';
export const readmeGeneratorUrlVariableText = '[parent-generator-url]: https://github.com/swellaby/generator-lets-go';
export const packageJson = 'package.json';
export const yoDestinationPathFunctionName = 'destinationPath';

export const commonFiles = [
    '.gitignore',
    'go.mod',
    readmeFileName
];

export const vsCodeFiles = [
    '.vscode/cSpell.json',
    '.vscode/extensions.json',
    '.vscode/launch.json',
    '.vscode/settings.json',
    '.vscode/tasks.json'
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

export const getCwdAppNameSubDirectoryPath = (appName: string) => path.join(process.cwd(), appName);

export const getYeomanTmpCwd = () => process.cwd().replace('/private', '');