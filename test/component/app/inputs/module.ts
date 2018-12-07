'use strict';

import Chai = require('chai');
import Sinon = require('sinon');
import YeomanGenerator = require('yeoman-generator');

import projectInputUtils = require('../../../../generators/app/project-input-utils');
import scaffoldEngine = require('../../../../generators/app/scaffold-engine');

import moduleInput = require('../../../../generators/app/inputs/module-input');
import nameInput = require('../../../../generators/app/inputs/name-input');
import ownerInput = require('../../../../generators/app/inputs/owner-input');
import testUtils = require('../../../test-utils');

const assert = Chai.assert;

suite('module input Tests:', () => {
    let generatorStub: YeomanGenerator;
    let generatorPromptStub: Sinon.SinonStub;
    let answers;
    const input = moduleInput;
    const inputs = [ input ];
    const optionName = input.optionName;
    const prompt = input.prompt;
    const promptName = prompt.name;
    const expModule = 'github.com/swellaby/go-sample';

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
        answers[promptName] = expModule;
        const config = await projectInputUtils.getDesiredProjectConfig(generatorStub, inputs);
        assert.deepEqual(config.moduleName, expModule);
    });

    test('Should prompt when option is invalid ', async () => {
        generatorStub.options[optionName] = '';
        answers[promptName] = expModule;
        const config = await projectInputUtils.getDesiredProjectConfig(generatorStub, inputs);
        assert.deepEqual(config.moduleName, expModule);
    });

    test('Should not prompt when option is valid ', async () => {
        generatorStub.options[optionName] = expModule;
        const config = await projectInputUtils.getDesiredProjectConfig(generatorStub, inputs);
        assert.isFalse(generatorPromptStub.called);
        assert.deepEqual(config.moduleName, expModule);
    });

    test('Should have correct prompt default', async () => {
        const appName = 'foo-test';
        const owner = 'swellaby';
        answers[nameInput.prompt.name] = appName;
        answers[ownerInput.prompt.name] = owner;
        const moduleName = input.prompt.default(answers);
        assert.deepEqual(moduleName, `github.com/${owner}/${appName}`);
    });

    test('Should have correct prompt validation response for invalid input', async () => {
        const invalidModule = '%$';
        const expMessage = `Invalid Go module name: '${invalidModule}'\n` +
            'Module name must follow the pattern of: host/owner/repo-path, like: ' +
            'github.com/foo/bar or github.com/foo/bar/x/y/z';

        const invalidMessage = input.prompt.validate(invalidModule, answers);
        assert.deepEqual(invalidMessage, expMessage);
    });

    test('Should have correct prompt validation response for valid input', async () => {
        assert.isTrue(input.prompt.validate(expModule, answers));
    });
});
