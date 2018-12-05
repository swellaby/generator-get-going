'use strict';

import Chai = require('chai');
import Sinon = require('sinon');

import LetsGoGenerator = require('../../../generators/app');
import projectInputUtils = require('../../../generators/app/project-input-utils');
import projectInputs = require('../../../generators/app/project-inputs');
import projectScaffolders = require('../../../generators/app/project-scaffolders');
import scaffoldEngine = require('../../../generators/app/scaffold-engine');
import testUtils = require('../../test-utils');
import yoUtils = require('../../yo-utils');

const assert = Chai.assert;

suite('LetsGoGenerator Tests:', () => {
    let generatorLogStub: Sinon.SinonStub;
    let letsGoGenerator: LetsGoGenerator;
    let getDesiredProjectConfigStub: Sinon.SinonStub;
    let addGeneratorOptionsStub: Sinon.SinonStub;
    let scaffoldNewProjectStub: Sinon.SinonStub;
    const config = testUtils.projectConfig;
    const options = yoUtils.generatorOptions;

    setup(() => {
        yoUtils.stubInternalGeneratorFunctions();
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
