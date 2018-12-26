'use strict';

import chai = require('chai');
import shell = require('shelljs');
import testUtils = require('./func-test-utils');

const assert = chai.assert;

describe('boilerplate Tests:', () => {
    describe('all options provided', () => {
        let execResponse: shell.ExecOutputReturnValue;
        const {
            name,
            owner,
            moduleName,
            projectType,
            description,
            linter,
            taskRunner,
            includeVsCode
        } = testUtils.inputConfigs.boilerplateInputs.b3;

        before(() => {
            const descriptionOption = testUtils.optionUtils.addDescriptionOption(description);
            const nameOption = testUtils.optionUtils.addNameOption(name);
            const ownerOption = testUtils.optionUtils.addOwnerOption(owner);
            const moduleOption = testUtils.optionUtils.addModuleOption(moduleName);
            const typeOption = testUtils.optionUtils.addTypeOption(projectType);
            const linterOption = testUtils.optionUtils.addLinterOption(linter);
            const taskRunnerOption = testUtils.optionUtils.addTaskRunnerOption(taskRunner);
            const vsCodeOption = testUtils.optionUtils.addVSCodeOption(includeVsCode);
            const allOpts = [ descriptionOption, nameOption, ownerOption, moduleOption, typeOption, linterOption, taskRunnerOption, vsCodeOption ];
            const options = testUtils.optionUtils.aggregateOptions(allOpts);
            execResponse = <shell.ExecOutputReturnValue>testUtils.runGenerator(options);
        });

        it('Should have a successful response code', () => {
            assert.deepEqual(execResponse.code, testUtils.successfulReturnCode);
        });

        it('Should create git files', () => {
            const scaffoldedGitignorePath = testUtils.getScaffoldedBoilerplateFilePath('.gitignore');
            const scaffoldedGitattributesPath = testUtils.getScaffoldedBoilerplateFilePath('.gitattributes');
            const ignoreFileContents = testUtils.getFileContents(scaffoldedGitignorePath);
            const attributesFileContents = testUtils.getFileContents(scaffoldedGitattributesPath);
            const fixturesGitignorePath = testUtils.getFixturesBoilerplateFilePath('.gitignore');
            const expIgnoreFileContents = testUtils.getFileContents(fixturesGitignorePath);
            const expAttributesFileContents = testUtils.fixtures.gitattributesContent;
            assert.deepEqual(ignoreFileContents, expIgnoreFileContents);
            assert.deepEqual(attributesFileContents, expAttributesFileContents);
        });
    });
});
