'use strict';

import chai = require('chai');
import shell = require('shelljs');

import commandUtils = require('./utils/command-utils');
import fixtureUtils = require('./utils/fixture-utils');
import inputUtils = require('./utils/input-utils');
import scaffoldUtils = require('./utils/scaffold-utils');

const assert = chai.assert;

describe('boilerplate files Tests:', () => {
    let execResponse: shell.ExecOutputReturnValue;
    let options: string;

    before(() => {
        options = commandUtils.buildInputOptions(inputUtils.boilerplateInputs.b3);
        execResponse = <shell.ExecOutputReturnValue>commandUtils.runGenerator(options);
    });

    it('Should have a successful response code', () => {
        assert.deepEqual(execResponse.code, commandUtils.successfulReturnCode);
    });

    it('Should create correct main.go', () => {
        const actContents = scaffoldUtils.boilerplate.b3.getMainGoContents();
        const expContents = fixtureUtils.boilerplate.b3.getMainGoFileContents();
        assert.deepEqual(actContents, expContents);
    });
});
