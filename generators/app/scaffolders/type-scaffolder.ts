'use strict';

import YeomanGenerator = require('yeoman-generator');

import IProjectConfig = require('../interfaces/project-config');
import IProjectScaffolder = require('../interfaces/project-scaffolder');
import ProjectType = require('../enums/project-type');
import utils = require('../utils');

const sharedTemplatesRoot = utils.sharedTemplateRootPath;
const projectsTemplateRoot = utils.projectsTemplateRootPath;

const scaffoldNonBoilerplateContent = (generator: YeomanGenerator, config: IProjectConfig) => {
    const nonBoilerplateTemplates = `${sharedTemplatesRoot}/non-boilerplate/**/*`;
    generator.fs.copyTpl(nonBoilerplateTemplates, generator.destinationRoot(), config);
};

const scaffoldBoilerplateProject = (generator: YeomanGenerator, config: IProjectConfig) => {
    generator.fs.copyTpl(`${projectsTemplateRoot}/boilerplate/**/*`, generator.destinationRoot(), config);
};

const scaffoldCliProject = (generator: YeomanGenerator, config: IProjectConfig) => {
    scaffoldNonBoilerplateContent(generator, config);
    generator.fs.copyTpl(`${projectsTemplateRoot}/cli/**/*`, generator.destinationRoot(), config);
};

const scaffoldLibProject = (generator: YeomanGenerator, config: IProjectConfig) => {
    scaffoldNonBoilerplateContent(generator, config);
    generator.fs.copyTpl(`${projectsTemplateRoot}/lib/**/*`, generator.destinationRoot(), config);
};

const scaffoldLibCliProject = (generator: YeomanGenerator, config: IProjectConfig) => {
    scaffoldNonBoilerplateContent(generator, config);
    generator.fs.copyTpl(`${projectsTemplateRoot}/libcli/**/*`, generator.destinationRoot(), config);
};

const scaffoldSharedContent = (generator: YeomanGenerator, config: IProjectConfig) => {
    const allProjectsTemplates = `${sharedTemplatesRoot}/all-projects/**/*`;
    const destRoot = generator.destinationRoot();
    generator.fs.copyTpl(allProjectsTemplates, destRoot, config);
    generator.fs.move(`${destRoot}/gitignore`, `${destRoot}/.gitignore`);
};

const projectScaffolderFunctionMap = new Map<ProjectType, (generator: YeomanGenerator, config: IProjectConfig) => void>();
projectScaffolderFunctionMap.set(ProjectType.boilerplate, scaffoldBoilerplateProject);
projectScaffolderFunctionMap.set(ProjectType.cli, scaffoldCliProject);
projectScaffolderFunctionMap.set(ProjectType.lib, scaffoldLibProject);
projectScaffolderFunctionMap.set(ProjectType.libcli, scaffoldLibCliProject);

/**
 * Scaffolds the core project content.
 *
 * @param {YeomanGenerator} generator - The yeoman generator instance.
 * @param {IProjectConfig} config - The project configuration.
 * @private
 */
const scaffoldProjectContent = (generator: YeomanGenerator, config: IProjectConfig) => {
    const projectType = config.projectType;
    scaffoldSharedContent(generator, config);
    projectScaffolderFunctionMap.get(projectType)(generator, config);
};

export = <IProjectScaffolder>{
    scaffold: scaffoldProjectContent
};