'use strict';

// tslint:disable:no-var-requires
const fileEditor = require('mem-fs-editor');
import path = require('path');
import Sinon = require('sinon');
// const yeomanEnvironment = require('yeoman-environment');
const yeomanGenerator = require('yeoman-generator');

const generatorWorkingDirectory = '/foo/bar/roo';
const generatorOptions = {
    env: {
        adapter: {
            log: () => ''
        },
        runLoop: true,
        sharedFs: true,
    },
    cwd: generatorWorkingDirectory,
    resolved: 'foo'
};

/**
 * Helper function for stubbing internal Yo Generator functions in order
 * to take control of execution flow.
 */
const stubInternalGeneratorFunctions = () => {
    Sinon.stub(Object, 'assign').callsFake(() => {
        return generatorOptions;
    });
    // Sinon.stub(yeomanEnvironment, 'enforceUpdate');
    Sinon.stub(fileEditor, 'create');
    Sinon.stub(yeomanGenerator.prototype, '_getStorage');
    Sinon.stub(yeomanGenerator.prototype, '_getGlobalStorage');
    Sinon.stub(yeomanGenerator.prototype, 'determineAppname');
    Sinon.stub(yeomanGenerator.prototype, 'sourceRoot');
    Sinon.stub(path, 'join');
    Sinon.stub(path, 'dirname');
    const dirRoot = <path.ParsedPath>{ root: undefined };
    Sinon.stub(path, 'parse').callsFake(() => dirRoot);
};

export = {
    stubInternalGeneratorFunctions,
    generatorOptions,
    generatorWorkingDirectory
};
