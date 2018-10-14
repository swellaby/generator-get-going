'use strict';

import chai = require('chai');
import taskRunner = require('../../../../generators/app/settings/task-runner');
const assert = chai.assert;

suite('TaskRunner Tests:', () => {
    test('Should have correct value for go-task', () => {
        assert.deepEqual(taskRunner.goTask, 0);
    });

    test('Should have correct value for mage', () => {
        assert.deepEqual(taskRunner.mage, 1);
    });
});