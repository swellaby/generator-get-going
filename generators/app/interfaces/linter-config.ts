'use strict';

import Linter = require('../enums/linter');

interface ILinterConfig {
    linterName: string;
    linterType: Linter;
    commandName: string;
    packageInstallPath: string;
}

export = ILinterConfig;