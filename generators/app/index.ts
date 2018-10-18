'use strict';

import yeoman = require('yeoman-generator');
import LetsGoGenerator = require('./letsgo-generator');

/**
 * Main entry point of the application.
 */
export = class Generator extends yeoman {
    private letsGoGenerator: LetsGoGenerator;

    // tslint:disable-next-line:no-any
    constructor(args: string | string[], opts?: any) {
        super(args, opts);
        this.letsGoGenerator = new LetsGoGenerator(this);
        this.letsGoGenerator.addGeneratorOptions();
    }

    public execute() {
        return this.letsGoGenerator.createProject();
    }
};