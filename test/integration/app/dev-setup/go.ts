'use strict';

import helpers = require('yeoman-test');
import Sinon = require('sinon');
import yeomanAssert = require('yeoman-assert');

import intTestUtils = require('../../int-test-utils');
import testUtils = require('../../../test-utils');

suite('dev_setup.go Tests:', () => {
    const prompts = testUtils.defaultPromptAnswersCopy();
    const devSetupFile = intTestUtils.devSetupGoScriptFileName;
    const spaceRegex = intTestUtils.spaceRegex;
    let headerRegex = `package main${spaceRegex}`;
    headerRegex += `import \\(${spaceRegex}"fmt"${spaceRegex}"os"${spaceRegex}`;
    headerRegex += `"os/exec"${spaceRegex}"path"${spaceRegex}"path/filepath"${spaceRegex}`;
    headerRegex += `"runtime"${spaceRegex}\\)${spaceRegex}`;

    let installTaskRunnerFuncRegex = `func installTaskRunner\\(\\) {${spaceRegex}cmd := exec\\.Command\\("go", "get", "-v", "github\\.com/go-task/task/cmd/task"\\)`;
    installTaskRunnerFuncRegex += `${spaceRegex}cmd\\.Dir = os\\.TempDir\\(\\)${spaceRegex}out, err := cmd\\.CombinedOutput\\(\\)${spaceRegex}`;
    installTaskRunnerFuncRegex += `if err != nil {${spaceRegex}fmt\\.Printf\\("An error occurred while installing task %s\\\\n", err\\)${spaceRegex}`;
    installTaskRunnerFuncRegex += `fmt\\.Printf\\("Error details: %s\\\\n", string\\(out\\)\\)${spaceRegex}os\\.Exit\\(1\\)${spaceRegex}`;
    installTaskRunnerFuncRegex += `} else {${spaceRegex}fmt\\.Println\\("task successfully installed\\."\\)${spaceRegex}`;
    installTaskRunnerFuncRegex += `\\}${spaceRegex}\\}${spaceRegex}`;

    let runSetupFuncRegex = `func runSetupTarget\\(\\) {${spaceRegex}cmd := exec\\.Command\\("task", "setup"\\)${spaceRegex}`;
    runSetupFuncRegex += `_, currentFilePath, _, _ := runtime\\.Caller\\(0\\)${spaceRegex}cmd\\.Dir = filepath\\.Join\\(path\\.Dir\\(currentFilePath\\), ".."\\)`;
    runSetupFuncRegex += `${spaceRegex}out, err := cmd\\.CombinedOutput\\(\\)${spaceRegex}if err != nil {${spaceRegex}`;
    runSetupFuncRegex += `fmt\\.Printf\\("Error encountered while running \`task setup\`\\. Error details: %s\\\\n", err\\)${spaceRegex}`;
    runSetupFuncRegex += `os\\.Exit\\(1\\)${spaceRegex}}${spaceRegex}fmt\\.Printf\\("%s", string\\(out\\)\\)${spaceRegex}`;
    runSetupFuncRegex += `os\\.Exit\\(0\\)${spaceRegex}}${spaceRegex}`;

    let mainFuncRegex = `func main\\(\\) {${spaceRegex}`;
    mainFuncRegex += `fmt\\.Println\\("Ensuring task is installed and available\\.\\.\\."\\)${spaceRegex}`;
    mainFuncRegex += `installTaskRunner\\(\\)${spaceRegex}`;
    mainFuncRegex += `fmt\\.Println\\("Running \`task setup\` to configure workspace\\.\\.\\."\\)${spaceRegex}`;
    mainFuncRegex += `runSetupTarget\\(\\)${spaceRegex}}${spaceRegex}`;

    suiteSetup(() => {
        return helpers.run(intTestUtils.generatorRoot).withPrompts(prompts).toPromise();
    });

    setup(() => {
        intTestUtils.createGitInitStub();
     });

    teardown(() => {
        Sinon.restore();
    });

    test('Should include dev_setup.go file', () => {
        yeomanAssert.file(devSetupFile);
    });

    test('Should include correct file contents', () => {
        const regex = headerRegex + installTaskRunnerFuncRegex + runSetupFuncRegex + mainFuncRegex;
        yeomanAssert.fileContent(devSetupFile, new RegExp(regex));
    });
});
