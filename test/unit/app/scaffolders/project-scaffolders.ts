'use strict';

import chai = require('chai');
import projectScaffolders = require('../../../../generators/app/scaffolders/project-scaffolders');
import dirScaffolder = require('../../../../generators/app/scaffolders/directory');
import gitScaffolder = require('../../../../generators/app/scaffolders/git');
const assert = chai.assert;

suite('projectScaffolders Tests:', () => {
    test('Should have correct number of scaffolders', () => {
        assert.deepEqual(projectScaffolders.length, 2);
    });

    test('Should have correct first scaffolder', () => {
        const scaffolder = projectScaffolders[0];
        assert.deepEqual(scaffolder, dirScaffolder);
    });

    test('Should have correct second scaffolder', () => {
        const scaffolder = projectScaffolders[1];
        assert.deepEqual(scaffolder, gitScaffolder);
    });
});