'use strict';

import Chai = require('chai');
import fs = require('fs');
import path = require('path');
import Sinon = require('sinon');
import YeomanGenerator = require('yeoman-generator');

import git = require('../../../generators/app/git');
import testUtils = require('../../test-utils');

const assert = Chai.assert;

suite('git Tests:', () => {
    let fsIsFileStub: Sinon.SinonStub;
    const fsStatsStub: fs.Stats = testUtils.fsStatStub;
    let fsStatSyncStub: Sinon.SinonStub;
    let fsUnlinkSyncStub: Sinon.SinonStub;
    let pathJoinStub: Sinon.SinonStub;
    let pathResolveStub: Sinon.SinonStub;
    let generatorDestinationRootStub: Sinon.SinonStub;
    let generatorLogStub: Sinon.SinonStub;
    let generatorSpawnCommandSyncStub: Sinon.SinonStub;
    const generatorStub: YeomanGenerator = testUtils.generatorStub;

    const destinationRootBase = 'foo/bar';
    const initGitRepoMessage = 'I see that you don\'t have a git repo in the target directory. I\'ll initialize it for you now, and then ' +
        'you can add your remote later on via a \'git remote add origin <<insert your remote url here>>\'. For example: ' +
        '\'git remote add origin https://github.com/me/my-repo.git\'';
    const gitFileFoundMessage = 'Are you being mischievous? You have a file in the target directory named \'.git\' with' +
        'the same name as the directory git uses. I am deleting this because it will cause errors and you' +
        'absolutely do not need it. :)';
    const gitInitFailedMessage = 'Encountered an error while trying to initialize the git repository. ' +
        'You may not have git installed. Please consult the internet for information on how to install git';
    const resolvedGitPath = 'usr/foo/app-name/.git';
    const joinedGitPath = '/' + resolvedGitPath;

    setup(() => {
        generatorLogStub = Sinon.stub(generatorStub, 'log');
        generatorSpawnCommandSyncStub = Sinon.stub(generatorStub, 'spawnCommandSync').callsFake(() => null);
        generatorDestinationRootStub = Sinon.stub(generatorStub, 'destinationRoot').callsFake(() => {
            return destinationRootBase;
        });
        pathJoinStub = Sinon.stub(path, 'join').onFirstCall().callsFake(() => {
            return joinedGitPath;
        });
        pathResolveStub = Sinon.stub(path, 'resolve').onFirstCall().callsFake(() => {
            return resolvedGitPath;
        });
        fsIsFileStub = Sinon.stub(fsStatsStub, 'isFile').callsFake(() => false);
        fsStatSyncStub = Sinon.stub(fs, 'statSync').callsFake(() => fsStatsStub);
        fsUnlinkSyncStub = Sinon.stub(fs, 'unlinkSync');
    });

    teardown(() => {
        Sinon.restore();
    });

    test('Should not attempt to initialize an existing git repository', async () => {
        await git.validateGitRepository(generatorStub, null);
        assert.isTrue(pathResolveStub.firstCall.calledWith(destinationRootBase));
        assert.isTrue(pathJoinStub.firstCall.calledWith(resolvedGitPath, '.git'));
        assert.isTrue(fsStatSyncStub.firstCall.calledWith(joinedGitPath));
        assert.isFalse(generatorLogStub.calledWith(gitFileFoundMessage));
        assert.isFalse(fsUnlinkSyncStub.called);
        assert.isFalse(generatorLogStub.calledWith(initGitRepoMessage));
        assert.isFalse(generatorSpawnCommandSyncStub.calledWith('git', ['init', '--quiet']));
    });

    test('Should initialize a git repo and delete the .git file when a file named .git is found', async () => {
        fsIsFileStub.callsFake(() => true);
        await git.validateGitRepository(generatorStub, null);
        assert.isTrue(pathResolveStub.firstCall.calledWith(destinationRootBase));
        assert.isTrue(pathJoinStub.firstCall.calledWith(resolvedGitPath, '.git'));
        assert.isTrue(fsStatSyncStub.firstCall.calledWith(joinedGitPath));
        assert.isTrue(generatorLogStub.firstCall.calledWith(gitFileFoundMessage));
        assert.isTrue(fsUnlinkSyncStub.called);
        assert.isTrue(generatorLogStub.secondCall.calledWith(initGitRepoMessage));
        assert.isTrue(generatorSpawnCommandSyncStub.calledWith('git', ['init', '--quiet']));
    });

    test('Should initialize a git repo when there is no .git directory present', async () => {
        fsStatSyncStub.throws(new Error('EONET: not found'));
        await git.validateGitRepository(generatorStub, null);
        assert.isTrue(pathResolveStub.firstCall.calledWith(destinationRootBase));
        assert.isTrue(pathJoinStub.firstCall.calledWith(resolvedGitPath, '.git'));
        assert.isTrue(fsStatSyncStub.firstCall.calledWith(joinedGitPath));
        assert.isFalse(generatorLogStub.firstCall.calledWith(gitFileFoundMessage));
        assert.isFalse(fsUnlinkSyncStub.called);
        assert.isTrue(generatorLogStub.firstCall.calledWith(initGitRepoMessage));
        assert.isTrue(generatorSpawnCommandSyncStub.calledWith('git', ['init', '--quiet']));
    });

    test('Should display an error when the git repo initialization fails', async () => {
        fsStatSyncStub.throws(new Error('EONET: not found'));
        generatorSpawnCommandSyncStub.throws(new Error('command not found'));
        await git.validateGitRepository(generatorStub, null);
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