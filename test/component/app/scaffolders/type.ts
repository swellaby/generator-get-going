'use strict';

import chai = require('chai');
import Sinon = require('sinon');

import typeScaffolder = require('../../../../generators/app/scaffolders/type-scaffolder');
import IProjectConfig = require('../../../../generators/app/interfaces/project-config');
import ProjectType = require('../../../../generators/app/enums/project-type');
import scaffoldEngine = require('../../../../generators/app/scaffold-engine');
import testUtils = require('../../../test-utils');

const assert = chai.assert;

suite('type scaffolder Tests:', () => {
    const generator = testUtils.generatorStub;
    const scaffolders = [ typeScaffolder ];
    let config: IProjectConfig;
    const appName = 'app';
    let fsCopyTplStub: Sinon.SinonStub;
    let fsMoveStub: Sinon.SinonStub;

    setup(() => {
        config = <IProjectConfig>{};
        Sinon.stub(generator, 'destinationPath').callsFake(() => appName);
        Sinon.stub(generator, 'destinationRoot').callsFake(() => '');
        fsCopyTplStub = Sinon.stub(generator.fs, 'copyTpl');
        fsMoveStub = Sinon.stub(generator.fs, 'move');
        Sinon.stub(generator, 'log');
    });

    teardown(() => {
        Sinon.restore();
        config = null;
    });

    test('Should scaffold boilerplate project correctly', () => {
        config.projectType = ProjectType.boilerplate;
        scaffoldEngine.scaffoldNewProject(scaffolders, generator, config);
        assert.deepEqual(fsCopyTplStub.callCount, 2);
        assert.deepEqual(fsMoveStub.callCount, 2);
    });

    test('Should scaffold lib project correctly', () => {
        config.projectType = ProjectType.lib;
        scaffoldEngine.scaffoldNewProject(scaffolders, generator, config);
        assert.deepEqual(fsCopyTplStub.callCount, 3);
        assert.isTrue(fsMoveStub.called);
    });

    test('Should scaffold libcli project correctly', () => {
        config.projectType = ProjectType.libcli;
        scaffoldEngine.scaffoldNewProject(scaffolders, generator, config);
        assert.deepEqual(fsCopyTplStub.callCount, 3);
        assert.isTrue(fsMoveStub.called);
    });

    test('Should scaffold cli project correctly', () => {
        config.projectType = ProjectType.cli;
        scaffoldEngine.scaffoldNewProject(scaffolders, generator, config);
        assert.deepEqual(fsCopyTplStub.callCount, 3);
        assert.isTrue(fsMoveStub.called);
    });
});
