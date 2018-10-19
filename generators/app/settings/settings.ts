'use strict';

import IProjectSetting = require('./project-setting');
import nameInput = require('../inputs/name-input');
import typeInput = require('../inputs/type-input');
import vscodeInput = require('../inputs/vscode-input');

const settings: IProjectSetting[] = [
    typeInput.setting,
    nameInput.setting,
    vscodeInput.setting
];

export = settings;