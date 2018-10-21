'use strict';

import IProjectInput = require('../interfaces/project-input');
import nameInput = require('./name-input');
import typeInput = require('./type-input');
import vscodeInput = require('./vscode-input');

const inputs: IProjectInput[] = [
    nameInput.input,
    typeInput.input,
    vscodeInput.input
];

export = inputs;