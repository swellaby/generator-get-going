'use strict';

import chai = require('chai');
import { readdir } from 'fs/promises';
import helpers = require('yeoman-test');
import path = require('path');
import Sinon = require('sinon');

import intTestUtils = require('../int-test-utils');
import testUtils = require('../../test-utils');

const assert = chai.assert;

suite('directory Tests:', () => {
    const baseAppName = 'baseOptionApp';
    let prompts;
    const baseAppNameDir = intTestUtils.getCwdAppNameSubDirectoryPath(baseAppName);

    setup(() => {
        intTestUtils.createGitInitStub();
        prompts = testUtils.defaultPromptAnswersCopy();
        prompts.name = baseAppName;
     });

    teardown(() => {
        Sinon.restore();
    });

    test('Should scaffold into a new directory if the specified app name differs from the current directory', async () => {
        const runResult = await helpers.create(intTestUtils.generatorRoot).withPrompts(prompts).run();
        const files = await readdir(runResult.cwd, { withFileTypes: true });
        assert.deepEqual(files.length, 1);
        assert.deepEqual(files[0].name, baseAppName);
        assert.isTrue(files[0].isDirectory());
    });

    test('Should scaffold into the current directory when the specified app name matches the current directory name', async () => {
        intTestUtils.createYoDestinationPathStub().callsFake(() => baseAppNameDir);
        const runResult = await helpers.create(intTestUtils.generatorRoot).withPrompts(prompts).run();
        const files = await readdir(runResult.cwd, { withFileTypes: true });
        assert.isTrue(files.length > 1);
        assert.isFalse(files.some(f => f.name === baseAppNameDir && f.isDirectory()));
    });
});
