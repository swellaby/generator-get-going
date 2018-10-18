'use strict';

import yeoman = require('yeoman-generator');
import LetsGoGenerator = require('./letsgo-generator');
import projectSettings = require('./settings/settings');

/**
 * Main entry point of the application.
 */
export = class Generator extends yeoman {
    // tslint:disable-next-line:no-any
    constructor(args: string | string[], opts?: any) {
        super(args, opts);

        if (!projectSettings || projectSettings.length === 0) {
            throw new Error('Something awful happened! Please open an issue on GitHub');
        }

        projectSettings.forEach(setting => {
            this.option(setting.optionName, setting.option);
        });
    }

    public execute() {
        const letsGoGenerator = new LetsGoGenerator(this);
        return letsGoGenerator.createProject();
    }
};