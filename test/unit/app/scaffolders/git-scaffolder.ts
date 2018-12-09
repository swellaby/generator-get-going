'use strict';

import Chai = require('chai');
import fs = require('fs');
import path = require('path');
import Sinon = require('sinon');
import YeomanGenerator = require('yeoman-generator');

import gitScaffolder = require('../../../../generators/app/scaffolders/git-scaffolder');
import testUtils = require('../../../test-utils');

const assert = Chai.assert;

suite('gitScaffolder Tests:', () => {
    let fsIsFileStub: Sinon.SinonStub;
    const fsStatsStub: fs.Stats = testUtils.fsStatStub;
    let fsStatSyncStub: Sinon.SinonStub;
    let fsUnlinkSyncStub: Sinon.SinonStub;
    let pathJoinStub: Sinon.SinonStub;
    let pathResolveStub: Sinon.SinonStub;
    let generatorLogStub: Sinon.SinonStub;
    let generatorSpawnCommandSyncStub: Sinon.SinonStub;
    const generatorStub: YeomanGenerator = testUtils.generatorStub;

    const destinationRootBase = 'foo/bar';
    const initGitRepoMessage = testUtils.initGitRepoMessage;
    const gitFileFoundMessage = testUtils.gitFileFoundMessage;
    const gitInitFailedMessage = testUtils.gitInitFailedMessage;
    const resolvedGitPath = 'usr/foo/app-name/.git';
    const joinedGitPath = '/' + resolvedGitPath;

    setup(() => {
        generatorLogStub = Sinon.stub(generatorStub, 'log');
        generatorSpawnCommandSyncStub = Sinon.stub(generatorStub, 'spawnCommandSync').callsFake(() => null);
        Sinon.stub(generatorStub, 'destinationRoot').callsFake(() => destinationRootBase);
        pathJoinStub = Sinon.stub(path, 'join').onFirstCall().callsFake(() => joinedGitPath);
        pathResolveStub = Sinon.stub(path, 'resolve').onFirstCall().callsFake(() => resolvedGitPath);
        fsIsFileStub = Sinon.stub(fsStatsStub, 'isFile').callsFake(() => false);
        fsStatSyncStub = Sinon.stub(fs, 'statSync').callsFake(() => fsStatsStub);
        fsUnlinkSyncStub = Sinon.stub(fs, 'unlinkSync');
    });

    teardown(() => {
        Sinon.restore();
    });

    test('Should not attempt to initialize an existing git repository', () => {
        gitScaffolder.scaffold(generatorStub, null);
        assert.isTrue(pathResolveStub.firstCall.calledWith(destinationRootBase));
        assert.isTrue(pathJoinStub.firstCall.calledWith(resolvedGitPath, '.git'));
        assert.isTrue(fsStatSyncStub.firstCall.calledWith(joinedGitPath));
        assert.isFalse(generatorLogStub.calledWith(gitFileFoundMessage));
        assert.isFalse(fsUnlinkSyncStub.called);
        assert.isFalse(generatorLogStub.calledWith(initGitRepoMessage));
        assert.isFalse(generatorSpawnCommandSyncStub.calledWith('git', ['init', '--quiet']));
    });

    test('Should initialize a git repo and delete the .git file when a file named .git is found', () => {
        fsIsFileStub.callsFake(() => true);
        gitScaffolder.scaffold(generatorStub, null);
        assert.isTrue(pathResolveStub.firstCall.calledWith(destinationRootBase));
        assert.isTrue(pathJoinStub.firstCall.calledWith(resolvedGitPath, '.git'));
        assert.isTrue(fsStatSyncStub.firstCall.calledWith(joinedGitPath));
        assert.isTrue(generatorLogStub.firstCall.calledWith(gitFileFoundMessage));
        assert.isTrue(fsUnlinkSyncStub.called);
        assert.isTrue(generatorLogStub.secondCall.calledWith(initGitRepoMessage));
        assert.isTrue(generatorSpawnCommandSyncStub.calledWith('git', ['init', '--quiet']));
    });

    test('Should initialize a git repo when there is no .git directory present', () => {
        fsStatSyncStub.throws(new Error('EONET: not found'));
        gitScaffolder.scaffold(generatorStub, null);
        assert.isTrue(pathResolveStub.firstCall.calledWith(destinationRootBase));
        assert.isTrue(pathJoinStub.firstCall.calledWith(resolvedGitPath, '.git'));
        assert.isTrue(fsStatSyncStub.firstCall.calledWith(joinedGitPath));
        assert.isFalse(generatorLogStub.firstCall.calledWith(gitFileFoundMessage));
        assert.isFalse(fsUnlinkSyncStub.called);
        assert.isTrue(generatorLogStub.firstCall.calledWith(initGitRepoMessage));
        assert.isTrue(generatorSpawnCommandSyncStub.calledWith('git', ['init', '--quiet']));
    });

    test('Should display an error when the git repo initialization fails', () => {
        fsStatSyncStub.throws(new Error('EONET: not found'));
        generatorSpawnCommandSyncStub.throws(new Error('command not found'));
        gitScaffolder.scaffold(generatorStub, null);
        assert.isTrue(pathResolveStub.firstCall.calledWith(destinationRootBase));
        assert.isTrue(pathJoinStub.firstCall.calledWith(resolvedGitPath, '.git'));
        assert.isTrue(fsStatSyncStub.firstCall.calledWith(joinedGitPath));
        assert.isFalse(generatorLogStub.firstCall.calledWith(gitFileFoundMessage));
        assert.isFalse(fsUnlinkSyncStub.called);
        assert.isTrue(generatorLogStub.firstCall.calledWith(initGitRepoMessage));
        assert.isTrue(generatorSpawnCommandSyncStub.calledWith('git', ['init', '--quiet']));
        assert.isTrue(generatorLogStub.secondCall.calledWith(gitInitFailedMessage));
    });
});
