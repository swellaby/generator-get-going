'use strict';

import Chai = require('chai');
import Sinon = require('sinon');
import YeomanGenerator = require('yeoman-generator');

import IProjectConfig = require('../../../../generators/app/interfaces/project-config');
import ProjectType = require('../../../../generators/app/enums/project-type');
import typeScaffolder = require('../../../../generators/app/scaffolders/type-scaffolder');
import testUtils = require('../../../test-utils');
import utils = require('../../../../generators/app/utils');

const assert = Chai.assert;

suite('typeScaffolder Tests:', () => {
    let generatorFsCopyTplStub: Sinon.SinonStub;
    let generatorFsMoveStub: Sinon.SinonStub;
    const generatorStub: YeomanGenerator = testUtils.generatorStub;
    let config: IProjectConfig;
    const destinationRoot = '/usr/foo/bar';
    const expFromSharedRoot = utils.sharedTemplateRootPath;
    const expFromSharedAllProjectsPath = `${expFromSharedRoot}/all-projects/${testUtils.wildcardGlobSuffix}`;
    const expFromNonBoilerplateProjectsPath = `${expFromSharedRoot}/non-boilerplate/${testUtils.wildcardGlobSuffix}`;
    const expFromProjectsRoot = utils.projectsTemplateRootPath;
    const gitignoreFrom = `${destinationRoot}/gitignore`;
    const gitignoreTo = `${destinationRoot}/.gitignore`;
    const gitattributesFrom = `${destinationRoot}/gitattributes`;
    const gitattributesTo = `${destinationRoot}/.gitattributes`;

    setup(() => {
        generatorFsCopyTplStub = Sinon.stub(generatorStub.fs, 'copyTpl');
        Sinon.stub(generatorStub, 'destinationRoot').callsFake(() => destinationRoot);
        generatorFsMoveStub = Sinon.stub(generatorStub.fs, 'move');
        config = JSON.parse(JSON.stringify(testUtils.projectConfig));
    });

    teardown(() => {
        config = null;
        Sinon.restore();
    });

    suite('boilerplate Project Tests:', () => {
        const expFromPath = `${expFromProjectsRoot}/boilerplate/${testUtils.wildcardGlobSuffix}`;

        setup(() => {
            config.projectType = ProjectType.boilerplate;
            typeScaffolder.scaffold(generatorStub, config);
        });

        test('Should correctly scaffold shared content when project type is boilerplate', () => {
            assert.isTrue(generatorFsCopyTplStub.calledWithExactly(expFromSharedAllProjectsPath, destinationRoot, config));
            assert.isTrue(generatorFsMoveStub.calledWithExactly(gitignoreFrom, gitignoreTo));
            assert.isTrue(generatorFsMoveStub.calledWithExactly(gitattributesFrom, gitattributesTo));
         });

        test('Should not scaffold non boilerplate content when project type is boilerplate', () => {
            assert.isFalse(generatorFsCopyTplStub.calledWithExactly(expFromNonBoilerplateProjectsPath, destinationRoot, config));
        });

        test('Should correctly scaffold project specific content when project type is boilerplate', () => {
            assert.isTrue(generatorFsCopyTplStub.calledWithExactly(expFromPath, destinationRoot, config));
        });
    });

    suite('cli Project Tests:', () => {
        const expFromPath = `${expFromProjectsRoot}/cli/${testUtils.wildcardGlobSuffix}`;

        setup(() => {
            config.projectType = ProjectType.cli;
            typeScaffolder.scaffold(generatorStub, config);
        });

        test('Should correctly scaffold shared content when project type is cli', () => {
            assert.isTrue(generatorFsCopyTplStub.calledWithExactly(expFromSharedAllProjectsPath, destinationRoot, config));
            assert.isTrue(generatorFsMoveStub.calledWithExactly(gitignoreFrom, gitignoreTo));
            assert.isTrue(generatorFsMoveStub.calledWithExactly(gitattributesFrom, gitattributesTo));
        });

        test('Should correctly scaffold non boilerplate content when project type is cli', () => {
            assert.isTrue(generatorFsCopyTplStub.calledWithExactly(expFromNonBoilerplateProjectsPath, destinationRoot, config));
        });

        test('Should correctly scaffold project specific content when project type is cli', () => {
            assert.isTrue(generatorFsCopyTplStub.calledWithExactly(expFromPath, destinationRoot, config));
        });
    });

    suite('lib Project Tests:', () => {
        const expFromPath = `${expFromProjectsRoot}/lib/${testUtils.wildcardGlobSuffix}`;

        setup(() => {
            config.projectType = ProjectType.lib;
            typeScaffolder.scaffold(generatorStub, config);
        });

        test('Should correctly scaffold shared content when project type is lib', () => {
            assert.isTrue(generatorFsCopyTplStub.calledWithExactly(expFromSharedAllProjectsPath, destinationRoot, config));
            assert.isTrue(generatorFsMoveStub.calledWithExactly(gitignoreFrom, gitignoreTo));
            assert.isTrue(generatorFsMoveStub.calledWithExactly(gitattributesFrom, gitattributesTo));
        });

        test('Should correctly scaffold non boilerplate content when project type is lib', () => {
            assert.isTrue(generatorFsCopyTplStub.calledWithExactly(expFromNonBoilerplateProjectsPath, destinationRoot, config));
        });

        test('Should correctly scaffold project specific content when project type is lib', () => {
            assert.isTrue(generatorFsCopyTplStub.calledWithExactly(expFromPath, destinationRoot, config));
        });
    });

    suite('libcli Project Tests:', () => {
        const expFromPath = `${expFromProjectsRoot}/libcli/${testUtils.wildcardGlobSuffix}`;

        setup(() => {
            config.projectType = ProjectType.libcli;
            typeScaffolder.scaffold(generatorStub, config);
        });

        test('Should correctly scaffold shared content when project type is libcli', () => {
            assert.isTrue(generatorFsCopyTplStub.calledWithExactly(expFromSharedAllProjectsPath, destinationRoot, config));
            assert.isTrue(generatorFsMoveStub.calledWithExactly(gitignoreFrom, gitignoreTo));
            assert.isTrue(generatorFsMoveStub.calledWithExactly(gitattributesFrom, gitattributesTo));
        });

        test('Should correctly scaffold non boilerplate content when project type is libcli', () => {
            assert.isTrue(generatorFsCopyTplStub.calledWithExactly(expFromNonBoilerplateProjectsPath, destinationRoot, config));
        });

        test('Should correctly scaffold project specific content when project type is libcli', () => {
            assert.isTrue(generatorFsCopyTplStub.calledWithExactly(expFromPath, destinationRoot, config));
        });
    });
});
