'use strict';

import TaskRunner = require('../enums/task-runner');

interface ITaskRunnerConfig {
    taskRunner: TaskRunner;
    name: string;
    commandName: string;
    packageInstallPath: string;
    taskScriptNames: {
        setup: string
        clean: string
        test: string
        coverage: string
        openCoverage: string
        lint: string
        vet: string
        format: string
        install: string
        ci: string
    };
}

export = ITaskRunnerConfig;