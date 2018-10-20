'use strict';

import IProjectInput = require('../interfaces/project-input');
import nameInput = require('./name-input');
import typeInput = require('./type-input');
import vscodeInput = require('./vscode-input');

const inputs: IProjectInput[] = [
    typeInput.input,
    nameInput.input,
    vscodeInput.input
];

export = inputs;