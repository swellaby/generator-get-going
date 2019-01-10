'use strict';

import path = require('path');
import fileSystemUtils = require('./filesystem-utils');

const getFileContents = fileSystemUtils.getFileContents;
const vsCodeCommonFixturesDirPath = fileSystemUtils.vsCodeCommonFixturesDirPath;
const scriptsDevSetupFixturesRootDirPath = fileSystemUtils.scriptsDevSetupFixturesRootDirPath;
const defaultDescription = 'save the world';
const defaultOwner = 'swellaby';
const defaultLinter = 'golint';
const defaultTaskRunner = 'task';
const defaultVsCode = true;

const vsCodeFixtures = {
    common: {
        cSpellContents: getFileContents(path.join(vsCodeCommonFixturesDirPath, 'cSpell.json')),
        extensionsContents: getFileContents(path.join(vsCodeCommonFixturesDirPath, 'extensions.json')),
        launchContents: getFileContents(path.join(vsCodeCommonFixturesDirPath, 'launch.json'))
    }
};

const getGoTaskDevSetupFileContents = (): string => {
    return fileSystemUtils.getDevSetupScriptFileContents(path.join(scriptsDevSetupFixturesRootDirPath, 'task'));
};

const scriptsFixtures = {
    devSetup: {
        getGoTaskDevSetupFileContents
    }
};

const boilerplateFixturesRootDirPath = path.join(fileSystemUtils.fixturesRootDirPath, 'boilerplate');
const b3RootDirPath = path.join(boilerplateFixturesRootDirPath, 'b3');

const getB3ReadmeFileContents = (): string => {
    return fileSystemUtils.getReadmeFileContents(b3RootDirPath);
};

const getB3GoModFileContents = (): string => {
    return fileSystemUtils.getGoModFileContents(b3RootDirPath);
};

const getB3MainGoFileContents = (): string => {
    return fileSystemUtils.getFileContents(path.join(boilerplateFixturesRootDirPath, 'main.go'));
};

const taskRunnerRootDirPath = path.join(fileSystemUtils.fixturesRootDirPath, 'task-runner');

const getTaskfileYamlFileContents = (rootDir: string): string => {
    return fileSystemUtils.getFileContents(path.join(rootDir, 'Taskfile.yml'));
};

const getT1TaskfileYamlFileContents = (): string => {
    return getTaskfileYamlFileContents(path.join(taskRunnerRootDirPath, 'task'));
};

export = {
    gitattributesContent: fileSystemUtils.gitAttributesFileContents(fileSystemUtils.fixturesRootDirPath),
    vsCodeFixtures,
    scriptsFixtures,
    defaultDescription,
    defaultOwner,
    defaultLinter,
    defaultTaskRunner,
    defaultVsCode,
    boilerplate: {
        b3: {
            getReadmeContents: getB3ReadmeFileContents,
            getGoModContents: getB3GoModFileContents,
            gitIgnoreContents:  fileSystemUtils.getIgnoreFileContents(b3RootDirPath),
            getMainGoFileContents: getB3MainGoFileContents
        }
    },
    taskRunner: {
        t1: {
            getT1TaskfileYamlFileContents
        }
    }
};
