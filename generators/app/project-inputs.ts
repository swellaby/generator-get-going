'use strict';

import IProjectInput = require('./interfaces/project-input');
import descriptionInput = require('./inputs/description-input');
import linterInput = require('./inputs/linter-input');
import moduleInput = require('./inputs/module-input');
import nameInput = require('./inputs/name-input');
import ownerInput = require('./inputs/owner-input');
import taskRunnerInput = require('./inputs/task-runner-input');
import typeInput = require('./inputs/type-input');
import vscodeInput = require('./inputs/vscode-input');

const inputs: IProjectInput[] = [
    nameInput,
    descriptionInput,
    ownerInput,
    moduleInput,
    typeInput,
    linterInput,
    taskRunnerInput,
    vscodeInput
];

export = inputs;
