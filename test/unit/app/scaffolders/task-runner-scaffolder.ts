'use strict';

import Chai = require('chai');
import Sinon = require('sinon');
import YeomanGenerator = require('yeoman-generator');

import IProjectConfig = require('../../../../generators/app/interfaces/project-config');
import TaskRunner = require('../../../../generators/app/enums/task-runner');
import taskRunnerScaffolder = require('../../../../generators/app/scaffolders/task-runner-scaffolder');
import testUtils = require('../../../test-utils');
import utils = require('../../../../generators/app/utils');

const assert = Chai.assert;

suite('taskRunnerScaffolder Tests:', () => {
    let generatorFsCopyTplStub: Sinon.SinonStub;
    const generatorStub: YeomanGenerator = testUtils.generatorStub;
    let config: IProjectConfig;
    const destinationRoot = '/usr/foo/bar';
    const expFromRoot = utils.taskRunnerTemplatesRootPath;

    setup(() => {
        generatorFsCopyTplStub = Sinon.stub(generatorStub.fs, 'copyTpl');
        Sinon.stub(generatorStub, 'destinationRoot').callsFake(() => destinationRoot);
        config = JSON.parse(JSON.stringify(testUtils.projectConfig));
    });

    teardown(() => {
        config = null;
        Sinon.restore();
    });

    test('Should correctly scaffold when task runner is set to task', () => {
        config.taskRunnerConfig.taskRunner = TaskRunner.task;
        const expFromPath = `${expFromRoot}/task/${testUtils.wildcardGlobSuffix}`;
        taskRunnerScaffolder.scaffold(generatorStub, config);
        assert.isTrue(generatorFsCopyTplStub.calledOnceWithExactly(expFromPath, destinationRoot, config));
    });
});