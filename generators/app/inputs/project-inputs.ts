'use strict';

import IProjectInput = require('../interfaces/project-input');
import linterInput = require('./linter-input');
import nameInput = require('./name-input');
import ownerInput = require('./owner-input');
import taskRunnerInput = require('./task-runner-input');
import typeInput = require('./type-input');
import vscodeInput = require('./vscode-input');

const inputs: IProjectInput[] = [
    nameInput.input,
    ownerInput.input,
    typeInput.input,
    linterInput.input,
    taskRunnerInput.input,
    vscodeInput.input
];

export = inputs;