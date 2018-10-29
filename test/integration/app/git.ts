'use strict';

import chai = require('chai');
import fs = require('fs');
import helpers = require('yeoman-test');
import path = require('path');
import Sinon = require('sinon');

import intTestUtils = require('../int-test-utils');

const assert = chai.assert;

suite('git Tests:', () => {
    let gitInitCommandStub: Sinon.SinonStub;
    let yoDestinationPathStub: Sinon.SinonStub;
    const baseAppName = 'baseOptionApp';
    const prompts = intTestUtils.defaultPromptAnswersCopy;
    prompts.name = baseAppName;

    setup(() => {
        gitInitCommandStub = intTestUtils.createGitInitStub();
        yoDestinationPathStub = intTestUtils.createYoDestinationPathStub().callsFake(() => baseAppName);
     });

    teardown(() => {
        Sinon.restore();
    });

    test('Should init a new git repository when the destination directory does not have a .git directory', async () => {
        await helpers.run(intTestUtils.generatorRoot).withPrompts(prompts).toPromise();
        assert.isTrue(gitInitCommandStub.called);
    });

    test('Should init a new git repository when the destination directory has a file named \'.git\'', async () => {
        // this stub is to ensure that the tmp directory (see below) creates the .git directory in
        // the same directory as the destinationRoot of the generator.
        yoDestinationPathStub.callsFake(() => intTestUtils.getCwdAppNameSubDirectoryPath(baseAppName));
        await helpers.run(intTestUtils.generatorRoot).inTmpDir((dir) => {
            fs.writeFileSync(path.join(dir, '.git'), null);
        }).withPrompts(prompts).toPromise();
        assert.isTrue(gitInitCommandStub.called);
    });

    test('Should not init a new git repository when the destination directory already has a git repo initialized', async () => {
        // this stub is to ensure that the tmp directory (see below) creates the .git directory in
        // the same directory as the destinationRoot of the generator.
        yoDestinationPathStub.callsFake(() => intTestUtils.getCwdAppNameSubDirectoryPath(baseAppName));
        await helpers.run(intTestUtils.generatorRoot).inTmpDir((dir) => {
            fs.mkdirSync(path.join(path.resolve(dir), '.git'));
        }).withPrompts(prompts).toPromise();
        assert.isFalse(gitInitCommandStub.called);
    });
});
