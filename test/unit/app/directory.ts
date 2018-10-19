'use strict';

import Chai = require('chai');
import mkdirp = require('mkdirp');
import path = require('path');
import Sinon = require('sinon');
import YeomanGenerator = require('yeoman-generator');

import directory = require('../../../generators/app/directory');
import IProjectConfig = require('../../../generators/app/project-config');
import testUtils = require('../../test-utils');

const assert = Chai.assert;

suite('directory Tests:', () => {
    let pathBasenameStub: Sinon.SinonStub;
    let generatorLogStub: Sinon.SinonStub;
    let generatorDestinationPathStub: Sinon.SinonStub;
    let generatorDestinationRootStub: Sinon.SinonStub;
    let mkdirpSyncStub: Sinon.SinonStub;
    const generatorStub: YeomanGenerator = testUtils.generatorStub;
    const config: IProjectConfig = testUtils.projectConfig;

    const appName = config.name;
    const destinationPathBase = appName;
    const destinationRootBase = '';
    const destPathReturnValue = 'fooBarRoo';
    const newDirMessage = 'Your generator must be inside a directory with the same name ' +
        `as your project name '${appName}'\n I'll automatically create this directory for you.`;

    setup(() => {
        mkdirpSyncStub = Sinon.stub(mkdirp, 'sync');
        generatorLogStub = Sinon.stub(generatorStub, 'log');
        generatorDestinationPathStub = Sinon.stub(generatorStub, 'destinationPath').callsFake(() => destinationPathBase);
        generatorDestinationRootStub = Sinon.stub(generatorStub, 'destinationRoot').callsFake(() => destinationRootBase);
        pathBasenameStub = Sinon.stub(path, 'basename').callsFake(() => appName);
    });

    teardown(() => {
        Sinon.restore();
    });

    test('Should not create a subdirectory if the cwd name matches the supplied app name', async () => {
        directory.validateDirectoryName(generatorStub, config);
        assert.isFalse(generatorLogStub.called);
        assert.isFalse(mkdirpSyncStub.called);
        assert.isFalse(generatorDestinationRootStub.calledWith(destPathReturnValue));
    });

    test('Should create a subdirectory if the cwd name does not match the supplied app name', async () => {
        pathBasenameStub.callsFake(() => 'not the same as the app name');
        generatorDestinationPathStub.onSecondCall().callsFake(() => destPathReturnValue);
        directory.validateDirectoryName(generatorStub, config);
        assert.isTrue(generatorDestinationPathStub.secondCall.calledWith(appName));
        assert.isTrue(generatorLogStub.firstCall.calledWithExactly(newDirMessage));
        assert.isTrue(mkdirpSyncStub.calledWith(appName, null));
        assert.isTrue(generatorDestinationRootStub.calledWith(destPathReturnValue));
    });
});