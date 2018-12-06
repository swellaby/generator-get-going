'use strict';

import Chai = require('chai');
import Sinon = require('sinon');
import YeomanGenerator = require('yeoman-generator');

import projectInputUtils = require('../../../generators/app/project-input-utils');
import scaffoldEngine = require('../../../generators/app/scaffold-engine');

import descriptionInput = require('../../../generators/app/inputs/description-input');
import linterInput = require('../../../generators/app/inputs/linter-input');
import moduleInput = require('../../../generators/app/inputs/module-input');
import nameInput = require('../../../generators/app/inputs/name-input');
import ownerInput = require('../../../generators/app/inputs/owner-input');
import taskRunnerInput = require('../../../generators/app/inputs/task-runner-input');
import typeInput = require('../../../generators/app/inputs/type-input');
import vscodeInput = require('../../../generators/app/inputs/vscode-input');

import Linter = require('../../../generators/app/enums/linter');

import testUtils = require('../../test-utils');

const assert = Chai.assert;

suite('config Tests:', () => {
    let generatorStub: YeomanGenerator;
    let generatorPromptStub: Sinon.SinonStub;
    let answers;

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

    suite('description Tests:', () => {
        const input = descriptionInput;
        const inputs = [ input ];
        const optionName = input.optionName;
        const prompt = input.prompt;
        const promptName = prompt.name;
        const expDescription = 'foo bar roo.';

        test('Should prompt when option is invalid ', async () => {
            generatorStub.options[optionName] = undefined;
            answers[promptName] = expDescription;
            const config = await projectInputUtils.getDesiredProjectConfig(generatorStub, inputs);
            assert.deepEqual(config.description, expDescription);
        });

        test('Should not prompt when option is valid ', async () => {
            generatorStub.options[optionName] = expDescription;
            const config = await projectInputUtils.getDesiredProjectConfig(generatorStub, inputs);
            assert.isFalse(generatorPromptStub.called);
            assert.deepEqual(config.description, expDescription);
        });
    });

    suite('linter Tests:', () => {
        const input = linterInput;
        const inputs = [ input ];
        const optionName = input.optionName;
        const prompt = input.prompt;
        const promptName = prompt.name;
        const expLinter = Linter.golint;

        test('Should prompt when option is undefined ', async () => {
            generatorStub.options[optionName] = undefined;
            answers[promptName] = expLinter;
            const config = await projectInputUtils.getDesiredProjectConfig(generatorStub, inputs);
            assert.deepEqual(config.linterConfig.linterType, expLinter);
        });

        test('Should prompt when option is invalid ', async () => {
            generatorStub.options[optionName] = 'adfadf';
            answers[promptName] = expLinter;
            const config = await projectInputUtils.getDesiredProjectConfig(generatorStub, inputs);
            assert.deepEqual(config.linterConfig.linterType, expLinter);
        });

        test('Should not prompt when option is valid ', async () => {
            generatorStub.options[optionName] = expLinter;
            const config = await projectInputUtils.getDesiredProjectConfig(generatorStub, inputs);
            assert.isFalse(generatorPromptStub.called);
            assert.deepEqual(config.linterConfig.linterType, expLinter);
        });
    });

    suite('module Tests:', () => {
        const input = moduleInput;
        const inputs = [ input ];
        const optionName = input.optionName;
        const prompt = input.prompt;
        const promptName = prompt.name;
        const expModule = 'github.com/swellaby/go-sample';

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
});
