'use strict';

// tslint:disable:no-var-requires
import Chai = require('chai');
const fileEditor = require('mem-fs-editor');
import path = require('path');
import Sinon = require('sinon');
const yeomanEnvironment = require('yeoman-environment');
const yeomanGenerator = require('yeoman-generator');

import LetsGoGenerator = require('../../../generators/app/index');
import projectInputUtils = require('../../../generators/app/project-input-utils');
import projectInputs = require('../../../generators/app/project-inputs');
import projectScaffolders = require('../../../generators/app/project-scaffolders');
import scaffoldEngine = require('../../../generators/app/scaffold-engine');

import descriptionInput = require('../../../generators/app/inputs/description-input');
import linterInput = require('../../../generators/app/inputs/linter-input');
import moduleInput = require('../../../generators/app/inputs/module-input');
import nameInput = require('../../../generators/app/inputs/name-input');
import ownerInput = require('../../../generators/app/inputs/owner-input');
import taskRunnerInput = require('../../../generators/app/inputs/task-runner-input');
import typeInput = require('../../../generators/app/inputs/type-input');
import vscodeInput = require('../../../generators/app/inputs/vscode-input');

import testUtils = require('../../test-utils');

const assert = Chai.assert;

suite('LetsGoGenerator Tests:', () => {
    let letsGoGenerator: LetsGoGenerator;
    let generatorOptionStub: Sinon.SinonStub;
    // const config = testUtils.projectConfig;
    const cwd = '/foo/bar/roo';
    const options = {
        env: {
            adapter: {
                log: () => ''
            },
            runLoop: true,
            sharedFs: true
        },
        cwd: cwd,
        resolved: 'foo'
    };

    /**
     * Helper function for stubbing internal Yo Generator functions in order
     * to take control of execution flow.
     */
    const stubInternalGeneratorFunctions = () => {
        Sinon.stub(Object, 'assign').callsFake(() => {
            return options;
        });
        Sinon.stub(yeomanEnvironment, 'enforceUpdate');
        Sinon.stub(fileEditor, 'create');
        generatorOptionStub = Sinon.stub(yeomanGenerator.prototype, 'option');
        Sinon.stub(yeomanGenerator.prototype, '_getStorage');
        Sinon.stub(yeomanGenerator.prototype, '_getGlobalStorage');
        Sinon.stub(yeomanGenerator.prototype, 'determineAppname');
        Sinon.stub(yeomanGenerator.prototype, 'sourceRoot');
    };

    setup(() => {
        stubInternalGeneratorFunctions();
        Sinon.stub(path, 'join');
        Sinon.stub(path, 'dirname');
        const dirRoot = <path.ParsedPath>{ root: undefined };
        Sinon.stub(path, 'parse').callsFake(() => dirRoot);
        letsGoGenerator = new LetsGoGenerator([], options);
        Sinon.stub(letsGoGenerator, 'log');
    });

    teardown(() => {
        Sinon.restore();
        letsGoGenerator = null;
    });

    suite('options', () => {
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
});
