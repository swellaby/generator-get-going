'use strict';

import fs = require('fs');
import mkdirp = require('mkdirp');
import path = require('path');

const functionalTestsRootDir = path.join(path.resolve('./'), 'test', 'functional');
const testContextRootDir = '.testcontext';
const fixturesRootDir = 'fixtures';
const testContextRootDirPath = path.join(functionalTestsRootDir, testContextRootDir);
const fixturesRootDirPath = path.join(functionalTestsRootDir, fixturesRootDir);
const scriptsFixturesRootDirPath = path.join(fixturesRootDirPath, 'scripts');
const scriptsDevSetupFixturesRootDirPath = path.join(scriptsFixturesRootDirPath, 'dev-setup');
const vsCodeFixturesRootDirPath = path.join(fixturesRootDirPath, 'vscode');
const vsCodeCommonFixturesDirPath = path.join(vsCodeFixturesRootDirPath, 'common');

const createTestContextDir = () => {
    mkdirp.sync(testContextRootDirPath);
};

const getFileContents = (filePath) => {
    return fs.readFileSync(filePath, 'utf8');
};

const getGitIgnoreFileContents = (rootDirPath: string): string => {
    return getFileContents(path.join(rootDirPath, '.gitignore'));
};

const getGitAttributesFileContents = (rootDirPath: string): string => {
    return getFileContents(path.join(rootDirPath, '.gitattributes'));
};

const getReadmeFileContents = (rootDirPath: string): string => {
    return getFileContents(path.join(rootDirPath, 'README.md'));
};

const getGoModFileContents = (rootDirPath: string): string => {
    return getFileContents(path.join(rootDirPath, 'go.mod'));
};

const getTaskfileYamlFileContents = (rootDirPath: string): string => {
    return getFileContents(path.join(rootDirPath, 'Taskfile.yml'));
};

const getFilePath = (rootDir, filePath) => path.join(rootDir, filePath);
const normalizeDirectoryPaths = originalPath => originalPath.replace(/\\/g, '/');

export = {
    functionalTestsRootDir,
    testContextRootDir,
    fixturesRootDir,
    testContextRootDirPath,
    fixturesRootDirPath,
    scriptsFixturesRootDirPath,
    scriptsDevSetupFixturesRootDirPath,
    vsCodeFixturesRootDirPath,
    vsCodeCommonFixturesDirPath,
    createTestContextDir,
    getFileContents,
    getFilePath,
    getIgnoreFileContents: getGitIgnoreFileContents,
    gitAttributesFileContents: getGitAttributesFileContents,
    getReadmeFileContents,
    getGoModFileContents,
    getTaskfileYamlFileContents,
    normalizeDirectoryPaths
};
