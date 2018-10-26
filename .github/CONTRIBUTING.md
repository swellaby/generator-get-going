# Contributing
All contributions are welcomed!

## Opening Issues
[Open an issue][create-issue-url] on the GitHub repository

## Developing
All that is needed to work with this repo is [Node.js][nodejs-url] and your favorite editor or IDE, although we recommend [VS Code][vscode-url].

### Building
To build and/or work on this project:

Clone the repo, change into the directory where you cloned the directory, and then run the developer setup script
```sh     
git clone https://github.com/swellaby/generator-lets-go.git
cd generator-lets-go 
npm run dev:setup
```

### Submitting changes
Swellaby members should create a branch within the repository, make changes there, and then submit a PR. 

Outside contributors should fork the repository, make changes in the fork, and then submit a PR.

### git hooks
This repo utilizes the [husky][husky-url] module for the [git pre-commit hook][git-hook-url]. As such, when you run a `git commit`, the pre-commit hook will run a script to ensure the linter still passes, that all unit tests still pass, and that code coverage is still at 100%. If the script fails your commit will be rejected, and you will need to fix the issue(s) before attempting to commit again.  

You can optionally skip this hook by including the `-n` switch (i.e. `git commit -n -m "..."`) if you are only trying to commit non-code content, like a markdown or package.json file.

### Resetting workspace
You may occasionally want and/or need to reset your workspace, especially if you haven't updated your local workspace in a while. To do so, simply run the reset script. This will clean up all generated directories and content, and will also update your local dependencies.

```sh
npm run dev:reset
```

### Tests
We use [Mocha][mocha-url] and [Sinon][sinon-url] to test and validate, and the tests are written using [Mocha's TDD interface][mocha-tdd-url].  

There are suites of [unit tests][unit-test] that validate individual functions in complete isolation, and there are also [component tests][comp-test] that use validate multiple components of the module in conjunction. 

The tests will be run as part of the npm `build` script and on a git commit, but there are npm scripts you can use to run the test suites directly. The test results will be displayed in the console.

Run the unit tests:
```sh
npm run test:unit
```  

Run the component tests:
```sh
npm run test:component
```

Run both unit and component tests:
```sh
npm run test:all
```

You must write corresponding unit and component tests for any code you add or modify, and all tests must pass before those changes can be merged back to the master branch.

### Code coverage
Code coverage is generated, and enforced using [Istanbuljs/nyc][nyc-url]. The unit test suite has 100% coverage of the application source code, and similarly the component test suite also has 100% coverage. We will not accept any changes that drop the code coverage below 100%.

The tests will be run as part of the npm `build` script and on a git commit, but there are also several coverage related `npm scripts` that you can run to generate and/or view the coverage details.  

Generate latest coverage for the unit tests:
```sh
npm run coverage
```  

Open the detailed HTML coverage report for the unit tests:
```sh
npm run coverage:open
```

Generate latest coverage for the component tests:
```sh
npm run coverage:component
```  

Open the detailed HTML coverage report for the component tests:
```sh
npm run coverage:component:open
```

### Linting
This repo uses [tslint][tslint-url] and [eslint][eslint-url] for respectively linting the TypeScript and JavaScript code. The tslint configuration can be found in the [tslint.json][tslint-config-url] file and the eslint configuration can be found in the [.eslintrc.js][[eslint-config-url] file.

Both tslint and eslint are automatically run when you run the npm `build` script and when you make a commit. Additionally you can run also run the linters via their corresponding npm script.

For example to run both eslint and tslint:
```sh
npm run lint
```  

Or to just run [tslint][tslint-url]:
```sh
npm run tslint
```  

Or to just run [eslint][eslint-url]:
```sh
npm run eslint
```  


[Back to Top][top]

[create-issue-url]: https://github.com/swellaby/generator-lets-go/issues/new
[nodejs-url]:https://nodejs.org/en/download/
[vscode-url]: https://code.visualstudio.com/
[husky-url]: https://www.npmjs.com/package/husky
[git-hook-url]: https://git-scm.com/docs/githooks#_pre_commit
[eslint-url]: https://eslint.org/
[eslint-config-url]: ../.eslintrc.js
[tslint-url]: https://palantir.github.io/tslint/
[tslint-config-url]: ../tslint.json
[mocha-url]: https://mochajs.org/
[mocha-tdd-url]: https://mochajs.org/#tdd
[sinon-url]: sinonjs.org/
[nyc-url]: https://istanbul.js.org/
[unit-test]: ../test/unit/
[comp-test]: ../test/component/
[top]: CONTRIBUTING.md#contributing