'use strict';

import Chai = require('chai');
// import inquirer = require('inquirer');
import Sinon = require('sinon');
import YeomanGenerator = require('yeoman-generator');

import projectInputUtils = require('../../../../generators/app/project-input-utils');
import scaffoldEngine = require('../../../../generators/app/scaffold-engine');

import ownerInput = require('../../../../generators/app/inputs/owner-input');
import testUtils = require('../../../test-utils');

const assert = Chai.assert;

suite('owner input Tests:', () => {
    let generatorStub: YeomanGenerator;
    let generatorPromptStub: Sinon.SinonStub;
    let answers;
    const input = ownerInput;
    const inputs = [ input ];
    const optionName = input.optionName;
    const prompt = <YeomanGenerator.Question<Record<string, unknown>>>input.prompt;
    const promptName = prompt.name;
    const expOwner = 'swellaby';

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
        answers[promptName] = expOwner;
        const config = await projectInputUtils.getDesiredProjectConfig(generatorStub, inputs);
        assert.deepEqual(config.owner, expOwner);
    });

    test('Should prompt when option is invalid ', async () => {
        generatorStub.options[optionName] = '';
        answers[promptName] = expOwner;
        const config = await projectInputUtils.getDesiredProjectConfig(generatorStub, inputs);
        assert.deepEqual(config.owner, expOwner);
    });

    test('Should not prompt when option is valid ', async () => {
        generatorStub.options[optionName] = expOwner;
        const config = await projectInputUtils.getDesiredProjectConfig(generatorStub, inputs);
        assert.isFalse(generatorPromptStub.called);
        assert.deepEqual(config.owner, expOwner);
    });

    test('Should have correct prompt validation response for invalid input', async () => {
        const owner = '!*&#^(^';
        const expMessage = `Invalid owner/author name: '${owner}'`;

        const invalidMessage = prompt.validate(owner, answers);
        assert.deepEqual(invalidMessage, expMessage);
    });

    test('Should have correct prompt validation response for valid input', async () => {
        assert.isTrue(prompt.validate(expOwner, answers));
    });
});
