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

    it('Should create correct VS Code cSpell.json file', () => {
        const expCspellJsonContents = vsCodeCommonFixtures.cSpellContents;
        const cSpellContents = vsCodeCommonScaffold.getB3VSCodeCSpellFileContents();
        assert.deepEqual(cSpellContents, expCspellJsonContents);
    });

    it('Should create correct VS Code extensions.json file', () => {
        const expExtensionsJsonContents = vsCodeCommonFixtures.extensionsContents;
        const extensionsContents = vsCodeCommonScaffold.getB3VSCodeExtensionsFileContents();
        assert.deepEqual(extensionsContents, expExtensionsJsonContents);
    });

    it('Should create correct VS Code launch.json file', () => {
        const expLaunchJsonContents = vsCodeCommonFixtures.launchContents;
        const launchContents = vsCodeCommonScaffold.getB3VSCodeLaunchFileContents();
        assert.deepEqual(launchContents, expLaunchJsonContents);
    });
});
