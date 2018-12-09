'use strict';

import Chai = require('chai');
import Sinon = require('sinon');
import YeomanGenerator = require('yeoman-generator');

import projectInputUtils = require('../../../../generators/app/project-input-utils');
import scaffoldEngine = require('../../../../generators/app/scaffold-engine');

import TaskRunner = require('../../../../generators/app/enums/task-runner');
import taskRunnerInput = require('../../../../generators/app/inputs/task-runner-input');
import testUtils = require('../../../test-utils');

const assert = Chai.assert;

suite('task-runner input Tests:', () => {
    let generatorStub: YeomanGenerator;
    let generatorPromptStub: Sinon.SinonStub;
    let answers;
    const input = taskRunnerInput;
    const inputs = [ input ];
    const optionName = input.optionName;
    const prompt = input.prompt;
    const promptName = prompt.name;
    const expTaskRunner = TaskRunner.task;

    setup(() => {
        answers = {};
        generatorStub = testUtils.generatorStub;
        Sinon.stub(generatorStub, 'log');
        generatorPromptStub = Sinon.stub(generatorStub, 'prompt').callsFake(() => Promise.resolve(answers));
        Sinon.stub(scaffoldEngine, 'scaffoldNewProject');
    });

    teardown(() => {
        Sinon.restore();
        generatorStub = null;
        answers = null;
    });

    test('Should prompt when option is undefined ', async () => {
        generatorStub.options[optionName] = undefined;
        answers[promptName] = expTaskRunner;
        const config = await projectInputUtils.getDesiredProjectConfig(generatorStub, inputs);
        assert.deepEqual(config.taskRunnerConfig.taskRunner, expTaskRunner);
    });

    test('Should prompt when option is invalid ', async () => {
        generatorStub.options[optionName] = 'adfadf';
        answers[promptName] = expTaskRunner;
        const config = await projectInputUtils.getDesiredProjectConfig(generatorStub, inputs);
        assert.deepEqual(config.taskRunnerConfig.taskRunner, expTaskRunner);
    });

    test('Should not prompt when option is valid ', async () => {
        generatorStub.options[optionName] = expTaskRunner;
        const config = await projectInputUtils.getDesiredProjectConfig(generatorStub, inputs);
        assert.isFalse(generatorPromptStub.called);
        assert.deepEqual(config.taskRunnerConfig.taskRunner, expTaskRunner);
    });
});
