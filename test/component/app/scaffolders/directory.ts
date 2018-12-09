'use strict';

import chai = require('chai');
import mkdirp = require('mkdirp');
import path = require('path');
import Sinon = require('sinon');

import directoryScaffolder = require('../../../../generators/app/scaffolders/directory-scaffolder');
import IProjectConfig = require('../../../../generators/app/interfaces/project-config');
import scaffoldEngine = require('../../../../generators/app/scaffold-engine');
import testUtils = require('../../../test-utils');

const assert = chai.assert;

suite('directory scaffolder Tests:', () => {
    const generator = testUtils.generatorStub;
    const scaffolders = [ directoryScaffolder ];
    let config: IProjectConfig;
    const appName = 'app';
    let generatorLogStub: Sinon.SinonStub;
    let mkdirpSyncStub: Sinon.SinonStub;

    setup(() => {
        config = <IProjectConfig>{};
        config.name = appName;
        Sinon.stub(generator, 'destinationPath').callsFake(() => appName);
        Sinon.stub(generator, 'destinationRoot').callsFake(() => '');
        mkdirpSyncStub = Sinon.stub(mkdirp, 'sync');
        Sinon.stub(path, 'basename').callsFake(() => appName);
        generatorLogStub = Sinon.stub(generator, 'log');
    });

    teardown(() => {
        Sinon.restore();
        config = null;
    });

    test('Should not create directory when name matches', () => {
        scaffoldEngine.scaffoldNewProject(scaffolders, generator, config);
        assert.isFalse(mkdirpSyncStub.called);
        assert.isFalse(generatorLogStub.called);
    });

    test('Should create directory when name does not match', () => {
        config.name = 'different';
        scaffoldEngine.scaffoldNewProject(scaffolders, generator, config);
        assert.isTrue(mkdirpSyncStub.called);
        assert.isTrue(generatorLogStub.called);
    });
});
