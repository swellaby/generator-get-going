'use strict';

import chai = require('chai');
import projectType = require('../../../../generators/app/settings/project-type');
const assert = chai.assert;

suite('ProjectType Tests:', () => {
    test('Should have correct value for boilerplate project', () => {
        assert.deepEqual(projectType.boilerplate, 'boilerplate');
    });

    test('Should have correct value for lib project', () => {
        assert.deepEqual(projectType.lib, 'lib');
    });

    test('Should have correct value for libcli project', () => {
        assert.deepEqual(projectType.libcli, 'libcli');
    });

    test('Should have correct value for cli project', () => {
        assert.deepEqual(projectType.cli, 'cli');
    });
});