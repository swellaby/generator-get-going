'use strict';

import Chai = require('chai');
import Sinon = require('sinon');
import YeomanGenerator = require('yeoman-generator');

import projectInputUtils = require('../../../../generators/app/project-input-utils');
import scaffoldEngine = require('../../../../generators/app/scaffold-engine');

import ProjectType = require('../../../../generators/app/enums/project-type');
import typeInput = require('../../../../generators/app/inputs/type-input');
import testUtils = require('../../../test-utils');

const assert = Chai.assert;

suite('project type input Tests:', () => {
    let generatorStub: YeomanGenerator;
    let generatorPromptStub: Sinon.SinonStub;
    let answers;
    const input = typeInput;
    const inputs = [ input ];
    const optionName = input.optionName;
    const prompt = input.prompt;
    const promptName = prompt.name;
    const expType = ProjectType.lib;

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
        answers[promptName] = expType;
        const config = await projectInputUtils.getDesiredProjectConfig(generatorStub, inputs);
        assert.deepEqual(config.projectType, expType);
    });

    test('Should prompt when option is invalid ', async () => {
        generatorStub.options[optionName] = 'fake';
        answers[promptName] = expType;
        const config = await projectInputUtils.getDesiredProjectConfig(generatorStub, inputs);
        assert.deepEqual(config.projectType, expType);
    });

    test('Should not prompt when option is valid ', async () => {
        generatorStub.options[optionName] = expType;
        const config = await projectInputUtils.getDesiredProjectConfig(generatorStub, inputs);
        assert.isFalse(generatorPromptStub.called);
        assert.deepEqual(config.projectType, expType);
    });
});
