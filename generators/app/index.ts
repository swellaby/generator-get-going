'use strict';

import yeoman = require('yeoman-generator');

/**
 * Main entry point of the application.
 */
class Generator extends yeoman {
    public execute() {
        return Promise.resolve();
    }
}

export = Generator;