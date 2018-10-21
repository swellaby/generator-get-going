'use strict';

import Chai = require('chai');
import Sinon = require('sinon');
import YeomanGenerator = require('yeoman-generator');

import scaffoldEngine = require('../../../generators/app/scaffold-engine');
import testUtils = require('../../test-utils');

const assert = Chai.assert;

suite('scaffoldEngine Tests:', () => {
    const errMessage = 'Something awful happened! Please open an issue on GitHub';
    const generatorStub: YeomanGenerator = testUtils.generatorStub;
    const config = testUtils.projectConfig;
    const emptyConfig = testUtils.emptyProjectConfig;

    suite('null scaffolders Tests:', () => {
        test('Should throw correct error when scaffolders is null, generator is null, and config is null', () => {
            assert.throws(() => scaffoldEngine.scaffoldNewProject(null, null, null), errMessage);
        });

        test('Should throw correct error when scaffolders is null, generator is null, and config is undefined', () => {
            assert.throws(() => scaffoldEngine.scaffoldNewProject(null, null, undefined), errMessage);
        });

        test('Should throw correct error when scaffolders is null, generator is null, and config is empty', () => {
            assert.throws(() => scaffoldEngine.scaffoldNewProject(null, null, emptyConfig), errMessage);
        });

        test('Should throw correct error when scaffolders is null, generator is null, and config is valid', () => {
            assert.throws(() => scaffoldEngine.scaffoldNewProject(null, null, config), errMessage);
        });

        test('Should throw correct error when scaffolders is null, generator is undefined, and config is null', () => {
            assert.throws(() => scaffoldEngine.scaffoldNewProject(null, undefined, null), errMessage);
        });

        test('Should throw correct error when scaffolders is null, generator is undefined, and config is undefined', () => {
            assert.throws(() => scaffoldEngine.scaffoldNewProject(null, undefined, undefined), errMessage);
        });

        test('Should throw correct error when scaffolders is null, generator is undefined, and config is empty', () => {
            assert.throws(() => scaffoldEngine.scaffoldNewProject(null, undefined, emptyConfig), errMessage);
        });

        test('Should throw correct error when scaffolders is null, generator is undefined, and config is valid', () => {
            assert.throws(() => scaffoldEngine.scaffoldNewProject(null, undefined, config), errMessage);
        });

        test('Should throw correct error when scaffolders is null, generator is valid, and config is null', () => {
            assert.throws(() => scaffoldEngine.scaffoldNewProject(null, generatorStub, null), errMessage);
        });

        test('Should throw correct error when scaffolders is null, generator is valid, and config is undefined', () => {
            assert.throws(() => scaffoldEngine.scaffoldNewProject(null, generatorStub, undefined), errMessage);
        });

        test('Should throw correct error when scaffolders is null, generator is valid, and config is empty', () => {
            assert.throws(() => scaffoldEngine.scaffoldNewProject(null, generatorStub, emptyConfig), errMessage);
        });

        test('Should throw correct error when scaffolders is null, generator is valid, and config is valid', () => {
            assert.throws(() => scaffoldEngine.scaffoldNewProject(null, generatorStub, config), errMessage);
        });
    });

    suite('undefined scaffolders Tests:', () => {
        test('Should throw correct error when scaffolders is undefined, generator is null, and config is null', () => {
            assert.throws(() => scaffoldEngine.scaffoldNewProject(undefined, null, null), errMessage);
        });

        test('Should throw correct error when scaffolders is undefined, generator is null, and config is undefined', () => {
            assert.throws(() => scaffoldEngine.scaffoldNewProject(undefined, null, undefined), errMessage);
        });

        test('Should throw correct error when scaffolders is undefined, generator is null, and config is empty', () => {
            assert.throws(() => scaffoldEngine.scaffoldNewProject(undefined, null, emptyConfig), errMessage);
        });

        test('Should throw correct error when scaffolders is undefined, generator is null, and config is valid', () => {
            assert.throws(() => scaffoldEngine.scaffoldNewProject(undefined, null, config), errMessage);
        });

        test('Should throw correct error when scaffolders is undefined, generator is undefined, and config is null', () => {
            assert.throws(() => scaffoldEngine.scaffoldNewProject(undefined, undefined, null), errMessage);
        });

        test('Should throw correct error when scaffolders is undefined, generator is undefined, and config is undefined', () => {
            assert.throws(() => scaffoldEngine.scaffoldNewProject(undefined, undefined, undefined), errMessage);
        });

        test('Should throw correct error when scaffolders is undefined, generator is undefined, and config is empty', () => {
            assert.throws(() => scaffoldEngine.scaffoldNewProject(undefined, undefined, emptyConfig), errMessage);
        });

        test('Should throw correct error when scaffolders is undefined, generator is undefined, and config is valid', () => {
            assert.throws(() => scaffoldEngine.scaffoldNewProject(undefined, undefined, config), errMessage);
        });

        test('Should throw correct error when scaffolders is undefined, generator is valid, and config is null', () => {
            assert.throws(() => scaffoldEngine.scaffoldNewProject(undefined, generatorStub, null), errMessage);
        });

        test('Should throw correct error when scaffolders is undefined, generator is valid, and config is undefined', () => {
            assert.throws(() => scaffoldEngine.scaffoldNewProject(undefined, generatorStub, undefined), errMessage);
        });

        test('Should throw correct error when scaffolders is undefined, generator is valid, and config is empty', () => {
            assert.throws(() => scaffoldEngine.scaffoldNewProject(undefined, generatorStub, emptyConfig), errMessage);
        });

        test('Should throw correct error when scaffolders is undefined, generator is valid, and config is valid', () => {
            assert.throws(() => scaffoldEngine.scaffoldNewProject(undefined, generatorStub, config), errMessage);
        });
    });

    suite('empty scaffolders Tests:', () => {
        test('Should throw correct error when scaffolders is empty, generator is null, and config is null', () => {
            assert.throws(() => scaffoldEngine.scaffoldNewProject([], null, null), errMessage);
        });

        test('Should throw correct error when scaffolders is empty, generator is null, and config is undefined', () => {
            assert.throws(() => scaffoldEngine.scaffoldNewProject([], null, undefined), errMessage);
        });

        test('Should throw correct error when scaffolders is empty, generator is null, and config is empty', () => {
            assert.throws(() => scaffoldEngine.scaffoldNewProject([], null, emptyConfig), errMessage);
        });

        test('Should throw correct error when scaffolders is empty, generator is null, and config is valid', () => {
            assert.throws(() => scaffoldEngine.scaffoldNewProject([], null, config), errMessage);
        });

        test('Should throw correct error when scaffolders is empty, generator is undefined, and config is null', () => {
            assert.throws(() => scaffoldEngine.scaffoldNewProject([], undefined, null), errMessage);
        });

        test('Should throw correct error when scaffolders is empty, generator is undefined, and config is undefined', () => {
            assert.throws(() => scaffoldEngine.scaffoldNewProject([], undefined, undefined), errMessage);
        });

        test('Should throw correct error when scaffolders is empty, generator is undefined, and config is empty', () => {
            assert.throws(() => scaffoldEngine.scaffoldNewProject([], undefined, emptyConfig), errMessage);
        });

        test('Should throw correct error when scaffolders is empty, generator is undefined, and config is valid', () => {
            assert.throws(() => scaffoldEngine.scaffoldNewProject([], undefined, config), errMessage);
        });

        test('Should throw correct error when scaffolders is empty, generator is valid, and config is null', () => {
            assert.throws(() => scaffoldEngine.scaffoldNewProject([], generatorStub, null), errMessage);
        });

        test('Should throw correct error when scaffolders is empty, generator is valid, and config is undefined', () => {
            assert.throws(() => scaffoldEngine.scaffoldNewProject([], generatorStub, undefined), errMessage);
        });

        test('Should throw correct error when scaffolders is empty, generator is valid, and config is empty', () => {
            assert.throws(() => scaffoldEngine.scaffoldNewProject([], generatorStub, emptyConfig), errMessage);
        });

        test('Should throw correct error when scaffolders is empty, generator is valid, and config is valid', () => {
            assert.throws(() => scaffoldEngine.scaffoldNewProject([], generatorStub, config), errMessage);
        });
    });

    suite('valid scaffolders Tests:', () => {
        const projectScaffolders = testUtils.projectScaffolders;
        const firstScaffolder = testUtils.firstScaffolder;
        const secondScaffolder = testUtils.secondScaffolder;
        let firstScaffoldStub: Sinon.SinonStub;
        let secondScaffoldStub: Sinon.SinonStub;

        setup(() => {
            firstScaffoldStub = Sinon.stub(firstScaffolder, 'scaffold');
            secondScaffoldStub = Sinon.stub(secondScaffolder, 'scaffold');
        });

        teardown(() => {
            Sinon.restore();
        });

        test('Should throw correct error when scaffolders is valid, generator is null, and config is null', () => {
            assert.throws(() => scaffoldEngine.scaffoldNewProject(projectScaffolders, null, null), errMessage);
        });

        test('Should throw correct error when scaffolders is valid, generator is null, and config is undefined', () => {
            assert.throws(() => scaffoldEngine.scaffoldNewProject(projectScaffolders, null, undefined), errMessage);
        });

        test('Should throw correct error when scaffolders is valid, generator is null, and config is empty', () => {
            assert.throws(() => scaffoldEngine.scaffoldNewProject(projectScaffolders, null, emptyConfig), errMessage);
        });

        test('Should throw correct error when scaffolders is valid, generator is null, and config is valid', () => {
            assert.throws(() => scaffoldEngine.scaffoldNewProject(projectScaffolders, null, config), errMessage);
        });

        test('Should throw correct error when scaffolders is valid, generator is undefined, and config is null', () => {
            assert.throws(() => scaffoldEngine.scaffoldNewProject(projectScaffolders, undefined, null), errMessage);
        });

        test('Should throw correct error when scaffolders is valid, generator is undefined, and config is undefined', () => {
            assert.throws(() => scaffoldEngine.scaffoldNewProject(projectScaffolders, undefined, undefined), errMessage);
        });

        test('Should throw correct error when scaffolders is valid, generator is undefined, and config is empty', () => {
            assert.throws(() => scaffoldEngine.scaffoldNewProject(projectScaffolders, undefined, emptyConfig), errMessage);
        });

        test('Should throw correct error when scaffolders is valid, generator is undefined, and config is valid', () => {
            assert.throws(() => scaffoldEngine.scaffoldNewProject(projectScaffolders, undefined, config), errMessage);
        });

        test('Should invoke scaffold when scaffolders is valid, generator is valid, and config is null', () => {
            scaffoldEngine.scaffoldNewProject(projectScaffolders, generatorStub, null);
            assert.isTrue(firstScaffoldStub.calledWithExactly(generatorStub, null));
            assert.isTrue(secondScaffoldStub.calledWithExactly(generatorStub, null));
        });

        test('Should invoke scaffold when scaffolders is valid, generator is valid, and config is undefined', () => {
            scaffoldEngine.scaffoldNewProject(projectScaffolders, generatorStub, undefined);
            assert.isTrue(firstScaffoldStub.calledWithExactly(generatorStub, undefined));
            assert.isTrue(secondScaffoldStub.calledWithExactly(generatorStub, undefined));
        });

        test('Should invoke scaffold when scaffolders is valid, generator is valid, and config is empty', () => {
            scaffoldEngine.scaffoldNewProject(projectScaffolders, generatorStub, emptyConfig);
            assert.isTrue(firstScaffoldStub.calledWithExactly(generatorStub, emptyConfig));
            assert.isTrue(secondScaffoldStub.calledWithExactly(generatorStub, emptyConfig));
        });

        test('Should invoke scaffold error when scaffolders is valid, generator is valid, and config is valid', () => {
            scaffoldEngine.scaffoldNewProject(projectScaffolders, generatorStub, config);
            assert.isTrue(firstScaffoldStub.calledWithExactly(generatorStub, config));
            assert.isTrue(secondScaffoldStub.calledWithExactly(generatorStub, config));
        });
    });
});