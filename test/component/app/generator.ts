'use strict';

import Chai = require('chai');
import fs = require('fs');
import mkdirp = require('mkdirp');
import path = require('path');
import Sinon = require('sinon');
import YeomanGenerator = require('yeoman-generator');

import GetGoingGenerator = require('../../../generators/app/index');
import descriptionInput = require('../../../generators/app/inputs/description-input');
import linterInput = require('../../../generators/app/inputs/linter-input');
import moduleInput = require('../../../generators/app/inputs/module-input');
import nameInput = require('../../../generators/app/inputs/name-input');
import ownerInput = require('../../../generators/app/inputs/owner-input');
import taskRunnerInput = require('../../../generators/app/inputs/task-runner-input');
import typeInput = require('../../../generators/app/inputs/type-input');
import vscodeInput = require('../../../generators/app/inputs/vscode-input');

import testUtils = require('../../test-utils');
import yoUtils = require('../../yo-utils');

const assert = Chai.assert;

suite('generator Tests:', () => {
    let getGoingGenerator: GetGoingGenerator;
    let generatorOptionStub: Sinon.SinonStub;
    let generatorLogStub: Sinon.SinonStub;
    const options = yoUtils.generatorOptions;

    setup(() => {
        yoUtils.stubInternalGeneratorFunctions();
        generatorOptionStub = Sinon.stub(YeomanGenerator.prototype, 'option');
        getGoingGenerator = new GetGoingGenerator([], options);
        generatorLogStub = Sinon.stub(getGoingGenerator, 'log');
    });

    teardown(() => {
        Sinon.restore();
        getGoingGenerator = null;
    });

    suite('options Tests:', () => {
        test('Should add description option to generator', () => {
            const input = descriptionInput;
            assert.isTrue(generatorOptionStub.calledWithExactly(input.optionName, input.option));
        });

        test('Should add linter option to generator', () => {
            const input = linterInput;
            assert.isTrue(generatorOptionStub.calledWithExactly(input.optionName, input.option));
        });

        test('Should add module option to generator', () => {
            const input = moduleInput;
            assert.isTrue(generatorOptionStub.calledWithExactly(input.optionName, input.option));
        });

        test('Should add name option to generator', () => {
            const input = nameInput;
            assert.isTrue(generatorOptionStub.calledWithExactly(input.optionName, input.option));
        });

        test('Should add owner option to generator', () => {
            const input = ownerInput;
            assert.isTrue(generatorOptionStub.calledWithExactly(input.optionName, input.option));
        });

        test('Should add task runner option to generator', () => {
            const input = taskRunnerInput;
            assert.isTrue(generatorOptionStub.calledWithExactly(input.optionName, input.option));
        });

        test('Should add type option to generator', () => {
            const input = typeInput;
            assert.isTrue(generatorOptionStub.calledWithExactly(input.optionName, input.option));
        });

        test('Should add vs code option to generator', () => {
            const input = vscodeInput;
            assert.isTrue(generatorOptionStub.calledWithExactly(input.optionName, input.option));
        });
    });

    suite('createProject Tests:', () => {
        const answers = testUtils.defaultPromptAnswersCopy();
        const appName = 'app';
        const genFs = testUtils.generatorFs;
        const fsStatsStub = testUtils.fsStatStub;
        const resolvedGitPath = 'usr/foo/app-name/.git';
        let copyTplStub: Sinon.SinonStub;
        let promptStub: Sinon.SinonStub;

        setup(() => {
            promptStub = Sinon.stub(getGoingGenerator, 'prompt').callsFake(() => Promise.resolve(answers));
            Sinon.stub(getGoingGenerator, 'destinationPath').callsFake(() => appName);
            Sinon.stub(getGoingGenerator, 'destinationRoot').callsFake(() => '');
            Sinon.stub(getGoingGenerator, 'spawnCommandSync').callsFake(() => null);
            getGoingGenerator.fs = genFs;
            copyTplStub = Sinon.stub(genFs, 'copyTpl');
            Sinon.stub(mkdirp, 'sync');
            Sinon.stub(path, 'basename').callsFake(() => appName);
            Sinon.stub(path, 'resolve').onFirstCall().callsFake(() => resolvedGitPath);
            Sinon.stub(fs, 'statSync').callsFake(() => fsStatsStub);
            Sinon.stub(fs, 'unlinkSync');
            Sinon.stub(fsStatsStub, 'isFile').callsFake(() => false);
        });

        test('Should run generator creation functions', async () => {
            await getGoingGenerator.createProject();
            assert.isTrue(promptStub.called);
            assert.deepEqual(copyTplStub.callCount, 4);
        });

        test('Should log correct error message on internal error with no details', async () => {
            copyTplStub.throws(new Error());
            await getGoingGenerator.createProject();
            assert.isTrue(generatorLogStub.calledWithExactly(testUtils.expectedErrorMessageBase));
        });

        test('Should log correct error message on internal error with details', async () => {
            const details = 'failed';
            copyTplStub.throws(new Error(details));
            await getGoingGenerator.createProject();
            assert.isTrue(generatorLogStub.calledWithExactly(testUtils.getExpectedErrorMessage(details)));
        });
    });
});
