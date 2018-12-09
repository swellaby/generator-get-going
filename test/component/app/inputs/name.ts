'use strict';

import Chai = require('chai');
import Sinon = require('sinon');
import YeomanGenerator = require('yeoman-generator');

import projectInputUtils = require('../../../../generators/app/project-input-utils');
import scaffoldEngine = require('../../../../generators/app/scaffold-engine');

import nameInput = require('../../../../generators/app/inputs/name-input');
import testUtils = require('../../../test-utils');

const assert = Chai.assert;

suite('name input Tests:', () => {
    let generatorStub: YeomanGenerator;
    let generatorPromptStub: Sinon.SinonStub;
    let answers;
    const input = nameInput;
    const inputs = [ input ];
    const optionName = input.optionName;
    const prompt = input.prompt;
    const promptName = prompt.name;
    const expName = 'excellence';

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
        answers[promptName] = expName;
        const config = await projectInputUtils.getDesiredProjectConfig(generatorStub, inputs);
        assert.deepEqual(config.name, expName);
    });

    test('Should prompt when option is invalid ', async () => {
        generatorStub.options[optionName] = '';
        answers[promptName] = expName;
        const config = await projectInputUtils.getDesiredProjectConfig(generatorStub, inputs);
        assert.deepEqual(config.name, expName);
    });

    test('Should not prompt when option is valid ', async () => {
        generatorStub.options[optionName] = expName;
        const config = await projectInputUtils.getDesiredProjectConfig(generatorStub, inputs);
        assert.isFalse(generatorPromptStub.called);
        assert.deepEqual(config.name, expName);
    });

    test('Should have correct prompt validation response for invalid input', async () => {
        const invalidName = 'foo/bar';
        const expMessage = `Invalid app name: '${invalidName}'`;

        const invalidMessage = input.prompt.validate(invalidName, answers);
        assert.deepEqual(invalidMessage, expMessage);
    });

    test('Should have correct prompt validation response for valid input', async () => {
        assert.isTrue(input.prompt.validate(expName, answers));
    });
});
