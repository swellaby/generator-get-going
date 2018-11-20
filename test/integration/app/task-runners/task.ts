'use strict';

import helpers = require('yeoman-test');
import Sinon = require('sinon');
import yeomanAssert = require('yeoman-assert');

import intTestUtils = require('../../int-test-utils');
import taskRunnerInput = require('../../../../generators/app/inputs/task-runner-input');
import TaskRunner = require('../../../../generators/app/enums/task-runner');

suite('task Tests:', () => {
    let prompts;
    const expTaskfile = 'Taskfile.yml';
    const spaceRegex = '\\s*';
    const silentTrueRegex = '(silent: true)';
    const ignoreErrorRegex = '(ignore_error: true)';
    const cmdsRegex = '(cmds:)';
    const spaceSilentRegex = spaceRegex + silentTrueRegex;
    const spaceIgnoreErrorRegex = spaceRegex + ignoreErrorRegex;
    const cmdsSpaceRegex = cmdsRegex + spaceRegex;

    suiteSetup(() => {
        prompts = intTestUtils.defaultPromptAnswersCopy;
        prompts.taskRunner = TaskRunner.task;
        return helpers.run(intTestUtils.generatorRoot).withPrompts(prompts).toPromise();
    });

    setup(() => {
        intTestUtils.createGitInitStub();
    });

    teardown(() => {
        Sinon.restore();
    });

    test('Should use prompt answer when option is invalid', async () => {
        const options = intTestUtils.defaultOptionsCopy;
        options[taskRunnerInput.input.optionName] = 'abc';
        await helpers.run(intTestUtils.generatorRoot).withOptions(options).withPrompts(prompts).toPromise();
        yeomanAssert.file(expTaskfile);
    });

    test('Should create Taskfile', () => {
        yeomanAssert.file(expTaskfile);
    });

    test('Should configure variables correctly', () => {
        yeomanAssert.fileContent(expTaskfile, 'COVERAGE_ROOT_DIR: .coverage');
        yeomanAssert.fileContent(expTaskfile, 'COVERAGE_OUT_FILENAME: coverage.out');
        yeomanAssert.fileContent(expTaskfile, 'TESTRESULTS_ROOT_DIR: .testresults');
        yeomanAssert.fileContent(expTaskfile, 'RESULTS_JSON_FILENAME: results.json');
    });

    test('Should configure default task correctly', () => {
        yeomanAssert.fileContent(expTaskfile, new RegExp(`(tasks:)${spaceRegex}(default:)${spaceRegex}(deps: \\[test\\])${spaceSilentRegex}`));
    });

    test('Should configure setup task correctly', () => {
        let regex = `(setup:)${spaceRegex}(desc: Sets up the workspace)${spaceRegex}`;
        regex += `(deps: \\[install, create-report-dirs\\])`;
        yeomanAssert.fileContent(expTaskfile, new RegExp(regex));
    });

    test('Should configure install task correctly', () => {
        let regex = `(install:)${spaceRegex}(desc: Installs dependencies)${spaceRegex}`;
        regex += `(deps: \\[install-deps, install-dev-deps\\])${spaceSilentRegex}`;
        yeomanAssert.fileContent(expTaskfile, new RegExp(regex));
    });

    suite('linter dev dep Tests:', () => {
        let regex = `(install-dev-deps:)${spaceRegex}(desc: Installs dev dependencies)${spaceRegex}`;
        regex += `(# Run this outside the working directory to prevent)${spaceRegex}`;
        regex += `(# these dev deps from being added to the go.mod file.)${spaceRegex}`;
        regex += `(dir: '{{toSlash .TMP_DIR}}')${spaceRegex}`;
        regex += `${cmdsSpaceRegex}(- go get github.com/axw/gocov/gocov)${spaceRegex}`;
        regex += `(- go get github.com/AlekSi/gocov-xml)${spaceRegex}`;
        regex += `(- go get github.com/matm/gocov-html)${spaceRegex}`;
        regex += `(- go get gotest.tools/gotestsum)${spaceRegex}`;
        const regexSuffix = `${silentTrueRegex}${spaceRegex}(vars:)${spaceRegex}(TMP_DIR:)${spaceRegex}(sh: go env GOPATH)`;

        test('Should configure install-dev-deps task correctly with golint', () => {
            const depRegex = `${regex}(- go get golang.org/x/lint/golint)${spaceRegex}${regexSuffix}`;
            yeomanAssert.fileContent(expTaskfile, new RegExp(depRegex));
        });

        test('Should configure lint task correctly', () => {
            const cmd = `golint ./...`;
            let regex = `(lint:)${spaceRegex}(desc: Runs the linter and prints results to STDOUT)${spaceRegex}`;
            regex += `${cmdsSpaceRegex}(- ${cmd})${spaceRegex}`;
            yeomanAssert.fileContent(expTaskfile, new RegExp(regex));
        });
    });

    test('Should configure create-report-dirs task correctly', () => {
        let cmd = `'{{if eq OS "windows"}}cmd.exe /C "mkdir{{else}}mkdir -p{{end}} {{fromSlash .UNIT_TEST_RESULTS_DIR}} `;
        cmd += `{{fromSlash .UNIT_TEST_COVERAGE_DIR}}{{if eq OS "windows"}} 2>nul"{{end}}'`;
        let regex = `(create-report-dirs:)${spaceRegex}(desc: Creates the directories where generated reports are written)${spaceRegex}`;
        regex += `${cmdsSpaceRegex}(- ${cmd})${spaceSilentRegex}${spaceIgnoreErrorRegex}`;
        yeomanAssert.fileContent(expTaskfile, new RegExp(regex));
    });

    test('Should configure create-report-dirs task correctly', () => {
        let cmd = `'{{if eq OS "windows"}}cmd.exe /C "mkdir{{else}}mkdir -p{{end}} {{fromSlash .UNIT_TEST_RESULTS_DIR}} `;
        cmd += `{{fromSlash .UNIT_TEST_COVERAGE_DIR}}{{if eq OS "windows"}} 2>nul"{{end}}'`;
        let regex = `(create-report-dirs:)${spaceRegex}(desc: Creates the directories where generated reports are written)${spaceRegex}`;
        regex += `${cmdsSpaceRegex}(- ${cmd})${spaceSilentRegex}${spaceIgnoreErrorRegex}`;
        yeomanAssert.fileContent(expTaskfile, new RegExp(regex));
    });

    test('Should configure clean task correctly', () => {
        let cmd = `'{{if eq OS "windows"}}cmd.exe /C "rd /q /s{{else}}rm -rf{{end}} {{.TESTRESULTS_ROOT_DIR}} `;
        cmd += `{{.COVERAGE_ROOT_DIR}}{{if eq OS "windows"}} 2>nul"{{end}}'`;
        let regex = `(clean:)${spaceRegex}(desc: Cleans the workspace)${spaceRegex}`;
        regex += `${cmdsSpaceRegex}(- ${cmd})${spaceSilentRegex}${spaceIgnoreErrorRegex}`;
        yeomanAssert.fileContent(expTaskfile, new RegExp(regex));
    });

    test('Should configure test task correctly', () => {
        let cmd = `gotestsum --format standard-verbose --junitfile {{.UNIT_TEST_RESULTS_JUNIT_FILEPATH}} --jsonfile `;
        cmd += `{{.UNIT_TEST_RESULTS_JSON_FILEPATH}} -- -coverprofile={{.UNIT_TEST_COVERAGE_OUT_FILEPATH}} ./...`;
        let regex = `(test:)${spaceRegex}(desc: Runs unit tests)${spaceRegex}`;
        regex += `(deps: \\[create-report-dirs\\])${spaceRegex}`;
        regex += `${cmdsSpaceRegex}(- ${cmd})${spaceSilentRegex}`;
        yeomanAssert.fileContent(expTaskfile, new RegExp(regex));
    });

    test('Should configure coverage task correctly', () => {
        let regex = `(coverage:)${spaceRegex}(desc: Runs unit tests and generates code coverage reports)${spaceRegex}`;
        regex += `(deps: \\[test\\])${spaceRegex}`;
        regex += `${cmdsSpaceRegex}(- gocov convert {{.UNIT_TEST_COVERAGE_OUT_FILEPATH}} > {{.UNIT_TEST_COVERAGE_JSON_FILEPATH}})${spaceRegex}`;
        regex += `(- gocov-xml < {{.UNIT_TEST_COVERAGE_JSON_FILEPATH}} > {{.UNIT_TEST_COVERAGE_COBERTURA_XML_FILEPATH}})${spaceRegex}`;
        regex += `(- gocov-html {{.UNIT_TEST_COVERAGE_JSON_FILEPATH}} > {{.UNIT_TEST_COVERAGE_HTML_FILEPATH}})${spaceSilentRegex}`;
        yeomanAssert.fileContent(expTaskfile, new RegExp(regex));
    });

    test('Should configure open-coverage task correctly', () => {
        const cmd = `'{{if eq OS "windows"}}cmd.exe /C start{{else if eq OS "darwin"}}open{{else}}xdg-open{{end}} {{.UNIT_TEST_COVERAGE_HTML_FILEPATH}}'`;
        let regex = `(open-cov:)${spaceRegex}(desc: Opens the HTML Code Coverage Report)${spaceRegex}`;
        regex += `(deps: \\[coverage\\])${spaceRegex}`;
        regex += `${cmdsSpaceRegex}(- ${cmd})${spaceRegex}`;
        yeomanAssert.fileContent(expTaskfile, new RegExp(regex));
    });

    test('Should configure vet task correctly', () => {
        const cmd = `go vet ./...`;
        let regex = `(vet:)${spaceRegex}(desc: Runs govet and prints results to STDOUT)${spaceRegex}`;
        regex += `${cmdsSpaceRegex}(- ${cmd})${spaceRegex}`;
        yeomanAssert.fileContent(expTaskfile, new RegExp(regex));
    });

    test('Should configure ci task correctly', () => {
        let regex = `(ci:)${spaceRegex}(desc: Runs sequence of desired commands for performing validation in a CI build)${spaceRegex}`;
        regex += `(deps: \\[coverage, lint\\])${spaceRegex}`;
        yeomanAssert.fileContent(expTaskfile, new RegExp(regex));
    });

    test('Should configure print-version task correctly', () => {
        const cmd = `go run ./scripts/version/print/main.go`;
        let regex = `(print-version:)${spaceRegex}(desc: Prints the current version)${spaceRegex}`;
        regex += `${cmdsSpaceRegex}(- ${cmd})${spaceSilentRegex}`;
        yeomanAssert.fileContent(expTaskfile, new RegExp(regex));
    });

    test('Should configure bump-version task correctly', () => {
        const cmd = `go run ./scripts/version/bump/main.go`;
        let regex = `(bump-version:)${spaceRegex}(desc: Bumps the current patch version)${spaceRegex}`;
        regex += `${cmdsSpaceRegex}(- ${cmd})${spaceSilentRegex}`;
        yeomanAssert.fileContent(expTaskfile, new RegExp(regex));
    });

    test('Should configure check-gofmt task correctly', () => {
        const cmd = `'if \\[ "\\$\\(gofmt \\-l .\\)" = "" \\]; then echo "All files are Go formatted\\!"; else echo "Some files are not Go formatted" && exit 1; fi'`;
        let regex = `(check-gofmt:)${spaceRegex}(desc: Checks that files are Go formatted)${spaceRegex}`;
        regex += `${cmdsSpaceRegex}(- echo "Running gofmt check...")${spaceRegex}`;
        regex += `(- ${cmd})${spaceSilentRegex}`;
        yeomanAssert.fileContent(expTaskfile, new RegExp(regex));
    });
});
