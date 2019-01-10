'use strict';

import path = require('path');
import fileSystemUtils = require('./filesystem-utils');

const b3RootDirPath = path.join(fileSystemUtils.testContextRootDirPath, 'b3');

const getB3IgnoreFileContents = (): string => {
    return fileSystemUtils.getIgnoreFileContents(b3RootDirPath);
};

const getB3AttributesFileContents = (): string => {
    return fileSystemUtils.gitAttributesFileContents(b3RootDirPath);
};

const getB3ReadmeFileContents = (): string => {
    return fileSystemUtils.getReadmeFileContents(b3RootDirPath);
};

const getB3GoModFileContents = (): string => {
    return fileSystemUtils.getGoModFileContents(b3RootDirPath);
};

const getVSCodeCommonFileContents = (rootDirPath: string, fileName: string): string => {
    return fileSystemUtils.getFileContents(path.join(rootDirPath, '.vscode', fileName));
};

const getScriptsCommonFileContents = (rootDirPath: string, relativeFilePath: string): string => {
    return fileSystemUtils.getFileContents(path.join(rootDirPath, 'scripts', relativeFilePath));
};

const getB3VSCodeCSpellFileContents = (): string => {
    return getVSCodeCommonFileContents(b3RootDirPath, 'cSpell.json');
};

const getB3VSCodeExtensionsFileContents = (): string => {
    return getVSCodeCommonFileContents(b3RootDirPath, 'extensions.json');
};

const getB3VSCodeLaunchFileContents = (): string => {
    return getVSCodeCommonFileContents(b3RootDirPath, 'launch.json');
};

const getB3MainGoFileContents = (): string => {
    return fileSystemUtils.getFileContents(path.join(b3RootDirPath, 'main.go'));
};

const getB3GoTaskDevSetupGoFileContents = (): string => {
    return getScriptsCommonFileContents(b3RootDirPath, 'dev_setup.go');
};

export = {
    boilerplate: {
        b3: {
            getGitIgnoreContents: getB3IgnoreFileContents,
            getGitAttributesContents: getB3AttributesFileContents,
            getGoModContents: getB3GoModFileContents,
            getReadmeContents: getB3ReadmeFileContents,
            getMainGoContents: getB3MainGoFileContents
        }
    },
    vsCode: {
        common: {
            getB3VSCodeCSpellFileContents,
            getB3VSCodeExtensionsFileContents,
            getB3VSCodeLaunchFileContents
        }
    },
    scripts: {
        devSetup: {
            b3: {
                getB3GoTaskDevSetupGoFileContents
            }
        }
    }
};
