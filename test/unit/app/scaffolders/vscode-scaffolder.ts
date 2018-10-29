'use strict';

import Chai = require('chai');
import Sinon = require('sinon');
import YeomanGenerator = require('yeoman-generator');

import IProjectConfig = require('../../../../generators/app/interfaces/project-config');
import testUtils = require('../../../test-utils');
import utils = require('../../../../generators/app/utils');
import vsCodeScaffolder = require('../../../../generators/app/scaffolders/vscode-scaffolder');

const assert = Chai.assert;

suite('vsCodeScaffolder Tests:', () => {
    let generatorFsCopyTplStub: Sinon.SinonStub;
    const generatorStub: YeomanGenerator = testUtils.generatorStub;
    let config: IProjectConfig;
    const destinationRoot = '/usr/foo/bar';

    setup(() => {
        generatorFsCopyTplStub = Sinon.stub(generatorStub.fs, 'copyTpl');
        Sinon.stub(generatorStub, 'destinationRoot').callsFake(() => destinationRoot);
        config = JSON.parse(JSON.stringify(testUtils.projectConfig));
    });

    teardown(() => {
        config = null;
        Sinon.restore();
    });

    test('Should not scaffold when includeVSCode is false', () => {
        config.includeVSCode = false;
        vsCodeScaffolder.scaffold(generatorStub, config);
        assert.isFalse(generatorFsCopyTplStub.called);
    });

    test('Should correctly scaffold VS Code content when includeVSCode is true', () => {
        config.includeVSCode = true;
        const expFromPath = `${utils.conditionalTemplatesRootPath}/vscode/${testUtils.wildcardGlobSuffix}`;
        const expToPath = `${destinationRoot}/.vscode`;
        vsCodeScaffolder.scaffold(generatorStub, config);
        assert.isTrue(generatorFsCopyTplStub.calledOnceWithExactly(expFromPath, expToPath, config));
    });
});