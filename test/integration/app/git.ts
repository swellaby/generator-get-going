'use strict';

import chai = require('chai');
import fs = require('fs');
import helpers = require('yeoman-test');
import path = require('path');
import Sinon = require('sinon');

import intTestUtils = require('../int-test-utils');
import testUtils = require('../../test-utils');

const assert = chai.assert;

suite('git Tests:', () => {
    let gitInitCommandStub: Sinon.SinonStub;
    let yoDestinationPathStub: Sinon.SinonStub;
    const baseAppName = 'baseOptionApp';
    const prompts = testUtils.defaultPromptAnswersCopy();
    prompts.name = baseAppName;

    setup(() => {
        gitInitCommandStub = intTestUtils.createGitInitStub();
        yoDestinationPathStub = intTestUtils.createYoDestinationPathStub().callsFake(() => baseAppName);
     });

    teardown(() => {
        Sinon.restore();
    });

    test('Should init a new git repository when the destination directory does not have a .git directory', async () => {
        await helpers.create(intTestUtils.generatorRoot).withPrompts(prompts).run();
        assert.isTrue(gitInitCommandStub.called);
    });

    test('Should init a new git repository when the destination directory has a file named \'.git\'', async () => {
        // this stub is to ensure that the tmp directory (see below) creates the .git directory in
        // the same directory as the destinationRoot of the generator.
        yoDestinationPathStub.callsFake(() => intTestUtils.getCwdAppNameSubDirectoryPath(baseAppName));
        await helpers.create(intTestUtils.generatorRoot).inTmpDir((dir) => {
            fs.writeFileSync(path.join(dir, '.git'), '');
        }).withPrompts(prompts).run();
        assert.isTrue(gitInitCommandStub.called);
    });

    test('Should not init a new git repository when the destination directory already has a git repo initialized', async () => {
        // this stub is to ensure that the tmp directory (see below) creates the .git directory in
        // the same directory as the destinationRoot of the generator.
        yoDestinationPathStub.callsFake(() => intTestUtils.getCwdAppNameSubDirectoryPath(baseAppName));
        await helpers.create(intTestUtils.generatorRoot).inTmpDir((dir) => {
            fs.mkdirSync(path.join(path.resolve(dir), '.git'));
        }).withPrompts(prompts).run();
        assert.isFalse(gitInitCommandStub.called);
    });

    test('Should log an error message when init errors', async () => {
        gitInitCommandStub.throws(new Error());
        await helpers.create(intTestUtils.generatorRoot).withPrompts(prompts).run();
        assert.isTrue(gitInitCommandStub.called);
    });
});
