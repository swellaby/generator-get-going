'use strict';

import chai = require('chai');
import projectType = require('../../../../generators/app/settings/project-type');
const assert = chai.assert;

suite('ProjectType Tests:', () => {
    test('Should have correct value for boilerplate project', () => {
        assert.deepEqual(projectType.boilerplate, 0);
    });

    test('Should have correct value for cli project', () => {
        assert.deepEqual(projectType.cli, 1);
    });
});