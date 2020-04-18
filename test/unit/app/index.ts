'use strict';

import Chai = require('chai');
import Sinon = require('sinon');
import YeomanGenerator = require('yeoman-generator');

import GetGoingGenerator = require('../../../generators/app');
import projectInputUtils = require('../../../generators/app/project-input-utils');
import projectInputs = require('../../../generators/app/project-inputs');
import projectScaffolders = require('../../../generators/app/project-scaffolders');
import scaffoldEngine = require('../../../generators/app/scaffold-engine');
import testUtils = require('../../test-utils');
import yoUtils = require('../../yo-utils');

const assert = Chai.assert;

suite('GetGoingGenerator Tests:', () => {
    let generatorLogStub: Sinon.SinonStub;
    let getGoingGenerator: GetGoingGenerator;
    let getDesiredProjectConfigStub: Sinon.SinonStub;
    let addGeneratorOptionsStub: Sinon.SinonStub;
    let scaffoldNewProjectStub: Sinon.SinonStub;
    const config = testUtils.projectConfig;
    const options = yoUtils.generatorOptions;

    setup(function() {
        this.timeout(500);
        yoUtils.stubInternalGeneratorFunctions();
        Sinon.stub(YeomanGenerator.prototype, 'sourceRoot');
        Sinon.stub(YeomanGenerator.prototype, 'destinationRoot');
        getDesiredProjectConfigStub = Sinon.stub(projectInputUtils, 'getDesiredProjectConfig').callsFake(() => Promise.resolve(config));
        addGeneratorOptionsStub = Sinon.stub(projectInputUtils, 'addGeneratorOptions');
        scaffoldNewProjectStub = Sinon.stub(scaffoldEngine, 'scaffoldNewProject');
        getGoingGenerator = new GetGoingGenerator([], options);
        generatorLogStub = Sinon.stub(getGoingGenerator, 'log');
    });

    teardown(() => {
        Sinon.restore();
        getGoingGenerator = null;
    });

    test('Should call options setup function on constructor', () => {
        assert.isTrue(addGeneratorOptionsStub.calledWithExactly(getGoingGenerator, projectInputs));
    });

    test('Should display correct greet message', async () => {
        await getGoingGenerator.createProject();
        assert.isTrue(generatorLogStub.firstCall.calledWithExactly(testUtils.expectedGreetingMessage));
    });

    test('Should display correct error message when error details are missing', async () => {
        getDesiredProjectConfigStub.callsFake(() => Promise.reject());
        await getGoingGenerator.createProject();
        assert.isTrue(generatorLogStub.secondCall.calledWithExactly(testUtils.expectedErrorMessageBase));
    });

    test('Should display correct error message when error details are provided', async () => {
        const errDetails = 'crashed';
        getDesiredProjectConfigStub.callsFake(() => Promise.reject(new Error(errDetails)));
        await getGoingGenerator.createProject();
        assert.isTrue(generatorLogStub.secondCall.calledWithExactly(testUtils.getExpectedErrorMessage(errDetails)));
    });

    test('Should run correct scaffolding function sequence when config returns', async () => {
        await getGoingGenerator.createProject();
        assert.isTrue(scaffoldNewProjectStub.calledWithExactly(projectScaffolders, getGoingGenerator, config));
    });
});
