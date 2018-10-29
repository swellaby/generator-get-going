'use strict';

import YeomanGenerator = require('yeoman-generator');

import IProjectConfig = require('../interfaces/project-config');
import IProjectScaffolder = require('../interfaces/project-scaffolder');
import utils = require('../utils');

/**
 * Scaffolds the VS Code content.
 *
 * @param {YeomanGenerator} generator - The yeoman generator instance.
 * @param {IProjectConfig} config - The project configuration.
 * @private
 */
const scaffoldVSCodeContent = (generator: YeomanGenerator, config: IProjectConfig) => {
    if (config.includeVSCode) {
        const vsCodeTemplatePath = `${utils.conditionalTemplatesRootPath}/vscode/**/*`;
        const toPath = `${generator.destinationRoot()}/.vscode`;
        generator.fs.copyTpl(vsCodeTemplatePath, toPath, config);
    }
};

export = <IProjectScaffolder>{
    scaffold: scaffoldVSCodeContent
};