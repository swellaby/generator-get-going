'use strict';

import chai = require('chai');
import Sinon = require('sinon');

import vscodeScaffolder = require('../../../../generators/app/scaffolders/vscode-scaffolder');
import IProjectConfig = require('../../../../generators/app/interfaces/project-config');
import scaffoldEngine = require('../../../../generators/app/scaffold-engine');
import testUtils = require('../../../test-utils');

const assert = chai.assert;

suite('VS Code scaffolder Tests:', () => {
    const generator = testUtils.generatorStub;
    const scaffolders = [ vscodeScaffolder ];
    let config: IProjectConfig;
    const appName = 'app';
    let fsCopyTplStub: Sinon.SinonStub;

    setup(() => {
        config = <IProjectConfig>{};
        Sinon.stub(generator, 'destinationPath').callsFake(() => appName);
        Sinon.stub(generator, 'destinationRoot').callsFake(() => '');
        fsCopyTplStub = Sinon.stub(generator.fs, 'copyTpl');
        Sinon.stub(generator.fs, 'move');
        Sinon.stub(generator, 'log');
    });

    teardown(() => {
        Sinon.restore();
        config = null;
    });

    test('Should scaffold vscode content when configured', () => {
        config.includeVSCode = true;
        scaffoldEngine.scaffoldNewProject(scaffolders, generator, config);
        assert.isTrue(fsCopyTplStub.called);
    });

    test('Should not scaffold vscode content when configured', () => {
        config.includeVSCode = false;
        scaffoldEngine.scaffoldNewProject(scaffolders, generator, config);
        assert.isFalse(fsCopyTplStub.called);
    });
});
