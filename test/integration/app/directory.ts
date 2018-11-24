'use strict';

import chai = require('chai');
import helpers = require('yeoman-test');
import path = require('path');
import Sinon = require('sinon');
import yeomanAssert = require('yeoman-assert');

import intTestUtils = require('../int-test-utils');

const assert = chai.assert;

suite('directory Tests:', () => {
    const baseAppName = 'baseOptionApp';
    let prompts;
    const baseAppNameDir = intTestUtils.getCwdAppNameSubDirectoryPath(baseAppName);

    setup(() => {
        intTestUtils.createGitInitStub();
        prompts = intTestUtils.defaultPromptAnswersCopy();
        prompts.name = baseAppName;
     });

    teardown(() => {
        Sinon.restore();
    });

    test('Should scaffold into a new directory if the specified app name differs from the current directory', async () => {
        const dir = await helpers.run(intTestUtils.generatorRoot).withPrompts(prompts).toPromise();
        const cwd = intTestUtils.getYeomanTmpCwd();
        assert.deepEqual(path.basename(cwd), baseAppName);
        assert.deepEqual(path.resolve(cwd), path.join(dir, baseAppName));
    });

    test('Should scaffold into the current directory when the specified app name matches the current directory name', async () => {
        intTestUtils.createYoDestinationPathStub().callsFake(() => baseAppNameDir);
        const dir = await helpers.run(intTestUtils.generatorRoot).withPrompts(prompts).toPromise();
        const cwd = intTestUtils.getYeomanTmpCwd();
        assert.deepEqual(path.basename(cwd), path.basename(dir));
        assert.deepEqual(path.resolve(cwd), path.resolve(dir));
        yeomanAssert.noFile(path.join(process.cwd(), baseAppName));
    });
});
