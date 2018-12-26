'use strict';

import chai = require('chai');
import shell = require('shelljs');

import commandUtils = require('./utils/command-utils');
import fixtureUtils = require('./utils/fixture-utils');
import inputUtils = require('./utils/input-utils');
import scaffoldUtils = require('./utils/scaffold-utils');

const assert = chai.assert;

describe('vscode Tests:', () => {
    let execResponse: shell.ExecOutputReturnValue;
    let options: string;
    const vsCodeFixtures = fixtureUtils.vsCodeFixtures;
    const vsCodeCommonFixtures = vsCodeFixtures.common;
    const vsCodeScaffold = scaffoldUtils.vsCode;
    const vsCodeCommonScaffold = vsCodeScaffold.common;

    before(() => {
        options = commandUtils.buildInputOptions(inputUtils.boilerplateInputs.b3);
        execResponse = <shell.ExecOutputReturnValue>commandUtils.runGenerator(options);
    });

    it('Should have a successful response code', () => {
        assert.deepEqual(execResponse.code, commandUtils.successfulReturnCode);
    });

    it('Should create VS Code files', () => {
        const expCspellJsonContents = vsCodeCommonFixtures.cSpellContents;
        const expExtensionsJsonContents = vsCodeCommonFixtures.extensionsContents;
        const expLaunchJsonContents = vsCodeCommonFixtures.launchContents;
        const cSpellContents = vsCodeCommonScaffold.getB3VSCodeCSpellFileContents();
        const extensionsContents = vsCodeCommonScaffold.getB3VSCodeExtensionsFileContents();
        const launchContents = vsCodeCommonScaffold.getB3VSCodeLaunchFileContents();
        assert.deepEqual(cSpellContents, expCspellJsonContents);
        assert.deepEqual(extensionsContents, expExtensionsJsonContents);
        assert.deepEqual(launchContents, expLaunchJsonContents);
    });
});
