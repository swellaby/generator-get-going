'use strict';

import Chai = require('chai');
import Sinon = require('sinon');
import YeomanGenerator = require('yeoman-generator');

import LetsGoGenerator = require('../../../generators/app/letsgo-generator');
import projectConfigUtils = require('../../../generators/app/inputs/project-config-utils');
import testUtils = require('../../test-utils');

const assert = Chai.assert;

suite('LetsGoGenerator Tests:', () => {
    let generatorStub: YeomanGenerator;
    let generatorLogStub: Sinon.SinonStub;
    let letsGoGenerator: LetsGoGenerator;
    let getDesiredProjectConfigStub: Sinon.SinonStub;

    setup(() => {
        generatorStub = testUtils.generatorStub;
        getDesiredProjectConfigStub = Sinon.stub(projectConfigUtils, 'getDesiredProjectConfig').callsFake(() => Promise.resolve());
        generatorLogStub = Sinon.stub(generatorStub, 'log');
        letsGoGenerator = new LetsGoGenerator(generatorStub);
    });

    teardown(() => {
        Sinon.restore();
        generatorStub = null;
        letsGoGenerator = null;
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
});