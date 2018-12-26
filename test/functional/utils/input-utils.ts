'use strict';

const defaultDescription = 'save the world';
const defaultOwner = 'swellaby';
const defaultLinter = 'golint';
const defaultTaskRunner = 'task';
const defaultVsCode = true;

const boilerplateInputs = {
    b3: {
        name: 'b3',
        projectType: 'boilerplate',
        description: defaultDescription,
        owner: defaultOwner,
        moduleName: `github.com/${defaultOwner}/b3`,
        linter: defaultLinter,
        taskRunner: defaultTaskRunner,
        includeVsCode: defaultVsCode
    }
};

export = {
    boilerplateInputs
};
