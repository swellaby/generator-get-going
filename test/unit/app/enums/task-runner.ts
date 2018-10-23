'use strict';

import chai = require('chai');
import taskRunner = require('../../../../generators/app/enums/task-runner');
const assert = chai.assert;

suite('TaskRunner Tests:', () => {
    test('Should have correct value for task', () => {
        assert.deepEqual(taskRunner.task, 'task');
    });

    test('Should have correct value for mage', () => {
        assert.deepEqual(taskRunner.mage, 'mage');
    });
});