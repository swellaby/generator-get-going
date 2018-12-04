'use strict';

// tslint:disable:no-var-requires
import Chai = require('chai');
const fileEditor = require('mem-fs-editor');
import path = require('path');
import Sinon = require('sinon');
const yeomanEnvironment = require('yeoman-environment');
const yeomanGenerator = require('yeoman-generator');

import LetsGoGenerator = require('../../../generators/app');
import projectInputUtils = require('../../../generators/app/project-input-utils');
import projectInputs = require('../../../generators/app/project-inputs');
import projectScaffolders = require('../../../generators/app/project-scaffolders');
import scaffoldEngine = require('../../../generators/app/scaffold-engine');
import testUtils = require('../../test-utils');

const assert = Chai.assert;

suite('LetsGoGenerator Tests:', () => {
    let generatorLogStub: Sinon.SinonStub;
    let letsGoGenerator: LetsGoGenerator;
    let getDesiredProjectConfigStub: Sinon.SinonStub;
    let addGeneratorOptionsStub: Sinon.SinonStub;
    let scaffoldNewProjectStub: Sinon.SinonStub;
    const config = testUtils.projectConfig;
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
        Sinon.stub(yeomanGenerator.prototype, 'option');
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
        getDesiredProjectConfigStub = Sinon.stub(projectInputUtils, 'getDesiredProjectConfig').callsFake(() => Promise.resolve(config));
        addGeneratorOptionsStub = Sinon.stub(projectInputUtils, 'addGeneratorOptions');
        scaffoldNewProjectStub = Sinon.stub(scaffoldEngine, 'scaffoldNewProject');
        letsGoGenerator = new LetsGoGenerator([], options);
        generatorLogStub = Sinon.stub(letsGoGenerator, 'log');
    });

    teardown(() => {
        Sinon.restore();
        letsGoGenerator = null;
    });

    test('Should call options setup function on constructor', () => {
        assert.isTrue(addGeneratorOptionsStub.calledWithExactly(letsGoGenerator, projectInputs));
    });

    test('Should display correct greet message', async () => {
        await letsGoGenerator.createProject();
        assert.isTrue(generatorLogStub.firstCall.calledWithExactly(testUtils.expectedGreetingMessage));
    });

    test('Should display correct error message when error details are missing', async () => {
        getDesiredProjectConfigStub.callsFake(() => Promise.reject());
        await letsGoGenerator.createProject();
        assert.isTrue(generatorLogStub.secondCall.calledWithExactly(testUtils.expectedErrorMessageBase));
    });

    test('Should display correct error message when error details are provided', async () => {
        const errDetails = 'crashed';
        getDesiredProjectConfigStub.callsFake(() => Promise.reject(new Error(errDetails)));
        await letsGoGenerator.createProject();
        assert.isTrue(generatorLogStub.secondCall.calledWithExactly(testUtils.getExpectedErrorMessage(errDetails)));
    });

    test('Should run correct scaffolding function sequence when config returns', async () => {
        await letsGoGenerator.createProject();
        assert.isTrue(scaffoldNewProjectStub.calledWithExactly(projectScaffolders, letsGoGenerator, config));
    });
});
