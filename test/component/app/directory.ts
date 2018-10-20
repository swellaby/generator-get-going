'use strict';

import chai = require('chai');
import helpers = require('yeoman-test');
import path = require('path');
import Sinon = require('sinon');
import yeomanAssert = require('yeoman-assert');

import compTestUtils = require('../comp-test-utils');
import ProjectType = require('../../../generators/app/enums/project-type');

const assert = chai.assert;

suite('directory Tests:', () => {
    const baseAppName = 'baseOptionApp';
    const appType = ProjectType.lib;
    const appDescription = 'this is a test description';
    const author = 'hemingway';
    let prompts;
    const baseAppNameDir = compTestUtils.getCwdAppNameSubDirectoryPath(baseAppName);

    setup(() => {
        compTestUtils.createGitInitStub();
        prompts = {
            name: baseAppName,
            description: appDescription,
            projectType: appType,
            vscode: true,
            author: author
        };
     });

    teardown(() => {
        Sinon.restore();
    });

    test('Should scaffold into a new directory if the specified app name differs from the current directory', async () => {
        const dir = await helpers.run(compTestUtils.generatorRoot).withPrompts(prompts).toPromise();
        const cwd = compTestUtils.getYeomanTmpCwd();
        assert.deepEqual(path.basename(cwd), baseAppName);
        assert.deepEqual(path.resolve(cwd), path.join(dir, baseAppName));
    });

    test('Should scaffold into the current directory when the specified app name matches the current directory name', async () => {
        compTestUtils.createYoDestinationPathStub().callsFake(() => baseAppNameDir);
        const dir = await helpers.run(compTestUtils.generatorRoot).withPrompts(prompts).toPromise();
        const cwd = compTestUtils.getYeomanTmpCwd();
        assert.deepEqual(path.basename(cwd), path.basename(dir));
        assert.deepEqual(path.resolve(cwd), path.resolve(dir));
        yeomanAssert.noFile(path.join(process.cwd(), baseAppName));
    });
});
