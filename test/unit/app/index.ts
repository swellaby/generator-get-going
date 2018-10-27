'use strict';

// tslint:disable:no-var-requires
import Chai = require('chai');
const fileEditor = require('mem-fs-editor');
import path = require('path');
import Sinon = require('sinon');
const yeomanEnvironment = require('yeoman-environment');
const yeomanGenerator = require('yeoman-generator');

import Index = require('../../../generators/app/index');
import LetsGoGenerator = require('../../../generators/app/letsgo-generator');
import projectInputUtils = require('../../../generators/app/project-input-utils');
import projectInputs = require('../../../generators/app/project-inputs');

const assert = Chai.assert;

suite('Index Tests:', () => {
    let index: Index;
    let createProjectStub: Sinon.SinonStub;
    let addGeneratorOptionsStub: Sinon.SinonStub;
    const cwd = '/foo/bar/roo';
    const options = {
        env: {
            adapter: {
                log: () => ''
            },
            runLoop: true,
            sharedFs: true
        },
        cwd: cwd,
        resolved: 'foo'
    };

    /**
     * Helper function for stubbing internal Yo Generator functions in order
     * to take control of execution flow.
     */
    const stubInternalGeneratorFunctions = () => {
        Sinon.stub(Object, 'assign').callsFake(() => {
            return options;
        });
        Sinon.stub(yeomanEnvironment, 'enforceUpdate');
        Sinon.stub(fileEditor, 'create');
        Sinon.stub(yeomanGenerator.prototype, 'option');
        Sinon.stub(yeomanGenerator.prototype, '_getStorage').callsFake(() => null);
        Sinon.stub(yeomanGenerator.prototype, '_getGlobalStorage');
        Sinon.stub(yeomanGenerator.prototype, 'determineAppname');
        Sinon.stub(yeomanGenerator.prototype, 'sourceRoot');
    };

    setup(() => {
        stubInternalGeneratorFunctions();
        Sinon.stub(path, 'join');
        Sinon.stub(path, 'dirname');
        const dirRoot = { root: undefined };
        Sinon.stub(path, 'parse').callsFake(() => dirRoot);
        createProjectStub = Sinon.stub(LetsGoGenerator.prototype, 'createProject');
        addGeneratorOptionsStub = Sinon.stub(projectInputUtils, 'addGeneratorOptions');
    });

    teardown(() => {
        Sinon.restore();
    });

    test('Should invoke the addGeneratorOptions and createProject method defined by the LetsGoGenerator', async () => {
        index = new Index([], options);
        assert.isTrue(addGeneratorOptionsStub.calledWithExactly(index, projectInputs));
        await index.execute();
        assert.isTrue(createProjectStub.called);
    });
});