'use strict';

import chai = require('chai');
import shell = require('shelljs');
import testUtils = require('./func-test-utils');

const assert = chai.assert;

describe('boilerplate Tests:', () => {
    describe('all options provided', () => {
        let execResponse: shell.ExecOutputReturnValue;
        const name = 'b3';
        const description = 'save the world';
        const owner = 'swellaby';
        // tslint:disable-next-line:mocha-no-side-effect-code
        const moduleName = `github.com/${owner}/${name}`;
        const projectType = 'boilerplate';
        const linter = 'golint';
        const taskRunner = 'task';
        const includeVsCode = true;

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
            console.log(`std err: ${execResponse.stderr}`);
            console.log(`std out: ${execResponse.stderr}`);
            assert.deepEqual(execResponse.code, testUtils.successfulReturnCode);
        });
    });
});
