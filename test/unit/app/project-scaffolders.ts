'use strict';

import chai = require('chai');
import projectScaffolders = require('../../../generators/app/project-scaffolders');
import dirScaffolder = require('../../../generators/app/scaffolders/directory-scaffolder');
import gitScaffolder = require('../../../generators/app/scaffolders/git-scaffolder');
import taskRunnerScaffolder = require('../../../generators/app/scaffolders/task-runner-scaffolder');
import typeScaffolder = require('../../../generators/app/scaffolders/type-scaffolder');

const assert = chai.assert;

suite('projectScaffolders Tests:', () => {
    test('Should have correct number of scaffolders', () => {
        assert.deepEqual(projectScaffolders.length, 4);
    });

    test('Should have correct first scaffolder', () => {
        const scaffolder = projectScaffolders[0];
        assert.deepEqual(scaffolder, dirScaffolder);
    });

    test('Should have correct second scaffolder', () => {
        const scaffolder = projectScaffolders[1];
        assert.deepEqual(scaffolder, typeScaffolder);
    });

    test('Should have correct third scaffolder', () => {
        const scaffolder = projectScaffolders[2];
        assert.deepEqual(scaffolder, taskRunnerScaffolder);
    });

    test('Should have correct fourth scaffolder', () => {
        const scaffolder = projectScaffolders[3];
        assert.deepEqual(scaffolder, gitScaffolder);
    });
});