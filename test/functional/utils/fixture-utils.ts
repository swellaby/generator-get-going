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

const scriptsFixtures = {
    devSetup: {
        task: getFileContents(path.join(scriptsDevSetupFixturesRootDirPath, 'task', 'dev_setup.go'))
    }
};

const boilerplateFixturesRootDirPath = path.join(fileSystemUtils.fixturesRootDirPath, 'boilerplate');
const b3RootDirPath = path.join(boilerplateFixturesRootDirPath, 'b3');

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
            gitIgnoreContents:  fileSystemUtils.getIgnoreFileContents(b3RootDirPath)
        }
    }
};
