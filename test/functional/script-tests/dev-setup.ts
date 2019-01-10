'use strict';

import chai = require('chai');
import shell = require('shelljs');

import commandUtils = require('../utils/command-utils');
import fixtureUtils = require('../utils/fixture-utils');
import inputUtils = require('../utils/input-utils');
import scaffoldUtils = require('../utils/scaffold-utils');

const assert = chai.assert;

describe('script files Tests:', () => {
    let execResponse: shell.ExecOutputReturnValue;
    let options: string;

    before(() => {
        options = commandUtils.buildInputOptions(inputUtils.boilerplateInputs.b3);
        execResponse = <shell.ExecOutputReturnValue>commandUtils.runGenerator(options);
    });

    it('Should have a successful response code', () => {
        assert.deepEqual(execResponse.code, commandUtils.successfulReturnCode);
    });

    context('When Task Runner is go-task', () => {
        it('Should create correct dev_setup.go', () => {
            const actContents = scaffoldUtils.scripts.devSetup.b3.getB3GoTaskDevSetupGoFileContents();
            const expContents = fixtureUtils.scriptsFixtures.devSetup.getGoTaskDevSetupFileContents();
            assert.deepEqual(actContents, expContents);
        });
    });
});
