'use strict';

import chai = require('chai');
import fs = require('fs');
import path = require('path');
import Sinon = require('sinon');

import gitScaffolder = require('../../../../generators/app/scaffolders/git-scaffolder');
import scaffoldEngine = require('../../../../generators/app/scaffold-engine');
import testUtils = require('../../../test-utils');

const assert = chai.assert;

suite('git scaffolder Tests:', () => {
    const generator = testUtils.generatorStub;
    const scaffolders = [ gitScaffolder ];
    const config = testUtils.projectConfig;
    const appName = 'app';
    let generatorLogStub: Sinon.SinonStub;
    const resolvedGitPath = 'usr/foo/app-name/.git';
    const fsStatsStub = testUtils.fsStatStub;
    let isFileStub: Sinon.SinonStub;
    let fsStatSyncStub: Sinon.SinonStub;
    let fsUnlinkStub: Sinon.SinonStub;
    let spawnCommandSyncStub: Sinon.SinonStub;
    const initGitRepoMessage = testUtils.initGitRepoMessage;
    const gitFileFoundMessage = testUtils.gitFileFoundMessage;
    const gitInitFailedMessage = testUtils.gitInitFailedMessage;

    setup(() => {
        Sinon.stub(generator, 'destinationPath').callsFake(() => appName);
        Sinon.stub(generator, 'destinationRoot').callsFake(() => '');
        spawnCommandSyncStub = Sinon.stub(generator, 'spawnCommandSync').callsFake(() => null);
        Sinon.stub(path, 'join');
        Sinon.stub(path, 'resolve').onFirstCall().callsFake(() => resolvedGitPath);
        fsStatSyncStub = Sinon.stub(fs, 'statSync').callsFake(() => fsStatsStub);
        fsUnlinkStub = Sinon.stub(fs, 'unlinkSync');
        isFileStub = Sinon.stub(fsStatsStub, 'isFile').callsFake(() => false);
        generatorLogStub = Sinon.stub(generator, 'log');
    });

    teardown(() => {
        Sinon.restore();
    });

    test('Should remove file and create git directory', () => {
        isFileStub.callsFake(() => true);
        scaffoldEngine.scaffoldNewProject(scaffolders, generator, config);
        assert.isTrue(generatorLogStub.calledWithExactly(gitFileFoundMessage));
        assert.isTrue(generatorLogStub.calledWithExactly(initGitRepoMessage));
        assert.isTrue(fsUnlinkStub.called);
        assert.isTrue(spawnCommandSyncStub.called);
    });

    test('Should create git directory when it does not exist', () => {
        fsStatSyncStub.throws(new Error());
        scaffoldEngine.scaffoldNewProject(scaffolders, generator, config);
        assert.isTrue(generatorLogStub.calledWithExactly(initGitRepoMessage));
        assert.isTrue(spawnCommandSyncStub.called);
    });

    test('Should log error message when git init fails', () => {
        fsStatSyncStub.throws(new Error());
        spawnCommandSyncStub.throws(new Error());
        scaffoldEngine.scaffoldNewProject(scaffolders, generator, config);
        assert.isTrue(generatorLogStub.calledWithExactly(initGitRepoMessage));
        assert.isTrue(generatorLogStub.calledWithExactly(gitInitFailedMessage));
    });
});
