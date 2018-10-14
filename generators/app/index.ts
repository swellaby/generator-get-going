'use strict';

import yeoman = require('yeoman-generator');
import LetsGoGenerator = require('./letsgo-generator');

/**
 * Main entry point of the application.
 */
export = class Generator extends yeoman {
    public execute() {
        const letsGoGenerator = new LetsGoGenerator(this);
        return letsGoGenerator.createProject();
    }
};