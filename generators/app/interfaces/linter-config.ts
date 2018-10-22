'use strict';

import Linter = require('../enums/linter');

interface ILinterConfig {
    linterType: Linter;
    commandName: string;
    packageInstallPath: string;
}

export = ILinterConfig;